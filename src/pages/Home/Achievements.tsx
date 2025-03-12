import { EmojiEvents, Map, Psychology, School, TrendingUp } from '@mui/icons-material';
import { Box, StepIndicator, Typography } from '@mui/joy';
import GradientText from '@site/src/components/global/GradientText';
import SimpleContainer from '@site/src/components/global/SimpleContainer';
import { useState, useEffect } from 'react';

export default function () {

  const [currentAchievement, setCurrentAchievement] = useState(0);


  const achievements = [
    {
      id: 1,
      title: "10,000+ Success Stories",
      description: "Over the past decade, we've helped more than 10,000 students achieve their academic and career goals",
      icon: EmojiEvents
    },
    {
      id: 2,
      title: "National Excellence Award 2024",
      description: "Recognized as India's Best Coaching Institute by the Education Ministry",
      icon: Psychology
    },
    {
      id: 3,
      title: "100+ IIT Selections in 2024",
      description: "Our students secured impressive ranks in India's most competitive engineering entrance exam",
      icon: School
    },
    {
      id: 4,
      title: "98% Success Rate in UPSC Preliminaries",
      description: "Our civil services batch consistently outperforms national averages",
      icon: TrendingUp
    },
    {
      id: 5,
      title: "50+ Centers Across India",
      description: "From metropolitan cities to tier-2 towns, we're expanding our reach to help students nationwide",
      icon: Map
    }
  ];



  const navigateAchievement = (index: number) => {
    setCurrentAchievement(index);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchievement((prev: number) => (prev + 1) % achievements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [achievements.length]);




  return <>
    <SimpleContainer title='Our Achievements'>
      <Box className="max-w-full p-2 overflow-hidden">
        <Box className=" flex transition-transform duration-500 ease " style={{ transform: `translateX(-${currentAchievement * 100}%)` }}>


          {achievements.map((Achievement) => (

            <Box
              key={Achievement.id}
              className="min-w-full text-center p-10 transition-opacity duration-300 ease">
              <Achievement.icon
                color='success'
                sx={{
                  mb: 3,
                  fontSize: 150,
                }}
              />

              <GradientText kind='single' className='text-3xl mb-5 font-bold'>
                {Achievement.title}
              </GradientText>
              <Typography  >{Achievement.description}</Typography>
            </Box>

          ))}


        </Box>

      </Box>


      <Box className="flex justify-center mt-5 " >
        {achievements.map((_, index) => (
          <StepIndicator
            key={index}
            variant={currentAchievement === index ? 'solid' : 'outlined'}
            color="primary"
            className="cursor-pointer"
            aria-label="Achievement Slider dot"
            onClick={() => navigateAchievement(index)}
            sx={{ scale: 0.5 }}
          />
        ))
        }
      </Box>
    </SimpleContainer>

  </>
};
