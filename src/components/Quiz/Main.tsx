import { useEffect, useState } from "react"
import {  IAnswer } from "./_shared/utils";
import QuestionScreen from "./screens/QuestionScreen";
import StartScreen from "./screens/StartScreen";
import ResultScreen from "./screens/ResultScreen";
import sampleQuiz from "./_shared/sampleQuiz";


type currentState = 'start' | 'resume' | 'running' | 'result';



export default function () {

    const quiz = sampleQuiz;


    const [currentState, setCurrentState] = useState<currentState>('start');
    const [answers, setAnswer] = useState<IAnswer>({});
    const [time, setTime] = useState<number>(quiz.timeLimit);


    useEffect(() => {
        try {

            if (typeof window !== undefined) {

                const data = localStorage.getItem(`quiz_progress_${quiz.id}`)
                console.log({ data })

                if (!data) return;

                const parsed = JSON.parse(data)

                const isEmpty = Object.keys(parsed).length === 0;

                const temp = parsed['quiz_progress_time'];
                const isInvalid = !temp || isNaN(temp) || +temp <= 5;

                if (isEmpty || isInvalid) {
                    localStorage.removeItem('quiz_progress_' + quiz.id)
                } else {
                    console.log({ isEmpty, isInvalid })
                    setCurrentState('resume')
                }

            }

        } catch (_) { }


    }, [])


    useEffect(() => {
        if (currentState === 'start') {
            setTime(quiz.timeLimit)
        }
    }, [currentState])


    function handleResume() {

        const data = localStorage.getItem(`quiz_progress_${quiz.id}`)

        const parsed = JSON.parse(data)

        const { quiz_progress_time, ...ans } = parsed;
        setAnswer(ans);
        setCurrentState('running');
        setTime(quiz_progress_time);

    }


    function handleQuizeFinish(val: IAnswer, time: number) {
        setAnswer(val);
        setCurrentState('result');
        setTime(time)
    }







    if (currentState === 'running') {
        return <QuestionScreen
            defaultTime={time}
            quizId={quiz.id}
            questions={quiz.questions}
            onQuizFinish={handleQuizeFinish}
            defaultAnswers={answers}
        />

    } else if (currentState === 'result') {
        return <ResultScreen
            id={quiz.id}
            timeTaken={time}
            onRestart={() => {
                setAnswer({});
                setCurrentState('start')
                localStorage.removeItem(`quiz_progress_${quiz.id}`)
            }}
            questions={quiz.questions}
            answers={answers}
        />

    } else {
        return <StartScreen
            onStart={() => { setCurrentState('running') }}
            onResume={handleResume}
            currentState={currentState}
            {...quiz}
        />
    }


}