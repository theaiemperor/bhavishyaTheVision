import { Box, Card, Typography } from "@mui/joy"
import GradientText from "@site/src/components/global/GradientText";
import SimpleContainer from "@site/src/components/global/SimpleContainer";

export default function () {

    const ourPhilosophies = [
        { title: 'Personalized Learning', icon: '', description: 'We believe each student has unique learning needs and pace. Our adaptive methodology caters to individual strengths and areas of improvement.' },
        { title: 'Mentorship Over Teaching', icon: '', description: "Our faculty members don't just teach; they mentor students throughout their journey, providing guidance beyond academics." },
        { title: 'Data-Driven Progress', icon: '', description: 'Regular assessments and analytics help us track student progress and customize study plans for optimal results.' },
        { title: 'Holistic Development', icon: '', description: 'Beyond academic excellence, we focus on developing communication skills, critical thinking, and character building.' },
    ]



    return <>

        <SimpleContainer title="Our Philosophy">
            <Box className="mt-14 flex flex-wrap justify-center gap-5 md:gap-9">
                {
                    ourPhilosophies.map(item => {
                        return <Card
                            key={item.title}
                            variant="soft"
                            sx={{ px: 7, py: 2, width: 270, ":hover": { boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' } }}
                            className="hover:-translate-y-3 shadow-md duration-500 cursor-default"
                        >
                         
                            <GradientText kind="single" className="text-xl font-bold text-center" >
                                {item.title}
                            </GradientText>

                            <Typography
                                textAlign={'center'}
                                children={item.description} />

                        </Card>
                    })
                }
            </Box>
        </SimpleContainer>

    </>
}