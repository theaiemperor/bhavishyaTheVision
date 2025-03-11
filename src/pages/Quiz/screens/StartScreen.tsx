import { Button } from "@mui/joy";
import History from "../_shared/History";
import QuizContainer from "../_shared/QuizContainer";
import { IQuiz, formatTime } from "../_shared/utils";



interface Props extends IQuiz {
    currentState: string,
    onStart: () => void
    onResume: () => void
}



export default function ({ currentState, onStart, onResume, ...quiz }: Props) {

    return <div>
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h1>
            <QuizContainer>
                <div className="flex-1">
                    <div className="mb-6 text-gray-700">{quiz.description}</div>
                    <div className="mb-6 text-sm text-gray-600">Time limit: {formatTime(quiz.timeLimit)}</div>
                </div>
                <div className="flex gap-5">
                    {
                        currentState === 'resume' &&
                        <Button
                            fullWidth
                            onClick={onResume}
                            sx={{ height: 45, borderRadius: '30px' }}>
                            Resume Quiz
                        </Button>
                    }


                    <Button
                        fullWidth
                        onClick={onStart}
                        sx={{ height: 45, borderRadius: '30px' }}>
                        Start New Quiz
                    </Button>
                </div>
            </QuizContainer>
        </div>
        <History id={quiz.id} />
    </div>

};