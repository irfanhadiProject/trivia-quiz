import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuizSettings } from '../features/quiz/quizSlice';
import { useState } from 'react';
import CategorySelect from '../features/quiz/CategorySelect';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [difficulty, setDifficulty] = useState('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      setQuizSettings({
        category: selectedCategory,
        difficulty,
        numberOfQuestions,
      })
    );
    navigate('/quiz');
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-green-500 text-2xl font-bold mb-2 md:text-3xl lg:text-4xl">
        Home
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 w-full max-w-2xl">
        <CategorySelect onChange={setSelectedCategory} />
        <select
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option className="text-black" value="easy">
            Mudah
          </option>
          <option className="text-black" value="medium">
            Sedang
          </option>
          <option className="text-black" value="hard">
            Sulit
          </option>
        </select>

        <input
          type="number"
          name="numberOfQuestions"
          value={numberOfQuestions}
          min="1"
          max="50"
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          className="border px-3 py-2 rounded w-full"
        />

        <button
          type="submit"
          className="mt-4 px-3 py-1 bg-blue-600 text-white text-md font-semibold rounded-full hover:bg-blue-800 md:text-base md:px-4 md:py-1"
        >
          Mulai Kuis
        </button>
      </form>
    </div>
  );
}

export default Home;
