import React, { useState, useEffect, useRef } from 'react';
import './qu.css';
import Layout from '@theme/Layout';

const QuizComponent = ({ id = "quiz-default", questions = [] }) => {
    // State management
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Refs
    const sliderRef = useRef(null);
    const timerIntervalRef = useRef(null);

    // Initialize from localStorage when component mounts
    useEffect(() => {
        const savedProgress = localStorage.getItem(`quiz-progress-${id}`);
        if (savedProgress) {
            const { answers, currentIndex, completed } = JSON.parse(savedProgress);
            setUserAnswers(answers || {});
            setCurrentQuestionIndex(currentIndex || 0);
            setQuizCompleted(completed || false);

            if (completed) {
                calculateScore(answers);
                setShowResults(true);
            }
        }
    }, [id]);

    // Timer effect
    useEffect(() => {
        if (showResults || quizCompleted) {
            clearInterval(timerIntervalRef.current);
            return;
        }

        setTimeLeft(30); // Reset timer for each question

        timerIntervalRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    // Time's up, move to next question or show results
                    if (currentQuestionIndex < questions.length - 1) {
                        handleNext();
                    } else {
                        handleSubmit();
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerIntervalRef.current);
    }, [currentQuestionIndex, showResults, quizCompleted, questions.length]);

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(`quiz-progress-${id}`, JSON.stringify({
            answers: userAnswers,
            currentIndex: currentQuestionIndex,
            completed: quizCompleted
        }));
    }, [userAnswers, currentQuestionIndex, quizCompleted, id]);

    // Update slider position when question changes
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${currentQuestionIndex * 100}%)`;
        }
    }, [currentQuestionIndex]);

    // Handle option selection
    const handleOptionSelect = (questionId, optionId) => {
        setIsAnimating(true);
        const currentQuestion = questions.find(q => q.id === questionId);

        if (!currentQuestion) return;

        let newUserAnswers = { ...userAnswers };

        // Handle multiple correct answers
        if (currentQuestion.allowMultiple) {
            // Initialize as empty array if not already selected
            if (!newUserAnswers[questionId]) {
                newUserAnswers[questionId] = [];
            }

            // Toggle selection
            if (newUserAnswers[questionId].includes(optionId)) {
                newUserAnswers[questionId] = newUserAnswers[questionId].filter(id => id !== optionId);
            } else {
                newUserAnswers[questionId] = [...newUserAnswers[questionId], optionId];
            }
        } else {
            // Single answer - just replace
            newUserAnswers[questionId] = optionId;
        }

        setUserAnswers(newUserAnswers);

        // Reset animation flag after animation completes
        setTimeout(() => setIsAnimating(false), 300);
    };

    // Navigation handlers
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Calculate final score
    const calculateScore = (answers = userAnswers) => {
        let correctCount = 0;

        questions.forEach(question => {
            const userAnswer = answers[question.id];

            // Skip if no answer
            if (!userAnswer) return;

            // Handle multiple correct answers
            if (Array.isArray(question.correctAnswer)) {
                // For multiple correct answers, user answer should be an array
                if (Array.isArray(userAnswer)) {
                    // Check if arrays have the same length and all items in userAnswer are in correctAnswer
                    const correctItems = userAnswer.filter(item => question.correctAnswer.includes(item));

                    // Only count as correct if user selected all correct options and no incorrect ones
                    if (correctItems.length === userAnswer.length &&
                        correctItems.length === question.correctAnswer.length) {
                        correctCount++;
                    }
                }
            } else {
                // Single correct answer
                if (userAnswer === question.correctAnswer) {
                    correctCount++;
                }
            }
        });

        const finalScore = (correctCount / questions.length) * 100;
        setScore(finalScore);
        return finalScore;
    };

    // Handle quiz submission
    const handleSubmit = () => {
        calculateScore();
        setQuizCompleted(true);
        setShowResults(true);
        clearInterval(timerIntervalRef.current);
    };

    // Restart quiz
    const handleRestart = () => {
        setUserAnswers({});
        setCurrentQuestionIndex(0);
        setShowResults(false);
        setQuizCompleted(false);
        setScore(0);
        setTimeLeft(30);

        // Clear localStorage
        localStorage.removeItem(`quiz-progress-${id}`);
    };

    // Check if current question has been answered
    const isCurrentQuestionAnswered = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return false;

        return userAnswers[currentQuestion.id] !== undefined &&
            (Array.isArray(userAnswers[currentQuestion.id]) ?
                userAnswers[currentQuestion.id].length > 0 :
                true);
    };

    // Helper to check if an option is selected
    const isOptionSelected = (questionId, optionId) => {
        if (!userAnswers[questionId]) return false;

        if (Array.isArray(userAnswers[questionId])) {
            return userAnswers[questionId].includes(optionId);
        }

        return userAnswers[questionId] === optionId;
    };

    // Results view
    if (showResults) {
        return (
            <div className="quiz-container">
                <div className="quiz-results">
                    <h2>Quiz Results</h2>
                    <div className="score-container">
                        <div className="score-circle" style={{
                            background: `conic-gradient(#4CAF50 ${score}%, #f1f1f1 ${score}% 100%)`
                        }}>
                            <div className="score-text">{score.toFixed(0)}%</div>
                        </div>
                    </div>
                    <p className="score-message">
                        {score >= 80 ? "Excellent! You've mastered this topic." :
                            score >= 60 ? "Good job! You have a solid understanding." :
                                score >= 40 ? "Not bad. There's room for improvement." :
                                    "Keep practicing. You'll get there!"}
                    </p>
                    <div className="questions-review">
                        <h3>Review Your Answers</h3>
                        {questions.map((question, index) => {
                            const userAnswer = userAnswers[question.id];
                            const isCorrect = Array.isArray(question.correctAnswer)
                                ? (Array.isArray(userAnswer) &&
                                    userAnswer.length === question.correctAnswer.length &&
                                    userAnswer.every(a => question.correctAnswer.includes(a)))
                                : userAnswer === question.correctAnswer;

                            return (
                                <div key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-question">
                                        <span className="question-number">{index + 1}.</span> {question.question}
                                    </div>
                                    <div className="review-answer">
                                        Your answer: {Array.isArray(userAnswer)
                                            ? userAnswer.map(a => {
                                                const option = question.options.find(o => o.id === a);
                                                return option ? option.text : 'Unknown';
                                            }).join(', ')
                                            : (userAnswer
                                                ? question.options.find(o => o.id === userAnswer)?.text || 'Unknown'
                                                : 'Not answered'
                                            )
                                        }
                                    </div>
                                    <div className="correct-answer">
                                        Correct answer: {Array.isArray(question.correctAnswer)
                                            ? question.correctAnswer.map(a => {
                                                const option = question.options.find(o => o.id === a);
                                                return option ? option.text : 'Unknown';
                                            }).join(', ')
                                            : question.options.find(o => o.id === question.correctAnswer)?.text || 'Unknown'
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="quiz-restart-button" onClick={handleRestart}>
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div className="progress-indicator">
                    <div className="progress-text">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className="timer">
                    <div className="timer-fill" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
                    <div className="timer-text">{timeLeft}s</div>
                </div>
            </div>

            <div className="quiz-slider-container">
                <div className="quiz-slider" ref={sliderRef}>
                    {questions.map((question, index) => (
                        <div className="quiz-slide" key={question.id}>
                            <div className="question-container">
                                <h2 className="question-text">{question.question}</h2>
                                {question.allowMultiple && (
                                    <p className="select-multiple-hint">Select all that apply</p>
                                )}
                                <div className="options-container">
                                    {question.options.map(option => (
                                        <div
                                            key={option.id}
                                            className={`option-item ${isOptionSelected(question.id, option.id) ? 'selected' : ''} ${isAnimating ? 'animating' : ''}`}
                                            onClick={() => handleOptionSelect(question.id, option.id)}
                                        >
                                            <div className="option-checkbox">
                                                {question.allowMultiple
                                                    ? (isOptionSelected(question.id, option.id) ? '✓' : '')
                                                    : (isOptionSelected(question.id, option.id) ? '●' : '')
                                                }
                                            </div>
                                            <div className="option-text">{option.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="quiz-controls">
                <button
                    className="nav-button prev"
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                    <button
                        className="nav-button submit"
                        onClick={handleSubmit}
                        disabled={!isCurrentQuestionAnswered()}
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        className="nav-button next"
                        onClick={handleNext}
                        disabled={!isCurrentQuestionAnswered()}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

// Sample data for demonstration
const sampleQuestions = [
    {
        id: 'q1',
        question: 'What is the capital of France?',
        options: [
            { id: 'q1a', text: 'London' },
            { id: 'q1b', text: 'Berlin' },
            { id: 'q1c', text: 'Paris' },
            { id: 'q1d', text: 'Madrid' }
        ],
        correctAnswer: 'q1c',
        allowMultiple: false
    },
    {
        id: 'q2',
        question: 'Which of these are primary colors?',
        options: [
            { id: 'q2a', text: 'Red' },
            { id: 'q2b', text: 'Green' },
            { id: 'q2c', text: 'Blue' },
            { id: 'q2d', text: 'Orange' }
        ],
        correctAnswer: ['q2a', 'q2c'],
        allowMultiple: true
    },
    {
        id: 'q3',
        question: 'Who wrote "Romeo and Juliet"?',
        options: [
            { id: 'q3a', text: 'Charles Dickens' },
            { id: 'q3b', text: 'William Shakespeare' },
            { id: 'q3c', text: 'Jane Austen' },
            { id: 'q3d', text: 'Mark Twain' }
        ],
        correctAnswer: 'q3b',
        allowMultiple: false
    }
];

// Main demo component
const QuizDemo = () => {
    return (
        <Layout>
            <div className="quiz-demo-container">
                <h1>Interactive Quiz</h1>
                <p>Test your knowledge with these questions. You have 30 seconds per question.</p>
                <QuizComponent id="demo-quiz" questions={sampleQuestions} />
            </div>
        </Layout>
    );
};

export default QuizDemo;