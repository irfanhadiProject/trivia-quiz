import { useDispatch, useSelector } from 'react-redux';
import { decodeHTML } from '../../utils/helper.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { answerQuestion, incrementScore, nextQuestion } from './quizSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import Options from './Options.jsx';

function QuestionCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const { questions, currentQuestionIndex, currentLanguage, quizFinished } =
    useSelector((state) => state.quiz);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (quizFinished && location.pathname !== '/result') {
      navigate('/result', { replace: true });
    }
  }, [quizFinished, navigate, location]);

  const answers = useMemo(() => {
    if (!currentQuestion) return [];

    const options = [
      currentQuestion.correct_answer[currentLanguage],
      ...currentQuestion.incorrect_answers.map((ans) => ans[currentLanguage]),
    ];

    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentQuestion, currentLanguage]);

  function handleAnswer(selectedAnswer) {
    setSelected(selectedAnswer);

    const isCorrect =
      selectedAnswer === currentQuestion.correct_answer[currentLanguage];

    if (isCorrect) dispatch(incrementScore());

    dispatch(
      answerQuestion({
        questionIndex: currentQuestionIndex,
        selectedAnswer,
        isCorrect,
      })
    );

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setSelected(null);
      dispatch(nextQuestion());
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!questions.length) return <p>Tidak ada soal</p>;

  if (!currentQuestion) return <p>Soal tidak ditemukan</p>;

  return (
    <div className="w-3/4">
      <h3 className=" text-md mb-5 px-2 pb-2 md:text-lg md:px-4 md:pb-4 lg:text-2xl">
        {decodeHTML(currentQuestion.question[currentLanguage])}
      </h3>
      <div className="flex flex-col items-center space-y-3">
        {answers.map((answer, idx) => (
          <Options
            answer={answer}
            key={idx}
            correctAnswer={currentQuestion.correct_answer[currentLanguage]}
            selected={selected}
            onSelect={handleAnswer}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
