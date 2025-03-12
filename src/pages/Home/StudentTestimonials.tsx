import { FormatQuote } from '@mui/icons-material';
import { Box, StepIndicator, Typography } from '@mui/joy';
import SimpleContainer from '@site/src/components/global/SimpleContainer';
import { useState, useEffect } from 'react';

export default function () {

    const [currentTestimonial, setCurrentTestimonial] = useState(0);


    const testimonials = [
        {
            id: 1,
            name: "Rajesh Kumar",
            position: "MBA Graduate, Delhi University",
            image: "/bhavishyaTheVision/img/student.svg",
            text: "The guidance I received from the mentors at Pinnacle Coaching transformed my career trajectory. Their personalized approach helped me secure a position at a top consulting firm. Forever grateful for their support during my preparation journey."
        },
        {
            id: 2,
            name: "Priya Sharma",
            position: "IIT-JEE Qualifier, 2024",
            image: "/bhavishyaTheVision/img/student.svg",
            text: "I joined Pinnacle Coaching with average scores, but their structured methodology and dedicated faculty helped me achieve a rank in the top 500 in IIT-JEE. The weekly mock tests and personal mentoring sessions were game-changers for me."
        },
        {
            id: 3,
            name: "Amit Singh",
            position: "Civil Services, AIR 42",
            image: "/bhavishyaTheVision/img/student.svg",
            text: "After two unsuccessful attempts at UPSC, I enrolled with Pinnacle Coaching. Their current affairs sessions, interview preparation, and strategy planning were instrumental in my success. Their faculty doesn't just teach, they mentor."
        },
        {
            id: 4,
            name: "Neha Verma",
            position: "Medical Professional, AIIMS",
            image: "/bhavishyaTheVision/img/student.svg",
            text: "Preparing for NEET while completing my internship seemed impossible until I found Pinnacle's flexible program. Their online resources and weekend intensive sessions were perfectly tailored to my schedule. Cleared NEET with a top score!"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);



    const navigateTestimonial = (index) => {
        setCurrentTestimonial(index);
    };

    return <>

        <SimpleContainer title='Students Success Stories'>
            <Box className="max-w-full p-2 overflow-hidden">
                <Box className="flex transition-transform duration-500 ease"
                    style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                    {testimonials.map((testimonial) => (
                        <Box key={testimonial.id} className="min-w-full text-center p-10">
                            <FormatQuote sx={{ fontSize: 50 }} />
                            <Typography
                                fontStyle={'italic'}
                                lineHeight={1.8}
                                mb={'30px'}
                                sx={{ fontSize: 18 }}
                            >
                                {testimonial.text}
                            </Typography>
                            <Box className="flex justify-center items-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    style={{ border: '2px solid red', borderRadius: '50%' }}
                                    className='w-20 h-20 object-cover mr-4'
                                />
                                <Box>
                                    <Typography level='h4' color='primary'>{testimonial.name}</Typography>
                                    <Typography level='body-xs' >{testimonial.position}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box className="flex w-full justify-center mt-5">
                {testimonials.map((_, index) => (
                    <StepIndicator
                        key={index}
                        variant={currentTestimonial === index ? 'solid' : 'outlined'}
                        color="primary"
                        className="cursor-pointer"
                        onClick={() => navigateTestimonial(index)}
                        sx={{ scale: 0.5 }}
                    />
                ))
                }
            </Box>
        </SimpleContainer>
    </>
};