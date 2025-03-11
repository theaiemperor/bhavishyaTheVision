import React, { useState, useEffect } from 'react';

const Quiz = () => {
    // Sample quiz data
    const quizId = "sample-quiz-2025";
    const timeLimit = 300; // 5 minutes in seconds
    const quizTitle = "Web Development Fundamentals";
    const quizDescription = "Test your knowledge of web development fundamentals including JavaScript frameworks, HTML, and CSS. This quiz contains multiple-choice questions with single and multiple correct answers.";

    const sampleQuestions = [
        {
            id: 'q1',
            text: 'Which of these are JavaScript frameworks?',
            options: [
                { id: 'a', text: 'React' },
                { id: 'b', text: 'Angular' },
                { id: 'c', text: 'Python' },
                { id: 'd', text: 'Vue' }
            ],
            correctAnswers: ['a', 'b', 'd'],
            multiSelect: true
        },
        {
            id: 'q2',
            text: 'What does HTML stand for?',
            options: [
                { id: 'a', text: 'Hyper Text Markup Language' },
                { id: 'b', text: 'High Tech Machine Learning' },
                { id: 'c', text: 'Hyper Transfer Markup Logic' },
                { id: 'd', text: 'Home Tool Markup Language' }
            ],
            correctAnswers: ['a'],
            multiSelect: false
        },
        {
            id: 'q3',
            text: 'Which of these is a CSS preprocessor?',
            options: [
                { id: 'a', text: 'jQuery' },
                { id: 'b', text: 'SASS' },
                { id: 'c', text: 'LESS' },
                { id: 'd', text: 'Bootstrap' }
            ],
            correctAnswers: ['b', 'c'],
            multiSelect: true
        }
    ];

    // States
    const [questions, setQuestions] = useState(sampleQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(timeLimit);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [score, setScore] = useState(0);
    const [quizHistory, setQuizHistory] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [reviewSlideIn, setReviewSlideIn] = useState(false);

    // Initialize quiz from localStorage if available
    useEffect(() => {
        const savedProgress = localStorage.getItem(`quiz_progress_${quizId}`);
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            setUserAnswers(progress.userAnswers || {});
            setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
            setTimeRemaining(progress.timeRemaining || timeLimit);
            setTimeElapsed(timeLimit - (progress.timeRemaining || timeLimit));
            setQuizStarted(true);
        }

        const history = localStorage.getItem('quiz_history');
        if (history) {
            setQuizHistory(JSON.parse(history));
        }

        // Set selected options for current question
        updateSelectedOptions();
    }, []);

    // Update selected options when changing questions
    useEffect(() => {
        updateSelectedOptions();
    }, [currentQuestionIndex, userAnswers]);

    // Timer effect
    useEffect(() => {
        if (!quizStarted || quizCompleted || reviewMode) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishQuiz();
                    return 0;
                }
                // Save progress to localStorage every 5 seconds
                if (prev % 5 === 0) {
                    saveProgress();
                }
                setTimeElapsed(timeLimit - prev + 1);
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quizStarted, quizCompleted, reviewMode]);

    // Show confetti for high scores
    useEffect(() => {
        if (score >= 80 && quizCompleted) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    }, [score, quizCompleted]);

    // Slide in animation for review mode
    useEffect(() => {
        if (reviewMode) {
            setReviewSlideIn(true);
        } else {
            setReviewSlideIn(false);
        }
    }, [reviewMode]);

    // Update selected options based on current question and answers
    const updateSelectedOptions = () => {
        const currentQuestionId = questions[currentQuestionIndex]?.id;
        if (currentQuestionId && userAnswers[currentQuestionId]) {
            setSelectedOptions(userAnswers[currentQuestionId]);
        } else {
            setSelectedOptions([]);
        }
    };

    // Save progress to localStorage
    const saveProgress = () => {
        localStorage.setItem(`quiz_progress_${quizId}`, JSON.stringify({
            userAnswers,
            currentQuestionIndex,
            timeRemaining
        }));
    };

    // Handle option selection
    const handleOptionSelect = (optionId) => {
        if (reviewMode) return;

        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) return;

        let newSelectedOptions;

        if (currentQuestion.multiSelect) {
            // For multi-select questions
            if (selectedOptions.includes(optionId)) {
                newSelectedOptions = selectedOptions.filter(id => id !== optionId);
            } else {
                newSelectedOptions = [...selectedOptions, optionId];
            }
        } else {
            // For single-select questions
            newSelectedOptions = [optionId];
        }

        setSelectedOptions(newSelectedOptions);

        // Update user answers
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: newSelectedOptions
        }));
    };

    // Navigate to next question
    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
        saveProgress();
    };

    // Navigate to previous question
    const goToPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
        saveProgress();
    };

    // Calculate score and finish quiz
    const finishQuiz = () => {
        let totalCorrect = 0;

        questions.forEach(question => {
            const userAnswer = userAnswers[question.id] || [];
            const correctAnswers = question.correctAnswers;

            // Check if arrays have the same values (regardless of order)
            if (
                userAnswer.length === correctAnswers.length &&
                userAnswer.every(ans => correctAnswers.includes(ans))
            ) {
                totalCorrect++;
            }
        });

        const finalScore = Math.round((totalCorrect / questions.length) * 100);
        setScore(finalScore);
        setQuizCompleted(true);

        // Save to history
        const newHistory = [
            {
                quizId,
                date: new Date().toLocaleString(),
                score: finalScore,
                totalQuestions: questions.length,
                correctAnswers: totalCorrect,
                timeSpent: timeElapsed,
                efficiency: ((finalScore / 100) * questions.length / timeElapsed * 60).toFixed(2)
            },
            ...quizHistory.slice(0, 4) // Keep only last 5 quizzes including current
        ];

        setQuizHistory(newHistory);
        localStorage.setItem('quiz_history', JSON.stringify(newHistory));

        // Clear progress
        localStorage.removeItem(`quiz_progress_${quizId}`);
    };

    // Restart quiz
    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setQuizCompleted(false);
        setShowAnswers(false);
        setReviewMode(false);
        setTimeRemaining(timeLimit);
        setTimeElapsed(0);
        setSelectedOptions([]);
        setQuizStarted(true);
        localStorage.removeItem(`quiz_progress_${quizId}`);
    };

    // Show review mode with answers
    const reviewAnswers = () => {
        setReviewMode(true);
        setShowAnswers(true);
        setCurrentQuestionIndex(0);
    };

    // Format time as mm:ss
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Start quiz
    const startQuiz = () => {
        setQuizStarted(true);
        setTimeRemaining(timeLimit);
    };

    // Calculate correctness status for an option
    const getOptionStatus = (optionId) => {
        if (!showAnswers) return 'default';

        const currentQuestion = questions[currentQuestionIndex];
        const isSelected = userAnswers[currentQuestion.id]?.includes(optionId);
        const isCorrect = currentQuestion.correctAnswers.includes(optionId);

        if (isCorrect && isSelected) return 'correct';
        if (isCorrect) return 'missed';
        if (isSelected) return 'incorrect';
        return 'default';
    };

    // Get CSS class based on option status
    const getOptionClass = (status) => {
        switch (status) {
            case 'correct': return 'bg-green-100 border-green-500';
            case 'missed': return 'bg-blue-50 border-blue-500';
            case 'incorrect': return 'bg-red-100 border-red-500';
            default: return '';
        }
    };

    // Get score color class
    const getScoreColorClass = (scoreValue) => {
        if (scoreValue >= 80) return 'text-green-500';
        if (scoreValue >= 60) return 'text-blue-500';
        return 'text-red-500';
    };

    // Get history item background color
    const getHistoryItemClass = (scoreValue) => {
        if (scoreValue >= 80) return 'bg-green-50 border-green-200';
        if (scoreValue >= 60) return 'bg-blue-50 border-blue-200';
        return 'bg-red-50 border-red-200';
    };

    // Current question
    const currentQuestion = questions[currentQuestionIndex];

    // Render confetti
    const renderConfetti = () => {
        if (!showConfetti) return null;

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

                <style jsx>{`
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

    // Render main app
    if (!quizStarted) {
        return (
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">{quizTitle}</h1>

                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 mb-8 bg-gradient-to-br from-blue-50 to-purple-50">
                    <p className="mb-6 text-gray-700">{quizDescription}</p>
                    <p className="mb-6 text-sm text-gray-600">Time limit: {formatTime(timeLimit)}</p>
                    <button
                        onClick={startQuiz}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md w-full"
                    >
                        Start Quiz
                    </button>
                </div>

                {/* Previous Results - Individual Boxes */}
                {quizHistory.length > 0 && (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Previous Results</h2>
                        <div className="w-full max-w-lg grid grid-cols-1 gap-4 mb-8">
                            {quizHistory.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border shadow-sm ${getHistoryItemClass(item.score)}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-gray-500">{item.date}</p>
                                        </div>
                                        <div className={`text-2xl font-bold ${getScoreColorClass(item.score)}`}>
                                            {item.score}%
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm flex justify-between">
                                        <span>Time: {formatTime(item.timeSpent)}</span>
                                        <span>Correct: {item.correctAnswers}</span>
                                        <span>Incorrect: {item.totalQuestions - item.correctAnswers}</span>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-600">
                                        Efficiency: {item.efficiency} correct answers/minute
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {renderConfetti()}

            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                {!quizCompleted ? (
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold">
                                Question {currentQuestionIndex + 1}/{questions.length}
                            </span>
                            {!reviewMode && (
                                <span className={`text-sm font-mono ${timeRemaining < 60 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                                    Time: {formatTime(timeRemaining)}
                                </span>
                            )}
                            {reviewMode && (
                                <span className="text-sm font-medium text-blue-600">
                                    Review Mode
                                </span>
                            )}
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        {/* Question */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">{currentQuestion.text}</h2>
                            <p className="text-xs text-gray-500 mb-4">
                                {currentQuestion.multiSelect ? 'Select all that apply' : 'Select one answer'}
                            </p>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map(option => {
                                    const status = getOptionStatus(option.id);
                                    return (
                                        <div
                                            key={option.id}
                                            onClick={() => handleOptionSelect(option.id)}
                                            className={`p-3 border rounded-md ${!reviewMode ? 'cursor-pointer' : ''} transition-all duration-200
                        ${getOptionClass(status)}
                        ${!reviewMode && selectedOptions.includes(option.id)
                                                    ? 'border-blue-500 bg-blue-50 shadow-sm transform -translate-y-1'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center
                          ${!reviewMode && selectedOptions.includes(option.id)
                                                        ? 'border-blue-500 bg-blue-500'
                                                        : status === 'correct'
                                                            ? 'border-green-500 bg-green-500'
                                                            : status === 'incorrect'
                                                                ? 'border-red-500 bg-red-500'
                                                                : status === 'missed'
                                                                    ? 'border-blue-500 bg-blue-500'
                                                                    : 'border-gray-300'}`}
                                                >
                                                    {(!reviewMode && selectedOptions.includes(option.id)) ||
                                                        (reviewMode && (status === 'correct' || status === 'incorrect' || status === 'missed')) ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : null}
                                                </div>
                                                <span className="ml-3">{option.text}</span>

                                                {reviewMode && status !== 'default' && (
                                                    <div className="ml-auto">
                                                        {status === 'correct' && (
                                                            <span className="text-xs font-medium text-green-600">Correct</span>
                                                        )}
                                                        {status === 'incorrect' && (
                                                            <span className="text-xs font-medium text-red-600">Incorrect</span>
                                                        )}
                                                        {status === 'missed' && (
                                                            <span className="text-xs font-medium text-blue-600">Missed</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={goToPrevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className={`px-4 py-2 rounded-md transition-all duration-200 transform hover:-translate-y-1 hover:shadow-sm
                  ${currentQuestionIndex === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
                            >
                                Previous
                            </button>

                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={goToNextQuestion}
                                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-sm"
                                >
                                    Next
                                </button>
                            ) : (
                                !reviewMode && (
                                    <button
                                        onClick={finishQuiz}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-sm"
                                    >
                                        Finish Quiz
                                    </button>
                                )
                            )}

                            {reviewMode && (
                                <button
                                    onClick={restartQuiz}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-sm"
                                >
                                    Take Quiz Again
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Results screen - Fixed height to prevent jumping */
                    <div className="text-center p-8 relative overflow-hidden" style={{ minHeight: "400px" }}>
                        <div className={`transition-all duration-500 ${reviewSlideIn ? 'transform -translate-x-full absolute inset-0 p-8' : ''}`}>
                            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                            <div className={`text-6xl font-bold mb-6 animate-bounce ${getScoreColorClass(score)}`}>
                                {score}%
                            </div>

                            <div className="mb-8 text-left p-4 border rounded-lg bg-white">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Time taken:</p>
                                        <p className="font-medium">{formatTime(timeElapsed)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Efficiency:</p>
                                        <p className="font-medium">{((score / 100) * questions.length / timeElapsed * 60).toFixed(2)} correct/min</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Correct:</p>
                                        <p className="font-medium text-green-600">{Math.round((score / 100) * questions.length)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Incorrect:</p>
                                        <p className="font-medium text-red-600">{questions.length - Math.round((score / 100) * questions.length)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={restartQuiz}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                                >
                                    Restart Quiz
                                </button>
                                <button
                                    onClick={reviewAnswers}
                                    className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                                >
                                    Show Answers
                                </button>
                            </div>
                        </div>

                        {/* Review screen that slides in from right */}
                        <div
                            className={`transition-all duration-500 absolute inset-0 transform ${reviewSlideIn ? 'translate-x-0' : 'translate-x-full'}`}
                            style={{ padding: '1.5rem' }}
                        >
                            {reviewMode && (
                                <>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold">Review Answers</h3>
                                        <button
                                            onClick={() => {
                                                setReviewMode(false);
                                                setReviewSlideIn(false);
                                            }}
                                            className="p-2 text-gray-500 hover:text-gray-700"
                                        >
                                            ← Back to Results
                                        </button>
                                    </div>

                                    <div className="space-y-6 max-h-96 overflow-y-auto px-1">
                                        {questions.map((question, idx) => {
                                            const userAnswerIds = userAnswers[question.id] || [];
                                            const allCorrect = userAnswerIds.length === question.correctAnswers.length &&
                                                userAnswerIds.every(id => question.correctAnswers.includes(id));
                                            const partiallyCorrect = userAnswerIds.some(id => question.correctAnswers.includes(id)) && !allCorrect;

                                            let statusClass = 'border-gray-200';
                                            if (allCorrect) statusClass = 'border-green-300 bg-green-50';
                                            else if (partiallyCorrect) statusClass = 'border-blue-300 bg-blue-50';
                                            else statusClass = 'border-red-300 bg-red-50';

                                            return (
                                                <div key={question.id} className={`p-4 border rounded-lg ${statusClass}`}>
                                                    <p className="font-medium mb-3">
                                                        {idx + 1}. {question.text}
                                                    </p>
                                                    <div className="space-y-2">
                                                        {question.options.map(option => {
                                                            const isUserSelected = userAnswerIds.includes(option.id);
                                                            const isCorrect = question.correctAnswers.includes(option.id);

                                                            let optionClass = 'border-gray-200';
                                                            if (isCorrect && isUserSelected) optionClass = 'border-green-500 bg-green-100';
                                                            else if (isCorrect) optionClass = 'border-blue-500 bg-blue-50';
                                                            else if (isUserSelected) optionClass = 'border-red-500 bg-red-100';

                                                            return (
                                                                <div key={option.id} className={`p-2 border rounded ${optionClass} flex items-center`}>
                                                                    <span className="flex-grow">{option.text}</span>
                                                                    {isCorrect && (
                                                                        <span className="text-xs font-medium text-green-600 ml-2">
                                                                            Correct Answer
                                                                        </span>
                                                                    )}
                                                                    {isUserSelected && !isCorrect && (
                                                                        <span className="text-xs font-medium text-red-600 ml-2">
                                                                            Your Answer
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-6 text-center">
                                        <button
                                            onClick={restartQuiz}
                                            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                                        >
                                            Take Quiz Again
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Quiz History - Only show when completed */}
            {quizCompleted && quizHistory.length > 0 && (
                <div className="w-full max-w-lg mt-8 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Previous Results</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {quizHistory.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg border bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">{item.date}</p>
                                    </div>
                                    <div className={`text-2xl font-bold ${getScoreColorClass(item.score)}`}>
                                        {item.score}%
                                    </div>
                                </div>
                                <div className="mt-2 text-sm flex justify-between">
                                    <span>Time: {formatTime(item.timeSpent)}</span>
                                    <span>Correct: {item.correctAnswers}</span>
                                    <span>Incorrect: {item.totalQuestions - item.correctAnswers}</span>
                                </div>
                                <div className="mt-2 text-xs text-gray-600">
                                    Efficiency: {item.efficiency} correct answers/minute
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default function () {

    return <>
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <Quiz />
    </>
}
