import { useState } from 'react';

const useScoreSystem = () => {
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const increaseRightAnswers = () => {
    setRightAnswers(rightAnswers + 1);
  };

  const increaseWrongAnswers = () => {
    setWrongAnswers(wrongAnswers + 1);
  };

  return {
    rightAnswers,
    wrongAnswers,
    increaseRightAnswers,
    increaseWrongAnswers,
  };
};

export default useScoreSystem;
