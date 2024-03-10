import React from 'react';
import About from './About';
import Contact from './Contact';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <>
      <div className="home-container">
        <video className="video-background" autoPlay muted loop>
          <source src="/videos/video-2.mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content-overlay">
          <h1>Welcome to Our Website</h1>
          <p>Discover amazing content here!</p>
        </div>
      </div>

     
        <About />
     
        <Contact />
   
    </>
  );
};

export default Home;
