import { getColor } from '../_shared/utils';

function ScoreCircle({ score }: { score: number }) {

  const color = getColor(score);

  // Define 10 different tips for score ranges (from 0-10 to 91-100)
  const tips = [
    "Needs improvement. Keep studying! 📚",
    "Don't worry, practice makes perfect! 💪",
    "You're getting there, keep it up! 👍",
    "A bit more focus, and you'll shine! ✨",
    "Halfway there, keep pushing! 🚀",
    "Good job, a little more effort goes a long way! 😊",
    "Great work, you're above average! 🎉",
    "Excellent progress, almost perfect! 🌟",
    "Outstanding performance! 👏",
    "Perfect score, you're a champion! 🏆"
  ];


  // Calculate the tip index based on score (clamped between 0 and 9)
  const tipIndex = Math.min(9, Math.floor(score / 10));
  const tip = tips[tipIndex];

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-40 h-40 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: `conic-gradient(${color} ${score}%, #f1f1f1 ${score}% 100%)`
        }}
      >
        <div className="text-4xl font-bold text-gray-800">
          {score.toFixed(0)}%
        </div>
      </div>
      <div className="my-4 text-lg font-bold">
        {tip}
      </div>
    </div>
  );
};

export default ScoreCircle;
