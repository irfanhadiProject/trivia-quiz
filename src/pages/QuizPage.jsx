import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchQuestions, nextQuestion } from '../features/quiz/quizSlice';
import QuestionCard from '../features/quiz/QuestionCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

function QuizPage() {
  const dispatch = useDispatch();
  const { questions, loading, error, currentQuestionIndex } = useSelector(
    (state) => state.quiz
  );
  const quizSettings = useSelector((state) => state.quiz.quizSettings);
  const [timeLeft, setTimeLeft] = useState(20);

  const { numberOfQuestions: amount, category, difficulty } = quizSettings;

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestions({ amount, category, difficulty }));
    }
  }, [dispatch, amount, category, difficulty, questions.length]);

  useEffect(() => {
    setTimeLeft(20);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          dispatch(nextQuestion());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, currentQuestionIndex]);

  if (loading) return <Loading />;
  if (error) return <Error err={error} />;

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-green-500 text-2xl font-bold mb-2 md:text-3xl lg:text-4xl">
        Quiz Time!
      </h2>
      <div className="flex w-3/4 items-center justify-between">
        <p className="text-xs bg-green-600 rounded-full px-3 py-1 md:text-base">
          Soal {currentQuestionIndex + 1} dari {questions.length}
        </p>
        <p
          className={`text-base font-bold ${
            timeLeft > 10
              ? 'text-green-500'
              : timeLeft > 5
              ? 'text-yellow-500'
              : 'text-red-500'
          } transition-colors duration-500 md:text-2xl`}
        >
          ⏱️ {timeLeft} detik
        </p>
      </div>
      <QuestionCard />
    </div>
  );
}

export default QuizPage;
