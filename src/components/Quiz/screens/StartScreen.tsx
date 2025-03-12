import { Box, Button, Typography } from "@mui/joy";
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
            <QuizContainer>
                <Box className="flex flex-col gap-5 my-3 ">
                    <Typography >{quiz.description}</Typography>
                    <Typography level="body-xs" >Time limit: {formatTime(quiz.timeLimit)} Minutes</Typography>
                </Box>
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
                        className="scale-95 duration-300 hover:shadow-lg hover:scale-x-100"
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