function Loading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-5">
      <p className="text-base md:text-xl lg:text-2xl">Loading soal...</p>
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin md:w-10 md:h-10 lg:w-12 lg:h-12"></div>
    </div>
  );
}

export default Loading;
