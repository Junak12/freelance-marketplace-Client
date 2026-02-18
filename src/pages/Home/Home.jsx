import React from 'react'
import Hero from '../../components/Hero/Hero'
import CardSix from '../../components/CardSix/JobCards'
import JobCards from '../../components/CardSix/JobCards'

const Home = () => {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <JobCards limit={6} />
      </div>
    </div>
  );
}

export default Home
