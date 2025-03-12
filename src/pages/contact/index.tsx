import { Box, Card, Typography, AspectRatio, CardOverflow } from "@mui/joy";
import SimpleContainer from "@site/src/components/global/SimpleContainer";
import Layout from "@theme/Layout";
import InfoCard from "./components/InfoCard";
import { Email, Apartment, Phone, AccessTime, Twitter, YouTube, Facebook, Instagram } from '@mui/icons-material';
import Link from "@docusaurus/Link";


function Contact() {


    const socialMedia = [
        { icon: Twitter, link: 'tw' },
        { icon: YouTube, link: 'yt' },
        { icon: Facebook, link: 'fb' },
        { icon: Instagram, link: 'in' },
    ]




    return <>
        <SimpleContainer title="Have any Question? &nbsp; Want to Contact Us" >
            <Box className="m-5">
                <Box className="flex flex-col gap-3 my-11">
                    <Typography textAlign={'center'} className="px-3 md:px-32 " >
                        At Bhavishya The vision, we are dedicated to supporting your journey toward securing a government job. If you have any questions about our programs or wish to schedule a counseling session, please feel free to contact us through the following channels:
                    </Typography>
                </Box>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                    <Box className="flex flex-col gap-5 ">
                        <InfoCard title={<> <Apartment sx={{ fontSize: 25 }} /> Head Office</>}>
                            <Typography level="body-sm">Pinnacle House, 42 Rajpath Road</Typography>
                            <Typography level="body-sm">Connaught Place, New Delhi - 110001</Typography>
                        </InfoCard>

                        <InfoCard title={<> <Email sx={{ fontSize: 25 }} /> Email Us</>}>
                            <Typography level="body-sm">admissions@bhavishyaTheVision.edu.in</Typography>
                            <Typography level="body-sm">info@bhavishyaTheVision.edu.in</Typography>



                        </InfoCard>

                        <InfoCard title={<><Phone sx={{ fontSize: 25 }} /> Call Us</>}>
                            <Typography level="body-sm">Toll-Free: 1800-123-4567</Typography>
                            <Typography level="body-sm">Direct: +91 98765 43210</Typography>
                        </InfoCard>

                    </Box>
                    <Box className="flex flex-col gap-3 md:gap-5">

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6912.785168588323!2d73.73967184402291!3d29.96814564430028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917cc00602fd959%3A0xdc02c7070bc2cb4b!2sMirzawala%2C%20Rajasthan%20335038!5e0!3m2!1sen!2sin!4v1741768689753!5m2!1sen!2sin"
                            title="Our location"
                            className="flex-1 rounded-md min-h-64"
                            loading="lazy"

                        />

                        <InfoCard title={<><AccessTime sx={{ fontSize: 25 }} /> Working Hours</>}>
                            <Typography level="body-sm">Monday to Saturday: 9:00 AM - 7:00 PM</Typography>
                            <Typography level="body-sm">Sunday: 10:00 AM - 2:00 PM (Counseling Only)</Typography>
                        </InfoCard>
                    </Box>



                </Box>
                <Box className="md:flex justify-center mt-5 md:mt-20">
                    <Card variant="soft" orientation="horizontal" className="flex justify-center gap-5">
                        {
                            socialMedia.map(Item => {
                                return <Link
                                    key={Item.link}
                                    href={Item.link}
                                    className="transition hover:-translate-y-1 duration-300 px-3"
                                >
                                    <Item.icon sx={{ fontSize: 40 }} color="primary" />
                                </Link>
                            })
                        }
                    </Card>
                </Box>
            </Box>
        </SimpleContainer>



    </>
}








export default function () {
    return <>
        <Layout>
            <Contact />
        </Layout>
    </>
};