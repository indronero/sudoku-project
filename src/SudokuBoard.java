import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class SudokuBoard extends JFrame {
    private JToggleButton toolStripButton1;
    private int selectedNumber;
    private int cellWidth;
    private int cellHeight;
    private int xOffset;
    private int yOffset;

    public SudokuBoard() {
        // Initialize the form
        initializeForm();

        // Set default selected number to 1
        toolStripButton1.setSelected(true);
        selectedNumber = 1;

        // Draw the board
        drawBoard();
    }

    private void initializeForm() {
        // Set form properties
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setTitle("Sudoku Board");
        setLayout(null);

        // Initialize the toolbar button
        toolStripButton1 = new JToggleButton();
        toolStripButton1.setBounds(10, 10, 100, 25);
        add(toolStripButton1);

        // Set up event listener for toolbar button
        toolStripButton1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                toolStripButton1ActionPerformed(e);
            }
        });

        // Initialize other form components...

        // Pack and display the form
        pack();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void toolStripButton1ActionPerformed(ActionEvent e) {
        // Handle the action event for toolStripButton1
    }

    private void drawBoard() {
        // Used to store the location of the cell
        Point location = new Point();

        // Draws the cells
        for (int row = 1; row <= 9; row++) {
            for (int col = 1; col <= 9; col++) {
                location.x = col * (cellWidth + 1) + xOffset;
                location.y = row * (cellHeight + 1) + yOffset;

                JLabel lbl = new JLabel();
                lbl.setName(Integer.toString(col) + Integer.toString(row));
                lbl.setBorder(BorderFactory.createEtchedBorder());
                lbl.setLocation(location);
                lbl.setSize(cellWidth, cellHeight);
                lbl.setHorizontalAlignment(SwingConstants.CENTER);
                lbl.setBackground(Color.WHITE);
                lbl.setFont(lbl.getFont().deriveFont(lbl.getFont().getStyle() | Font.BOLD));
                lbl.setOpaque(true);
                lbl.addMouseListener(new MouseAdapter() {
                    public void mouseClicked(MouseEvent e) {
                        cellClicked(e);
                    }
                });

                add(lbl);
            }
        }
    }

    private void cellClicked(MouseEvent e) {
        // Handle the mouse click event for the cell
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new SudokuBoard();
            }
        });
    }
}
