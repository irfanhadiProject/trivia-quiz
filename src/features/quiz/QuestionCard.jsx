import { useDispatch, useSelector } from 'react-redux';
import { decodeHTML } from '../../utils/helper.js';
import { useEffect, useMemo, useState } from 'react';
import { answerQuestion, incrementScore, nextQuestion } from './quizSlice.js';
import { useNavigate } from 'react-router-dom';
import Options from './Options.jsx';

function QuestionCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { questions, currentQuestionIndex, quizFinished } = useSelector(
    (state) => state.quiz
  );
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (quizFinished) {
      navigate('/result');
    }
  }, [quizFinished, navigate]);

  const answers = useMemo(() => {
    if (!currentQuestion) return [];

    return [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  function handleAnswer(selectedAnswer) {
    setSelected(selectedAnswer);

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) dispatch(incrementScore());

    dispatch(
      answerQuestion({
        questionIndex: currentQuestionIndex,
        selectedAnswer,
        isCorrect,
      })
    );

    setTimeout(() => {
      setSelected(null);
      dispatch(nextQuestion());
    }, 1000);
  }

  if (!questions.length) return <p>Tidak ada soal</p>;

  if (!currentQuestion) return <p>Soal tidak ditemukan</p>;

  return (
    <div className="w-3/4">
      <span className="text-sm bg-green-600 rounded-full px-3 py-1 md:text-base">
        Soal {currentQuestionIndex + 1} dari {questions.length}
      </span>

      <h3 className=" text-md my-5 p-2 md:text-lg md:p-4 lg:text-2xl">
        {decodeHTML(currentQuestion.question)}
      </h3>
      <div className="flex flex-col items-center space-y-3">
        {answers.map((answer, idx) => (
          <Options
            answer={answer}
            key={idx}
            correctAnswer={currentQuestion.correct_answer}
            selected={selected}
            onSelect={handleAnswer}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
