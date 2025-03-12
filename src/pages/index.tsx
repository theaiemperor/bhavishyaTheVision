import Layout from "@theme/Layout"
import OurJourney from "./Home/OurJourney";
import OurPhilosophies from "./Home/OurPhilosophies";
import Achievements from "./Home/Achievements";
import Banner from "./Home/Banner";
import StudentTestimonials from "./Home/StudentTestimonials";
import Team from "./Home/Team";
import { Box } from "@mui/joy";



export default function () {
  return <>
    <Layout title='Home' description="Home of this website" >
      <Box sx={{background:'@site/img/heroSection.png'}}>
        <Banner />
        <Box className="flex flex-col gap-32">
          <OurJourney />
          <OurPhilosophies />
          <Achievements />
          <Team />
          <StudentTestimonials />
        </Box>
      </Box>
    </Layout>
  </>
}
