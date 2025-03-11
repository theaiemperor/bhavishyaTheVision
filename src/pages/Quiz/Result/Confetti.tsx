export default function () {


    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 100 }).map((_, i) => {
                const size = Math.random() * 10 + 5;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 3 + 2;
                const delay = Math.random() * 5;
                const color = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'][Math.floor(Math.random() * 5)];

                return (
                    <div
                        key={i}
                        className={`absolute ${color} rounded-full opacity-70`}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${left}%`,
                            top: '-20px',
                            animation: `fall ${animationDuration}s linear ${delay}s forwards`
                        }}
                    />
                );
            })}

            <style>{`
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}</style>
        </div>
    );
};