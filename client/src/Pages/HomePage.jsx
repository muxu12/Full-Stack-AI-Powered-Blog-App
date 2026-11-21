import React from 'react'
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Bloglist from '../Components/Bloglist';
import Newsletter from '../Components/Newsletter';
import Footer from '../Components/Footer';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist/>
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default HomePage
