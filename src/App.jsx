import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import About from './views/About';
import Projects from './views/Projects';
import MorningRoutine from './views/projects/MorningRoutine';
import UrHrvrd from './views/projects/UrHrvrd';
import CameraSlider from './views/projects/CameraSlider';
import './index.css'






function App() {
  const [moveOffset, setMoveOffset] = useState(0)
  const handleMove = (offset) => {
    setMoveOffset(moveOffset + offset)
  }

  return (
    <>
      <div style = {{width: '100vw', overflowX: 'hidden'}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path = "projects" element = {<Projects />} />
              <Route path="about" element={<About />} />
              <Route path="ur_hrvrd" element={<UrHrvrd />} />
              <Route path="camera_slider" element={<CameraSlider />} />
              <Route path="morning_routine" element={<MorningRoutine />} />
            </Route>
          </Routes>
        </BrowserRouter>  
      </div>
        
    </>
  )
}

export default App
