import { Box } from "@mui/joy";
import GradientText from "@site/src/components/global/GradientText";
import SimpleContainer from "@site/src/components/global/SimpleContainer";

export default function () {
    return <>
        <SimpleContainer title="Our Journey">
            <Box className="flex justify-center">
                <Box className="grid grid-cols-1 md:grid-cols-2 max-w-6xl gap-10 mt-10">

                    <Box className="flex items-center justify-center item-center w-full h-full">
                        <img
                            src="/bhavishyaTheVision/img/bhavishya.png"
                            alt="Pinnacle Coaching Institute"
                            className="h-fit w-full rounded-lg"
                        />
                    </Box>

                    <Box className="flex flex-col text-md justify-between gap-5">
                        <GradientText kind="single" className="text-2xl md:text-3xl lg:text-4xl">
                            From a Small Classroom to India's Leading Coaching Institute
                        </GradientText>
                        <Box className="flex-1 flex flex-col justify-evenly gap-5 ">
                            <Box>
                                Established in 2005 by Dr. Vikram Mehta, Pinnacle Coaching began as a small classroom with just 15 students in the heart of Delhi. Our founder, a passionate educator with a vision to transform India's coaching landscape, believed in a personalized approach to education.
                            </Box>

                            <Box>
                                Over the past two decades, we have expanded our horizons to become a nationwide presence with 50+ centers, while maintaining our core philosophy of personalized guidance and mentorship.
                            </Box>
                            <Box>
                                Today, we take pride in being the preferred choice for students aspiring for JEE, NEET, UPSC, CAT, GATE, and various other competitive examinations. Our methodology combines traditional teaching with modern technology to deliver comprehensive learning experiences.
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </SimpleContainer>
    </>
};