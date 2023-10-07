import React from 'react'
import phoneJail from '/static/phone-jail.PNG'
import checkpoint from '/static/checkpoint.PNG'
import alarmClockFront from '/static/alarm-clock-front.PNG'
import alarmClockSet from '/static/alarm-clock-set.PNG'
import phoneJailDemoVid from '/static/phone-jail-demo.mov'

import { LazyLoadImage, LazyLoadComponent } from "react-lazy-load-image-component";

const MorningRoutine = () => {
  return (
    <div className='grid-container'>
      <div className='grid-item align-center'>
        <h1 className='project-header'>A Robot That Makes Me Do my Morning Routine</h1>
      </div>
      
      <div className='grid-item align-center'>
        <video className='header-img' autoPlay loop muted webkit-playsinline playsinline>
            <source src={phoneJailDemoVid} type='video/mp4'/>
        </video>
      </div>
      

      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <h3>TL;DR:</h3>
            <p>
              I built locks away my phone until I do my Morning Routine. The Robot is a 3 part system. The first part is the "phone jail" which I put
              my phone into at night and it locks once it detects my phone. The second part is a checkpoint which lists all the tasks I have to do and sends a 
              message to the unlock phone jail when I finish all the tasks in my morning routine.The third part is the alarm clock which actually wakes me up in the morning and 
              does not shut off until I get to the checkpoint. 
            </p> 
            <h2>
              Components:
            </h2>
            <p>
              All 3 of the components are built using ESP32 microcontrollers and all communicate with each other using a wirless protocol known as ESP NOW, which is a radio 
              communication that only works with ESP processors
            </p>
            <h3>Phone Jail: </h3>
        </div>
      </div>
         
      <div className='grid-item align-center'>
        <LazyLoadImage 
          src={phoneJail}
          className = "standard-img"
          alt="Image Alt"
        />
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
            <p>
              The Phone Jail Locks Away my phone until I do my morning Routine. The phone jail detects the presence of my phone with a wireless charger. Once it detects
              the presence of my phone and it detects the door has closed it turns a servo to lock it in place. The robot detects the door closing because when the door
              closes there are two pieces of metal that touch and it completed a circuit that the robot is constantly read. The phone does not unlock the door until 
              it gets a message from the checkpoint to unlock. Also the robot stays locked even when it gets unplugged, so the only way to get the phone out is to complete 
              your morning routine or to break it. 
            </p> 
            <h3> Checkpoint: </h3>
        </div>
      </div>

      <div className='grid-item align-center'>
        <LazyLoadImage 
          src={checkpoint}
          className = "standard-img"
          alt="Image Alt"
        />
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
            <p>
              The checkpoint is meant to determine if you have finished your morning routine. Basically once it powers it will start your morning routine once you press
              the button. Once you have started the morning routine it will display the Task you need to complete, as well as the amount of time until the task can be completed.
              Basically I wanted disincentivize cheating the system as much as possible, so each task has a certain duration associated with it. For example brushing teeth has to
              take at least 2 minutes, so when you have started the brush teeth task you cannot press the button to complete that task until at least 2 minutes have passed. Then 
              once you have completed every task the checkpoint send a message to the phone jail unlocking it.
            </p> 
            <h3> Alarm Clock: </h3>
        </div>
      </div>


      <div className='grid-item align-center'>
        <LazyLoadImage 
          src={alarmClockFront}
          className = "half-standard-img"
          alt="Image Alt"
        />
        <LazyLoadImage 
          src={alarmClockSet}
          className = "half-standard-img"
          alt="Image Alt"
        />
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
            <p>
              The alarm clock is set the night before and does not shut off until you reach the check point (once you press the button on the checkpoint to 
              start your morning routine it sends a message to the alarm clock to stop the alarm). The alarm clock uses a TFT screen to display the time.
              You interface with you rotary encoder (the piece with the white knob), you rotate it to select the two buttons on the front page and you 
              push it in to select on off the buttons. Selecting dim mode will lower the brightness of the screen, and selecting set Alarm with bring you 
              to set alarm page. The set alarm page will allow you to set your alarm by turning the rotary encoder and then pressing in the button when you 
              are done
            </p> 
        </div>
      </div>
      

  


    </div>
  )
}

export default MorningRoutine