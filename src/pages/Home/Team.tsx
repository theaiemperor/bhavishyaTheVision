import Link from "@docusaurus/Link";
import { LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/joy";
import GradientText from "@site/src/components/global/GradientText";
import SimpleContainer from "@site/src/components/global/SimpleContainer";

export default function () {
    const teamMembers = [
        {
            id: 1,
            name: "Dr. Ramkishan chhimpa",
            position: "Founder & Chief Mentor",
            qualification: "PhD, Educational Psychology, Cambridge University",
            image: "/bhavishyaTheVision/img/ramkishan.png"
        },
        {
            id: 2,
            name: "Prof. Arman",
            position: "Academic Director",
            qualification: "Former HOD, Mathematics, IIT Delhi",
            image: "/bhavishyaTheVision/img/arman.png"
        },
        {
            id: 3,
            name: "Mr. Anil Tiwari",
            position: "UPSC Division Head",
            qualification: "IAS Officer (Retd.), 15 years of coaching experience",
            image: "/bhavishyaTheVision/img/ramkishan-transparent.png"
        },
        {
            id: 4,
            name: "Dr. Anna Reddy",
            position: "Medical Entrance Program Director",
            qualification: "MD, Gold Medalist, 10+ years in medical education",
            image: "/bhavishyaTheVision/img/arman-transparent.png"
        }
    ];


    return <>
        <SimpleContainer title="Meet Our Expert Mentors">
            <div className="flex flex-wrap justify-evenly gap-5">
                {teamMembers.map((member) => (
                    <Card
                        key={member.id}
                        sx={{ width: 'calc(25% - 30px)', p: 0 }}
                        className=" overflow-hidden rounded-xl  min-w-64 shadow-md hover:shadow-lg hover:-translate-y-3 transition-transform duration-300 ease"
                    >
                        <Box className="h-72 overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-500 ease hover:scale-110"
                            />
                        </Box>
                        <Box className="p-5 text-center">
                            <GradientText kind="single" className="text-xl font-bold">
                                {member.name}
                            </GradientText>
                            <Typography fontWeight={'800'} >{member.position}</Typography>
                            <Typography level="body-xs">{member.qualification}</Typography>
                        </Box>
                    </Card>
                ))}
            </div>
        </SimpleContainer>

    </>
};