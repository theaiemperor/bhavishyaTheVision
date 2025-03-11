import { Box, Button } from "@mui/joy";
import QuizContainer from "../_shared/QuizContainer";
import { useEffect } from "react";
import { formatTime, IAnswer, IQuestion, IResult } from "../_shared/utils";
import Confetti from "../Result/Confetti";
import ReviewModal from "../Result/ReviewModal";
import ScoreCircle from "../Result/ScoreCircle";




interface Props {
    timeTaken: number
    id: string
    onRestart: () => void
    answers: IAnswer
    questions: IQuestion[]
}



export default function (props: Props) {

    const reviewSlideIn = false;

    useEffect(() => {
        localStorage.removeItem(`quiz_progress_${props.id}`)
    }, [])

    function getRes() {

        let total = 0;
        let score = 0;
        let partial = 0;
        let correct = 0;
        let incorrect = 0;
        let resultData: IResult[] = [];



        props.questions.forEach(question => {
            const user_answer = props.answers[question.question];

            const prev_correct = correct;
            const prev_incorrect = incorrect;

            if (Array.isArray(question.correct)) {
                total += question.correct.length;

                let temp = 0;

                question.correct.forEach(val => {


                    if (user_answer && user_answer.includes(val)) {
                        temp++;
                    }
                })

                score += temp;

                if (temp === question.correct.length) {
                    correct++;
                } else if (temp === 0) {
                    incorrect++;
                } else {
                    partial++;
                }


            } else {
                total++;
                if (question.correct === user_answer) {
                    correct++;
                    score++;
                } else {
                    incorrect++;
                }

            }
            resultData = [...resultData,
            {
                ...question,
                user: user_answer,
                type: (prev_correct !== correct ? 'correct' : (prev_incorrect !== incorrect ? 'incorrect' : 'partial'))
            }];

        })


        const data = { partial, correct, incorrect, resultData, score: Math.round((score / total) * 100) };

        try {

            const prev_data = JSON.parse(localStorage.getItem('quiz_' + props.id) || '[]');
            const new_data = { [new Date().toString()]: { date: new Date(), timeTaken: props.timeTaken, ...data }, ...prev_data, }
            localStorage.setItem('quiz_' + props.id, JSON.stringify(new_data));

        } catch (_) {

        }

        return data;
    }

    const result = getRes();



    return <>

        <QuizContainer>
            {
                result.score > 95 && <Confetti />
            }
            <div className={`transition-all duration-500 ${reviewSlideIn ? 'transform -translate-x-full absolute inset-0 p-8' : ''}`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Quiz Completed!</h2>
                <ScoreCircle score={result.score} />

                <div className="mb-8 text-left p-4 border rounded-lg bg-white">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Correct</p>
                            <p className="font-medium text-green-600 ml-3">{result.correct}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Incorrect</p>
                            <p className="font-medium text-red-600 ml-3">{result.incorrect}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <p className="text-sm text-gray-600">Partial Correct</p>
                            <p className="font-medium text-blue-600 ml-3">{result.partial}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Time Taken</p>
                            <p className="font-medium  ml-3">{formatTime(props.timeTaken) } Minutes</p>
                        </div>

                    </div>
                </div>

                <Box className="flex gap-5">
                    <Button
                        fullWidth
                        onClick={props.onRestart}
                        className="transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                        children="Quiz Home"
                    />

                    <ReviewModal data={result.resultData} />
                </Box>
            </div>

        </QuizContainer>


    </>
}