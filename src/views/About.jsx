import React from 'react'
import gradPic from '../assets/graduation-pic.jpeg'


const About = () => {
  return (
    <>
      <div className='align-center'>
        <h1 className='header'> About Me</h1>
      </div>
      
      <div className='photo-text-container'>
        <div className='align-center'>
          <div className='photo-container'>
            <img src = {gradPic}></img>
          </div>
        </div>
        <div className='text-container'>
            My name is Bobby. I love working with software, hardware. However, one of my passions is video editing and film making.
            I directed and edited a music video (with the help from many talented individuals), for my college dorm, which is displayed below.
            Projects like these have just demonstrated to me that at my core I am creator, and what drives me is make things that I 
            can share with others
            
        </div>
      </div>
      
      <div className='align-center'>
        <h1> My favorite Project:</h1>
        
      </div>
      <div className='align-center'>
        <h1></h1>
      </div>
      <div className='align-center'>
        <iframe 
        className='housing-day'
        src="https://www.youtube.com/embed/9GP5MxKK-h0?si=U0FYat8WkqdkWQh_" 
        title="YouTube video player" 
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
          
        </iframe>
      </div>
      

      
      
    </>

  )
}

export default About