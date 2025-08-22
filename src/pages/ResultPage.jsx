import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../features/quiz/quizSlice';

function ResultPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { score, questions } = useSelector((state) => state.quiz);

  function handlePlayAgain() {
    navigate('/');
    dispatch(resetQuiz());
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-between px-2  md:px-4  lg:px-6 ">
      <h2 className="flex-1 text-green-500 text-2xl font-bold md:text-3xl lg:text-4xl">
        Hasil
      </h2>
      <div className="flex-1 flex flex-col gap-8 justify-start items-center">
        <h3 className="text-lg md:text-2xl lg:text-4xl">
          {score} dari {questions.length}
        </h3>
        <button
          className="px-2 py-1 text-sm bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 md:text-base md:px-3 lg:px-4"
          onClick={handlePlayAgain}
        >
          Main Lagi
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
