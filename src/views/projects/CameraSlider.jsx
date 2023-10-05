import React from 'react'
import cameraInterfaceFront from '/static/camera-interface-front.jpg'
import cameraInterfaceEdit from '/static/camera-interface-edit.jpg'
import cameraInterfaceTimeline from '/static/camera-interface-timeline.jpg'
import cameraInterfaceKeypad from '/static/camera-interface-keypad.jpg'
import cameraSliderHeaderGif from '/static/camera-slider.gif'
import cameraSliderTest from '/static/camera-slider-test.gif'
import esp32 from '/static/esp32.jpeg'
import nema17 from '/static/nema17.jpeg'
import motorDriver from '/static/a4988.jpeg'
import { LazyLoadImage } from "react-lazy-load-image-component";


const CameraSlider = () => {
  return (
    <div className='grid-container'>
      <div className='grid-item align-center'>
        <h1 className='project-header'>Making my Own Camera Slider</h1>
      </div>
      <div className='grid-item align-center'>
      {/* <LazyLoadImage 
        src={cameraSliderHeaderPic}
        width = "400"
        alt="Image Alt"
      /> */}
      <LazyLoadImage 
        src={cameraSliderHeaderGif}
        width = "400"
        alt="Image Alt"
      />
        {/* <img className = "header-img" src = {titleImage} ></img> */}
      </div>
      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <h3>TL;DR:</h3>
            <p>
              Camera Sliders allow for very smooth and precise video shots. There are certain types of video effects that can only be done using a camera slider 
              like the video below. However, commercial camera sliders cost hundreds of dollars, so I built my own camera slider along with an interface that allows me
              to program the path I want the camera to take.
            </p> 
            <h3>Example Video Using the Camera Slider: </h3>
        </div>
      </div>
         
      <div className='grid-item align-center'>
      <LazyLoadImage 
        src={cameraSliderTest}
        className = "standard-img"
        alt="Image Alt"
      />
        {/* <img className = "standard-img" src = {cameraSliderTest} ></img> */}
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p>
            The video above could only be filmed with a camera slider, because there are multiple videos of me which I spliced together to generate this glitchy effect.
            Since the camera is moving and rotating you need to be able to get the exact same motion every single time. So in order to get this shot I had to program the path
            I wanted the robot to take, on the interface, and repeated it 4 times to be able to edit together.
          </p>
          <h3> Camera Slider Interface: </h3>            
          <h4> Front Page: </h4>
        </div>
      </div>

      <div className='grid-item align-center'>
        <LazyLoadImage 
          src={cameraInterfaceFront}
          className = "half-standard-img"
          alt="Image Alt"
        />
      </div>
      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p>
            The Front Page of the Home Screen allows the user to start and stop the camera robot (top left button), reset the robot to its original position (top right button), 
            edit the path you want the camera to take (bottom left button), and wirelessly send the path over to camera slider (bottom right button).
          </p>
          <h4>Edit Page:</h4>
        </div>
      </div>
      <div className='grid-item align-center'>
        <LazyLoadImage 
          src={cameraInterfaceTimeline}
          className = "half-standard-img"
          alt="Image Alt"
        />
        <LazyLoadImage 
          src={cameraInterfaceEdit}
          className = "half-standard-img"
          alt="Image Alt"
        />   
      </div>
      

      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p>
            Once you press Editor Button you are brought to the Edit Page where you are greeted with a timeline of all the states you want the robot to be in. 
            Each State has a time, position and rotation. If you press the edit button you are then presented a window which allows you to scrub through
            each of the states on the timeline with the arrows buttons. You can delete a state by pressing the DEL key, you can delete a state. You can also precise
            MOD to edit the time, position or rotation of any state of the robot. Or you can press the add button to add a new state in the camera path 
          </p>
          <h4>Keypad Page:</h4>
        </div>
      </div>

      <div className='grid-item align-center'>
        <LazyLoadImage 
          src={cameraInterfaceKeypad}
          className = "half-standard-img"
          alt="Image Alt"
        />
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p>
            If you go to edit or add a new state you will come to keypad page. Where you have a keypad to type in the values you want to set for time, position and rotation.
            You can toggle which value you are setting by clicking on the value (So if you click on time it will cycle to Position, then to rotation, and then back to time). 
            Then if you click Done it will return you to the timeline.
          </p>
          <h3> Camera Slider: </h3>
        </div>
      </div>

      <div className='grid-item align-center'>
        <LazyLoadImage 
          src={esp32}
          className = "third-standard-img"
          alt="Image Alt"
        />
        <LazyLoadImage 
          src={nema17}
          className = "third-standard-img"
          alt="Image Alt"
        />
        <LazyLoadImage 
          src={motorDriver}
          className = "third-standard-img"
          alt="Image Alt"
        />
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p>
            For the Camera Slider Robot I used an ESP32 for the brains, nema 17 stepper motors to control the translation and rotation of the camera, and 
            a4988 motor drivers to control each motor.When the camera slider gets the path information from the interface, it calculates the speed it needs
            to move each stepper motor so that the camera is at arrives at the position and rotation at the exact times specified. To move the camera translationally 
            the camera slider turns a stepper motor attached to a belt which loops around the rail the cart sits on. To move the camera rotationally the 
            camera slider turns a stepper motor that sits on the cart.
          </p>
          <p>
            The Camera Slider itself sits on a piece 40mmx20mm alumnum extrusion with all of the parts attached to the rail being 3d printed. The parts which needed
            to be printed where a motor mount which attaches the stepper motor to the rail, a pulley which goes on the other end of the rail to keep belt from rubbing 
            against the rail, The cart which sits on the rail, another stepper motor attachment to attach the stepper motor and the camera to the cart.
          </p>

        </div>
      </div>
    </div>
  )
}

export default CameraSlider