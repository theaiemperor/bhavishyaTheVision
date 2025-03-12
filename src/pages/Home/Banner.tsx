import Link from "@docusaurus/Link";
import { Box, Button, useTheme } from "@mui/joy";
import GradientText from "@site/src/components/global/GradientText";







export default function () {

    const { palette } = useTheme();
    const f = palette.primary[600];
    const s = palette.primary[400];



    return <>
        <Box className="relative h-full min-h-screen bg-cover flex items-center justify-center text-center">
            <Box className="flex flex-col items-center justify-center">

                <GradientText
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 w-11/12 md:w-9/12 lg:w-8/12"
                >
                    Transforming Ambitions into Achievements
                </GradientText>



                <Box className=" text-md md:text-lg lg:text-xl my-4">
                    India's Premier Coaching Institute for Competitive Exams Since 2005
                </Box>

                <Link to={'/docs/study/विषय%20वस्तु'} className='mt-10'>
                    <Button
                        className="hover:-translate-y-1.5 transition-transform duration-300 ease shadow-md hover:shadow-3xl"
                        size="lg"
                        sx={{ borderRadius: 50, background: `linear-gradient(to right, ${f}, ${s})` }}
                    >
                        Explore our Study material
                    </Button>
                </Link>
            </Box>
        </Box >
    </>
};