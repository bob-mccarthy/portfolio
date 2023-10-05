import React, {useEffect, useState} from 'react'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

let variants = {
  rightEnter: (direction) => ({x:direction * -350, scale: direction === -1 ? 0.9 : 1.1}),
  rightExit: (direction) => ({x:direction * 350, scale: direction === 1 ? 0.9 : 1}),
  enter: (direction) => ({x:direction * -350, scale: 1}),
  center: {x:0, scale: 1},
  centerActive: {x:0, scale: 1.1},
  exit: (direction) => ({x:direction * 350, scale: 0.9}),
  // exit: (direction) => ({opacity: 0, transition: {duration: 1}}),
  leftEnter: (direction) => ({x:direction * -350, scale: direction === 1 ? 0.9 : 1.1}),
  leftExit: (direction) => ({x:direction * 350, scale: direction === -1 ? 0.9 : 1})
  

}

const duration = 0.5



const Carousel = (props) => {
  // const [center, setCenter] = useState(2)
  const [tuple, setTuple] = useState([null, 2])
  const [disableMove, setDisableMove] = useState(false)
  const navigate = useNavigate();

  const handleClick = (url) => {
    // Use navigate to navigate to a different route
    navigate(url);
  };


  let direction = (tuple[1] < tuple[0]) ? -1 : 1;

  if (tuple[1] !== props.center){
    setTuple([tuple[1], props.center])
  }

  
  const handleMove = (direction) => {
    props.changeCenter(props.center + direction)
    // setCenter(center + direction)
    setDisableMove(true)
    setTimeout(() => {
      setDisableMove(false)
    },duration * 1000)
  }

  return (
    <div>
      <div className='carousel-mask'>
        <div className='align-center'>
          <div className='carousel-container'>
            <div className='button-container'>
              <button className = 'carousel-button' disabled = {disableMove} onClick={() => handleMove(-1)}>
                <FaChevronLeft  style = {{color: 'black'}}/>
              </button>
              <button className = 'carousel-button' disabled = {disableMove} onClick={() => handleMove(1)}>
                <FaChevronRight />
              </button>
            </div>
              
              <AnimatePresence custom={direction}>
                <motion.div 
                  key = {props.center.toString() + 'left' }
                  variants = {variants}
                  className = 'card left'
                  initial = {'leftEnter'}
                  animate = {'center'}
                  custom={direction}
                  exit = {'leftExit'}
                  onClick = {() => handleClick(props.projects[Math.abs(props.center + 1) % props.projects.length].url)}
                  transition={{duration: duration}}>
                    <motion.div className='card-img-container'>
                      <motion.img className='card-img'
                          key = {props.projects[Math.abs(props.center + 1) % props.projects.length].thumbnail}
                          src = {props.projects[Math.abs(props.center + 1) % props.projects.length].thumbnail}
                          >
                      </motion.img>
                    </motion.div>
                    <motion.h1>
                      {props.projects[Math.abs(props.center + 1) % props.projects.length].title}
                    </motion.h1>
                </motion.div>

                <motion.div 
                key = {props.center}
                variants = {variants}
                className = 'card'
                initial = {'enter'}
                animate = {'centerActive'}
                custom={direction}
                exit = {'exit'}
                onClick = {() => handleClick(props.projects[Math.abs(props.center) % props.projects.length].url)}
                transition={{
                  duration: duration,
                  exit : {duration: 0.01}
                }}>
                  <motion.div className='card-img-container'>
                    <motion.img className='card-img'
                      key = {props.center}
                      src = {props.projects[Math.abs(props.center) % props.projects.length].thumbnail}
                      >

                    </motion.img>
                  </motion.div>
                  <motion.h1>
                    {props.projects[Math.abs(props.center) % props.projects.length].title}
                  </motion.h1>
                </motion.div>

                <motion.div 
                key = {props.center.toString() + 'right' }
                variants = {variants}
                className = 'card right'
                initial = {'rightEnter'}
                animate = {'center'}
                custom={direction}
                exit = {'rightExit'}
                onClick = {() => handleClick(props.projects[Math.abs(props.center - 1) % props.projects.length].url)}
                transition={{duration: duration}}>
                  <motion.div className='card-img-container'>
                    <motion.img className='card-img'
                        key = {props.projects[Math.abs(props.center - 1) % props.projects.length].thumbnail}
                        src = {props.projects[Math.abs(props.center - 1) % props.projects.length].thumbnail}
                        >
                    </motion.img>
                  </motion.div>
                  
                  <motion.h1 >
                  {props.projects[Math.abs(props.center - 1) % props.projects.length].title}
                  </motion.h1>
                </motion.div>
              </AnimatePresence> 
            
          </div>
        </div>
      </div>
      
    </div>
    
  )
}



export default Carousel