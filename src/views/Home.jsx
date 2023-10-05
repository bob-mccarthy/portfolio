import Reac, {useEffect, useState, useReducer} from 'react'
import Carousel from '../components/Carousel'
import {motion, AnimatePresence} from 'framer-motion'
import ur_hrvrd_thumbnail from '../assets/Ur.Hrvrd-Interface.png'
import cameraSlider from '../assets/camera-slider.jpg'
import morningRoutine from '../assets/morning-routine-robot.jpg'


const Home = () => {
  const [introInd, setIntroInd] = useState(0)
  const [index, dispatch] = useReducer(imageReducer, 2)

  const runIntro = (ind) => {
    if (ind != introText.length && ind > introInd){
      setIntroInd(ind)
      setTimeout(() => {
        runIntro(ind + 1)
      }, introDuration * 1000)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      runIntro(1)
    }, introDuration * 1500)
  },[])

  const changeCenter = (index) => {
    dispatch({
      index: index
    })
  }

  return (
    <>
        <div className='hero-page'>
          <div className='hero-page-text'>
            <div className = 'sub-heading'>
              Hey, I'm Bobby.
            </div>
            <div className='main-heading-container heading-text-mask'>
              <div className='main-heading'>
                I like to make 
              </div>
              <AnimatePresence>
                <motion.div 
                  key = {introText[introInd]}
                  className='main-heading aligned-side' 
                  // style = {{top: -4, left: 630}}
                  initial = {{y:-120}}
                  animate = {{y:0}}
                  exit= {{y: 120}}>
                  {introText[introInd]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className='align-center'>
          <div className='hero-section'>
            <h1>Projects</h1>
            <hr style = {{border: 'solid'}}></hr>
          </div>
        </div>
        <div className='align-center'>
          <div className='carousel-background' >
            <div >
              <Carousel  projects = {projects} changeCenter = {changeCenter} center = {index} /> 
            </div>
            
          </div>   
        </div>   
    </>
  )
}

//things that I like to do, that are animated across the screen
const introText = ['websites', 'robots', 'videos', 'things']

//projects to be displayed
const projects = [{thumbnail: ur_hrvrd_thumbnail, title: "New Harvard Course Catalog",url: '/ur_hrvrd'},
                  {thumbnail:cameraSlider, title: "Camera Slider Robot", url: '/camera_slider'},
                  {thumbnail:morningRoutine, title: "Morning Robot Routine", url: '/morning_routine'}]

//duration between each word in the intro in seconds
const introDuration = 2

const imageReducer = (index, action) => {
  return action.index
}

export default Home