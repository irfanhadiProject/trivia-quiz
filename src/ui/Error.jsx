import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../features/quiz/quizSlice';

function Error({ err }) {
  const dispatch = useDispatch();
  const quizSettings = useSelector((state) => state.quiz.quizSettings);

  const { numberOfQuestions: amount, category, difficulty } = quizSettings;
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-5">
      <p className="font-semibold text-base md:text-lg lg:text-2xl">⚠️ Oops!</p>
      <p className="text-base md:text-lg lg:text-2xl">{err}</p>
      <button
        onClick={() =>
          dispatch(fetchQuestions({ amount, category, difficulty }))
        }
        className="px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded-full hover:bg-red-600 transition md:text-lg"
      >
        Coba Lagi
      </button>
    </div>
  );
}

export default Error;
