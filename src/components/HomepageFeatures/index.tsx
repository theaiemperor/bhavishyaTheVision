import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  link: string;
  description: ReactNode;
};




const FeatureList: FeatureItem[] = [
  {
    title: 'Explore Syllabus & Notes',
    Svg: require('@site/static/img/book.svg').default,
    link: '/docs/study/विषय%20वस्तु',
    description: (
      <>
        Discover a collection of comprehensive syllabus and detailed notes that will guide you through various topics. This section serves as an invaluable resource to quickly get the information you need to advance your learning journey.
      </>
    ),
  },
  {
    title: 'Explore Quizzes and old papers',
    Svg: require('@site/static/img/quize.svg').default,
    link: '/docs/quiz',
    description: (
      <>
        Test your knowledge and reinforce your learning by engaging in interactive quizzes. With a wide range of topics and difficulty levels, these quizzes help you assess your understanding and track your progress.
      </>
    ),
  },
  {
    title: 'Explore Our YouTube Channel',
    Svg: require('@site/static/img/youtube.svg').default,
    link: 'https://www.youtube.com/@RamkishanChhimpa',
    description: (
      <>
        Dive into our educational content on our YouTube channel, <b>RamkishanChhimpa</b>. From tutorials to deep dives into complex topics, this channel is a rich resource for anyone looking to expand their knowledge in an engaging and visual format.
      </>
    ),
  },
];




function Feature({ title, Svg, link, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Link to={link}>
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{marginTop:100}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
