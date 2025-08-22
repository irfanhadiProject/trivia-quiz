import { decodeHTML } from '../../utils/helper';

function Options({ answer, selected, correctAnswer, onSelect }) {
  const isCorrect = answer === correctAnswer;

  let bgColor = 'bg-gray-600';
  if (selected !== null) {
    bgColor = isCorrect ? 'bg-green-500' : 'bg-red-500';
  }

  return (
    <button
      className={`px-3 py-2 w-full max-w-sm text-white text-md font-semibold rounded ${
        selected
          ? 'cursor-not-allowed pointer-events-none'
          : 'hover:bg-gray-800'
      } ${bgColor}`}
      onClick={() => onSelect(answer)}
      disabled={selected !== null}
    >
      {decodeHTML(answer)}
    </button>
  );
}

export default Options;
