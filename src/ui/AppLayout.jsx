import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white px-4 md:px-12 lg:px-24">
      <header className="mb-6 pt-4 text-center md:text-left">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Trivia Quiz
        </h1>
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
