import React from 'react'
import Hero from '../../components/Hero/Hero'
import CardSix from '../../components/CardSix/JobCards'
import JobCards from '../../components/CardSix/JobCards'
import Categories from '../../components/Categories/Categories'

const Home = () => {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <Categories/>
      </div>
      <div className='mt-7'>
        <JobCards limit={6} />
      </div>
    </div>
  );
}

export default Home
