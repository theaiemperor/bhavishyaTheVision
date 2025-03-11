import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/joy';
import { IResult } from '../_shared/utils';



interface IReviewAnswer extends IResult {
    index: number
}


function ReviewAnswers({ index, question, correct, user, type }: IReviewAnswer) {


    // Set border color based on the result


    const borderColor = (type === 'correct' ? '#22c55e' : type === 'partial' ? '#3b82f6' : '#ef4444');


    const isMultiSelect = Array.isArray(correct);

    return (
        <Box sx={{ borderLeft: '4px solid ' + borderColor }} className={`p-4 mb-4 bg-opacity-1 bg-gray-100 rounded-lg w-full`}>
            <div className="mb-2 font-semibold text-gray-800">{index + '. '}{question}</div>
            <div className="text-xs font-bold">
                <div className="mt-2 ">
                    <div className=" font-normal pr-2">Your Answer:</div>

                    {
                        !user || user.length === 0 ? <>Not Answered</> :
                            <div>
                                {isMultiSelect ?
                                    (user as string[]).map(item => {
                                        return <div key={item} className='text-sm' >{item}</div>
                                    }
                                    ) : <>{user}</>
                                }
                            </div>
                    }

                </div>
                <div className="mt-2">
                    <div className="font-normal pr-2">Correct Answer :</div>
                    {
                        correct.length === 0 ? <>Unknown</> :
                            <div className='text-green-500'>
                                {isMultiSelect ?
                                    (correct as string[]).map(item => {
                                        return <div key={item} className='text-sm' >{item}</div>
                                    }
                                    ) : <>{correct}</>
                                }
                            </div>
                    }
                </div>

            </div>
        </Box>
    );
};




export default function ({ data }: { data: IResult[] }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                fullWidth
                onClick={() => { setOpen(true) }}
                className="transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
            >
                Review Answers
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog size='sm' className="p-5 w-full md:w-1/2 h-full overflow-y-auto">
                    <Typography level='h4' textAlign={'center'}>
                        Review Your Answers
                    </Typography>
                    <Divider />
                    <Box className="flex-1">
                        {
                            data.map((item, index) => {

                                return <ReviewAnswers
                                    key={index}
                                    index={index + 1}
                                    {...item}
                                />
                            })
                        }
                    </Box>
                    <Box className="flex justify-center sticky -bottom-1 ">


                        <Button onClick={() => { setOpen(false) }} className='hover:scale-105 rounded-xl w-1/3 '>
                            OK
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    );
}
