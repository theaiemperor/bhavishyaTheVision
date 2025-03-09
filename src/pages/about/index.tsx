import Layout from "@theme/Layout"

function AboutUs() {
  return <>
    <h2>Bhavishya Vision</h2>
    <span>
      Bhavishya Vision is a forward-thinking innovation agency that empowers businesses to thrive in an ever-changing landscape by fostering creativity, driving growth, and bridging the gap between ideas and reality. Our mission is to equip companies with the expertise they need to succeed through strategic visioning, innovative solutions, and exceptional service.
    </span>

    <img src="/img/heroSection.png" alt="banner" style={{ marginTop: 20 }} />


    <div style={{ margin: 50 }}></div>

    <h2 style={{}}> A Step to Success</h2>
    <span>
      At Bhavishya Vision, we believe that every step forward is a leap towards success. We inspire businesses to take bold action, cultivate ambitious ideas, and unlock their full potential by providing tailored guidance, expert services, and unwavering support throughout the journey. By embracing our tagline "A Step to Success," companies can navigate challenges with confidence, harness opportunities, and reach new heights of growth and achievement.
    </span>
    <div style={{ margin: 50 }}></div>


    <div>
      <h2 > Contact Us</h2>
      <div> <b>Phone</b> : 9950055031</div>
      <div> <b>Email</b> : ramkishan@gmail.com</div>
      <div> <b>Youtube</b> : https://www.youtube.com/@RamkishanChhimpa</div>
    </div>
    <div style={{ margin: 50 }}></div>


  </>
}



export default function () {
  return <>
    <Layout title='About us' description="About this website" >
      <div className="center" style={{ marginTop: 10 }} >
        <div style={{ width: '80%' }}>
          <AboutUs />
        </div>
      </div>
    </Layout>

  </>
}
