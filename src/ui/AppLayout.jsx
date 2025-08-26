import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toggleLanguage } from '../features/quiz/quizSlice';

function AppLayout() {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.quiz.currentLanguage);
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white px-8 md:px-12 lg:px-24">
      <header className="flex items-center justify-between mb-6 pt-4 text-center md:text-left">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Trivia Quiz
        </h1>
        <button
          className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 hover:scale-105 transition transform duration-200"
          onClick={() => dispatch(toggleLanguage())}
        >
          {currentLang.toUpperCase()}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="p-4 text-xs md:text-base">
        Copyright ©2025 All rights reserved
      </footer>
    </div>
  );
}

export default AppLayout;
