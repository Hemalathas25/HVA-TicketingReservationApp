import React from 'react'
import videoBg from '../assets/video.mp4';
import './bgv.css';

const main = () => {
  return (
    <div className='main'>
      <div className='overlay'></div>
      <video src={videoBg} autoPlay loop muted/>
    </div>
  )
}

export default main