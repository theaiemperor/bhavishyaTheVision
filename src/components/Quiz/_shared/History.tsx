import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Box, Button, CircularProgress } from '@mui/joy';
import { formatTime, getColor } from './utils';
import { useEffect, useState } from 'react';


export interface IHistory {
    score: number
    date: Date
    timeTaken: number
    correct: number
    incorrect: number
    partial: number
}


function loadHistory(quizId: string): IHistory[] | null {

    const [history, setHistory] = useState<IHistory[] | null>(null)

    useEffect(() => {
        if (typeof window !== undefined) {
            const saved = localStorage.getItem(`quiz_${quizId}`);
            if (saved) {
                setHistory(Object.values(JSON.parse(saved)))
            } else {
                setHistory([])
            }
        }
    }, [])

    return history;
}



function HistoryCard(props: IHistory) {

    const color = getColor(props.score, true);


    return (
        <Card variant="outlined" >
            <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                <CircularProgress
                    size='lg'
                    color={color as any}
                    determinate
                    value={props.score}
                >
                    <b>{props.score}%</b>
                </CircularProgress>
                <Box>
                    <Typography level="title-lg" id="card-description">
                        {new Date(props.date).toDateString() + " - " + new Date(props.date).toLocaleTimeString()}
                    </Typography>
                    <Typography
                        level="body-sm"
                        aria-describedby="card-description"
                        sx={{ mb: 1, color: 'text.tertiary' }}
                    >
                        {formatTime(props.timeTaken)} mintues
                    </Typography>

                </Box>
            </CardContent>
            <Box className="flex gap-2 justify-center">
                <Chip
                    variant="outlined"
                    color="success"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                >
                    {props.correct} Correct
                </Chip>

                <Chip
                    variant="outlined"
                    color="danger"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                >
                    {props.incorrect} Incorrect
                </Chip>

                <Chip
                    variant="outlined"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                >
                    {props.partial} Partial
                </Chip>

            </Box>
        </Card>
    );
}



export default function ({ id }: { id: string }) {
    const history = loadHistory(id);
    const [showHistory, setShowHistory] = useState(false)

    if (history === null) {
        return <>Please wait...</>
    } else if (history.length === 0) {
        return <></>;
    }

    return <Box className="w-full h-full">

        {/* <Typography level='h3' sx={{ width: '100%', mt: 5 }} textAlign={'center'}>
            Previous Results
        </Typography>
        */}

        <Box className="flex justify-center my-5">
            <Button
                className='hover:scale-105 duration-500'
                color={showHistory ? 'neutral' : 'primary'}
                onClick={() => { setShowHistory(prev => !prev) }}>
                Show History
            </Button>
        </Box>

        {
            showHistory &&
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 mt-9 ">
                {
                    history.map(item => (
                        <HistoryCard key={item.date.toString()} {...item} />
                    ))
                }
            </Box>
        }

    </Box>
}