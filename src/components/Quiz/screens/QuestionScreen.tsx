import { useEffect, useState } from "react";
import { Box, Button, Card, Checkbox, Radio, RadioGroup } from "@mui/joy";
import useTimer from "../_shared/useTimer";
import QuizContainer from "../_shared/QuizContainer";
import { IQuestion, IAnswer, formatTime } from "../_shared/utils";



interface Props {
    quizId: string
    questions: IQuestion[],
    onQuizFinish: (answers: IAnswer, time: number) => void
    defaultAnswers?: IAnswer
    defaultTime: number
}

export default function ({ quizId, questions, onQuizFinish, defaultAnswers, defaultTime }: Props) {


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const timeRemaining = useTimer(defaultTime);
    const [answer, setAnswer] = useState<IAnswer>(defaultAnswers || {})


    const IS_LAST_QUESTION = currentQuestionIndex + 1 === questions.length;
    const CURRENT_QUESTION = questions[currentQuestionIndex];
    const IS_MULTI_SELECT = Array.isArray(CURRENT_QUESTION.correct);



    function handlePrevious() {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }





    function handleNext() {
        if (!IS_LAST_QUESTION) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            onQuizFinish(answer, defaultTime - timeRemaining);
        }
    }



    useEffect(() => {


        if (timeRemaining < 1) {
            onQuizFinish(answer, defaultTime)
        }

        //   Save progress to localStorage in every 5 seconds
        if (timeRemaining % 5 === 0) {
            const data = JSON.stringify({ ...answer, 'quiz_progress_time': timeRemaining });
            localStorage.setItem(`quiz_progress_${quizId}`, data);
        }

    }, [timeRemaining])



    return <>

        <QuizContainer>
            {/* Header */}
            <Box className="flex justify-between items-center mb-4">
                <Box className="text-sm font-semibold">
                    Question {currentQuestionIndex + 1}/{questions.length}
                </Box>
                <Box className={`text-sm font-mono ${timeRemaining < 60 ? 'text-red-600 animate-pulse' : ''}`}>
                    Time: {formatTime(timeRemaining)}
                </Box>
            </Box>

            {/* Progress bar */}
            <Box className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <Box
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></Box>
            </Box>

            {/* Question */}
            <Box className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{CURRENT_QUESTION.question}</h2>
                <Box className="text-xs text-gray-500 mb-4">
                    {IS_MULTI_SELECT ? 'Select all that apply' : 'Select one answer'}
                </Box>


                {/* Options */}
                {

                    !IS_MULTI_SELECT ?
                        <>
                            <RadioGroup
                                aria-label="Select Your Answer"
                                sx={{ gap: '16px' }}
                                value={answer[CURRENT_QUESTION.question] || null}

                                onChange={(e) => { setAnswer(prev => ({ ...prev, [CURRENT_QUESTION.question]: e.target.value })) }}
                            >
                                {CURRENT_QUESTION.options.map((item) => (
                                    <Card
                                        key={item}
                                        sx={{ bgcolor: 'transparent', }}
                                    >
                                        <Radio
                                            overlay
                                            value={item}
                                            label={item}
                                            slotProps={{
                                                action: ({ checked }: any) => ({
                                                    sx: (theme) => ({
                                                        ...(checked && {
                                                            border: '2px solid',
                                                            borderColor: theme.vars.palette.primary[500],
                                                        }),
                                                    }),
                                                }),
                                            }}
                                        />
                                    </Card>
                                ))}
                            </RadioGroup>

                        </> :
                        <>
                            <Box className="flex flex-col gap-4">
                                {CURRENT_QUESTION.options.map((item) => (
                                    <Card
                                        key={item}
                                        sx={{ bgcolor: 'transparent' }}
                                    >
                                        {/* TODO: Make shape rounded */}
                                        <Checkbox
                                            checked={(answer[CURRENT_QUESTION.question] || []).includes(item)}
                                            overlay
                                            label={item}
                                            onChange={(e) => {
                                                setAnswer(prev => {
                                                    const currentAnswers = prev[CURRENT_QUESTION.question] || [];

                                                    if (e.target.checked) {
                                                        return {
                                                            ...prev,
                                                            [CURRENT_QUESTION.question]: [...currentAnswers, item],
                                                        };
                                                    } else {
                                                        return {
                                                            ...prev,
                                                            [CURRENT_QUESTION.question]: (currentAnswers as string[]).filter((i: string) => i !== item),
                                                        };
                                                    }
                                                });
                                            }}
                                        />

                                    </Card>
                                ))}
                            </Box>

                        </>
                }
            </Box>

            {/* Navigation */}
            <Box className="flex gap-5  mt-6">
                <Button
                    fullWidth
                    disabled={currentQuestionIndex === 0}
                    onClick={handlePrevious}
                    sx={{ borderRadius: '50px', p: 1.5 }}
                    className="transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                >
                    Previous Question
                </Button>
                <Button
                    fullWidth
                    onClick={handleNext}
                    color={IS_LAST_QUESTION ? 'success' : 'primary'}
                    sx={{ borderRadius: '50px', p: 1.5 }}
                    className="transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                >
                    {IS_LAST_QUESTION ? 'Finish Quiz' : 'Next Question'}
                </Button>
            </Box>
        </QuizContainer>
    </>
}