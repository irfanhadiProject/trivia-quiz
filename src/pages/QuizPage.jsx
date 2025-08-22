import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchQuestions } from '../features/quiz/quizSlice';
import QuestionCard from '../features/quiz/QuestionCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

function QuizPage() {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.quiz);
  const quizSettings = useSelector((state) => state.quiz.quizSettings);

  const { numberOfQuestions: amount, category, difficulty } = quizSettings;

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestions({ amount, category, difficulty }));
    }
  }, [dispatch, amount, category, difficulty, questions.length]);

  if (loading) return <Loading />;
  if (error) return <Error err={error} />;

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-green-500 text-2xl font-bold mb-2 md:text-3xl lg:text-4xl">
        Quiz Time!
      </h2>
      <QuestionCard />
    </div>
  );
}

export default QuizPage;
