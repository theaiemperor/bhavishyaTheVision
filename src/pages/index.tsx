import Layout from "@theme/Layout"
import React, { useState, useEffect } from 'react';
import './Home/Home.css';
import Link from "@docusaurus/Link";

const Home = () => {
  // State for testimonial slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentAchievement, setCurrentAchievement] = useState(0);

  // Testimonial data
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

  // Achievement data
  const achievements = [
    {
      id: 1,
      title: "10,000+ Success Stories",
      description: "Over the past decade, we've helped more than 10,000 students achieve their academic and career goals",
      icon: "trophy"
    },
    {
      id: 2,
      title: "National Excellence Award 2024",
      description: "Recognized as India's Best Coaching Institute by the Education Ministry",
      icon: "award"
    },
    {
      id: 3,
      title: "100+ IIT Selections in 2024",
      description: "Our students secured impressive ranks in India's most competitive engineering entrance exam",
      icon: "graduation-cap"
    },
    {
      id: 4,
      title: "98% Success Rate in UPSC Preliminaries",
      description: "Our civil services batch consistently outperforms national averages",
      icon: "chart-line"
    },
    {
      id: 5,
      title: "50+ Centers Across India",
      description: "From metropolitan cities to tier-2 towns, we're expanding our reach to help students nationwide",
      icon: "map-marker"
    }
  ];

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Vikram Mehta",
      position: "Founder & Chief Mentor",
      qualification: "PhD, Educational Psychology, Cambridge University",
      image: "/bhavishyaTheVision/img/ramkishan.png"
    },
    {
      id: 2,
      name: "Prof. Sunita Agarwal",
      position: "Academic Director",
      qualification: "Former HOD, Mathematics, IIT Delhi",
      image: "/bhavishyaTheVision/img/arman.JPG"
    },
    {
      id: 3,
      name: "Mr. Anil Tiwari",
      position: "UPSC Division Head",
      qualification: "IAS Officer (Retd.), 15 years of coaching experience",
      image: "/bhavishyaTheVision/img/ramkishan.png"
    },
    {
      id: 4,
      name: "Dr. Meera Reddy",
      position: "Medical Entrance Program Director",
      qualification: "MD, Gold Medalist, 10+ years in medical education",
      image: "/bhavishyaTheVision/img/arman.JPG"
    }
  ];

  // Auto-slide functionality for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Auto-slide functionality for achievements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchievement((prev) => (prev + 1) % achievements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [achievements.length]);

  // Testimonial navigation
  const navigateTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Achievement navigation
  const navigateAchievement = (index) => {
    setCurrentAchievement(index);
  };

  return (
    <div className="home-container">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="banner-overlay">
          <h1>Transforming Ambitions into Achievements</h1>
          <p>India's Premier Coaching Institute for Competitive Exams Since 2005</p>
          <Link to={'/bhavishyaTheVision/docs/study/विषय%20वस्तु'}>
            <button className="cta-button">Explore our Study material</button>
          </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="section-header">
          <h2>Our Journey</h2>
          <div className="underline"></div>
        </div>
        <div className="story-content">
          <div className="story-image">
            <img src="/bhavishyaTheVision/img/bhavishya.png" alt="Pinnacle Coaching Institute" />
          </div>
          <div className="story-text">
            <h3>From a Small Classroom to India's Leading Coaching Institute</h3>
            <p>Established in 2005 by Dr. Vikram Mehta, Pinnacle Coaching began as a small classroom with just 15 students in the heart of Delhi. Our founder, a passionate educator with a vision to transform India's coaching landscape, believed in a personalized approach to education.</p>
            <p>Over the past two decades, we have expanded our horizons to become a nationwide presence with 50+ centers, while maintaining our core philosophy of personalized guidance and mentorship.</p>
            <p>Today, we take pride in being the preferred choice for students aspiring for JEE, NEET, UPSC, CAT, GATE, and various other competitive examinations. Our methodology combines traditional teaching with modern technology to deliver comprehensive learning experiences.</p>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="philosophy-section">
        <div className="section-header">
          <h2>Our Philosophy</h2>
          <div className="underline"></div>
        </div>
        <div className="philosophy-content">
          <div className="philosophy-card">
            <div className="philosophy-icon">
              <i className="fa fa-lightbulb"></i>
            </div>
            <h3>Personalized Learning</h3>
            <p>We believe each student has unique learning needs and pace. Our adaptive methodology caters to individual strengths and areas of improvement.</p>
          </div>
          <div className="philosophy-card">
            <div className="philosophy-icon">
              <i className="fa fa-users"></i>
            </div>
            <h3>Mentorship Over Teaching</h3>
            <p>Our faculty members don't just teach; they mentor students throughout their journey, providing guidance beyond academics.</p>
          </div>
          <div className="philosophy-card">
            <div className="philosophy-icon">
              <i className="fa fa-chart-line"></i>
            </div>
            <h3>Data-Driven Progress</h3>
            <p>Regular assessments and analytics help us track student progress and customize study plans for optimal results.</p>
          </div>
          <div className="philosophy-card">
            <div className="philosophy-icon">
              <i className="fa fa-globe"></i>
            </div>
            <h3>Holistic Development</h3>
            <p>Beyond academic excellence, we focus on developing communication skills, critical thinking, and character building.</p>
          </div>
        </div>
      </section>

      {/* Achievements Slider Section */}
      <section className="achievements-section">
        <div className="section-header">
          <h2>Our Achievements</h2>
          <div className="underline"></div>
        </div>
        <div className="achievements-slider">
          <div className="achievement-slide" style={{ transform: `translateX(-${currentAchievement * 100}%)` }}>
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">
                  <i className={`fa fa-${achievement.icon}`}></i>
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            {achievements.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${currentAchievement === index ? 'active' : ''}`}
                onClick={() => navigateAchievement(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Meet Our Expert Mentors</h2>
          <div className="underline"></div>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-details">
                <h3>{member.name}</h3>
                <h4>{member.position}</h4>
                <p>{member.qualification}</p>
                <div className="social-icons">
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Student Success Stories</h2>
          <div className="underline"></div>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial-slide" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="quote-icon">
                  <i className="fa fa-quote-left"></i>
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${currentTestimonial === index ? 'active' : ''}`}
                onClick={() => navigateTestimonial(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <div className="underline"></div>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa fa-map-marker"></i>
              </div>
              <h3>Head Office</h3>
              <p>Pinnacle House, 42 Rajpath Road</p>
              <p>Connaught Place, New Delhi - 110001</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa fa-phone"></i>
              </div>
              <h3>Call Us</h3>
              <p>Toll-Free: 1800-123-4567</p>
              <p>Direct: +91 98765 43210</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p>admissions@pinnaclecoaching.edu.in</p>
              <p>info@pinnaclecoaching.edu.in</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa fa-clock"></i>
              </div>
              <h3>Working Hours</h3>
              <p>Monday to Saturday: 9:00 AM - 7:00 PM</p>
              <p>Sunday: 10:00 AM - 2:00 PM (Counseling Only)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default function () {
  return <>
    <Layout title='Home' description="Home of this website" >
      <Home />

    </Layout>

  </>
}
