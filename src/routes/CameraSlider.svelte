<script lang="ts">
    import beltTensioner from "../assets/camera-slider/belt-tensioner-assembly.png"
    import cameraCart from "../assets/camera-slider/camera-cart.png"
    import stepperMotorAttachment from "../assets/camera-slider/stepper-motor-attachment.png"
    import { screenWidth, aspectRatio } from "../scripts/aspectRatio";
    import BackButton from "../components/BackButton.svelte";
    let code = `
#ifndef MOTIONCONTROLLER_H
#define MOTIONCONTROLLER_H
#include &lt;Arduino.h&gt;


class MotionController{
    public&#x3A;
        /*
            Motion Controller Constructor
        */
        MotionController(){}
        /*
            addAxis
                allows a new axis of control and adds pins to connect to stepper motor
                params:
                    unitsToSteps: the conversions from what ever units the cart is moving in to stepper motor steps (ie millimeters to steps)
                    dirPin: the pin that controls the direction of the motor
                    stepPin: the pin that controls the stepping of the stepper motor
                
        */
        void addAxis(double unitsToSteps, uint8_t dirPin, uint8_t stepPin );
        /*
            setSpeed
                sets the speed for the for the given axis 
                params:
                    axisNum: the index of the axis
                    speed: the speed of the axis in the units/s (with the units specified in the addAxis function)
                
        */
        void setSpeed(uint8_t axisNum, double speed);

        /*
            setTargetPos
                sets the target position for the for the given axis 
                params:
                    axisNum: the index of the axis
                    position: the target position in the units specified in addAxis
                
        */
        void setTargetPos(uint8_t axisNum, double position);

        /*
            getInterruptInterval
                gets how quickly the interrupt should be triggered, but needs to be called after setting the speed
                returns:
                    how often the interrupt should be triggered in microseconds
        */
        unsigned long getInterruptInterval();

        /*
            runInterruptHandler
                this runs in an interrupt with a resolution of 1Mhz and at the frequency specified by getInterruptInterval. This is run a step 
                if a step is due, but needs to be in 
        */
        void runInterruptHandler();

        /*
            isMoving
                returns how far the cart is from its target position
                params:
                    axisNum: the index of the axis
                returns:
                    returns a signed number of how far it from the cart (positive if the currPos is behind targetPos, and negative otherwise)

        */
        long distanceToGo(uint8_t axisNum);

        
    private:
        /*  
            calcNextStepTime:
                takes in a position and axis and  calculates the time until the next step needs to be taken
                params:
                    axisNum: the index of the axis
                    pos: position (in steps)
                returns:
                    returns the number of time until the next step in interrupt cycles
        */
        unsigned long calcNextStepTime(uint8_t axisNum, unsigned long pos);
        //all the information to allow motion control along a new axis
        struct axis{
            double unitsToSteps; // conversion of whatever units are being used to steps
            uint8_t dirPin; // dir pin of stepper motor (LOW is backward, HIGH is forward)
            uint8_t stepPin; // step pin of stepper motor
            unsigned long speed = 0; // speed of axis in (steps/sec)
            unsigned long targetPos = 0; // target position of the camera (in steps)
            unsigned long currPos = 0; // current position of the camera (in steps)
        };

        uint8_t numAxes = 0; //the number of axes being used 
        axis axesArr[10];
        unsigned long interruptInterval; 
        unsigned long cyclesTilStep = 1; //the number of interrupt calls until the next step happens (1 mean that it with trigger on the next interrupt)
        
        

    };
    #endif`
    let code2 = `
#include "MotionController.h"
#include <Arduino.h>

void MotionController::addAxis(double unitsToSteps, uint8_t dirPin, uint8_t stepPin ){
    axis a;
    a.unitsToSteps = unitsToSteps;
    a.dirPin = dirPin;
    a.stepPin = stepPin;
    pinMode(dirPin, OUTPUT);
    pinMode(stepPin, OUTPUT);
    this->axesArr[this->numAxes] = a;
    this->numAxes++;
}

void MotionController::setSpeed(uint8_t axisNum, double speed){
    this->axesArr[axisNum].speed = speed * this->axesArr[axisNum].unitsToSteps;

    //recalculate the new interrupt interval now that a new speed has been set
    unsigned long maxSpeed = 0;
    for (int i = 0; i < numAxes; i++)
    {
        maxSpeed = max(this->axesArr[i].speed, maxSpeed);
    }
    // invert maxSpeed to get sec per step then multiply by 1,000,000 to get usec per step
    this->interruptInterval = 1000000/maxSpeed;
}

void MotionController::setTargetPos(uint8_t axisNum, double targetPos){
    this->axesArr[axisNum].targetPos = targetPos * this->axesArr[axisNum].unitsToSteps;
}

unsigned long MotionController::getInterruptInterval(){
    return this->interruptInterval;
}


void MotionController::runInterruptHandler(){
    for (int i = 0; i < this->numAxes; i++)
    {
        if (cyclesTilStep > 0)
        {
            cyclesTilStep--;
        }
        int8_t dir = this->axesArr[i].targetPos > this->axesArr[i].currPos ? 1: -1;
        digitalWrite(this->axesArr[i].dirPin, dir == 1? HIGH: LOW);
        if (this->axesArr[i].targetPos != this->axesArr[i].currPos && cyclesTilStep == 0)
        {
            digitalWrite(this->axesArr[i].stepPin, HIGH);
            digitalWrite(this->axesArr[i].stepPin, LOW);
            this->axesArr[i].currPos += dir;
            this->cyclesTilStep = calcNextStepTime(i, this->axesArr[i].currPos);
        }
        
    }
    
}

unsigned long MotionController::calcNextStepTime(uint8_t axisNum, unsigned long pos){
    if (pos == this->axesArr[axisNum].targetPos){
        return 0;
    }

    return (100000 / this->axesArr[axisNum].currPos) / this->interruptInterval;
}

long MotionController::distanceToGo(uint8_t axisNum){
    return this->axesArr[axisNum].targetPos - this->axesArr[axisNum].currPos;
}
    `
</script>
<main class="page-container" style="max-width:{$screenWidth}px;">
    <div class = "container" style="margin-left: 10px; margin-right: 10px">
        <div style="display: flex; gap: 10px; align-items: center">
            <BackButton width = {"50px"} height= {"50px"}></BackButton>
            <h1 class = "header">Camera Slider</h1>
        </div>
        
        <div style ="display:flex; justify-content:center">
            <iframe title = "camera assembly" src="https://myfas117.autodesk360.com/shares/public/SH286ddQT78850c0d8a463d84ea23e23314f?mode=embed"  style = "aspect-ratio: {$aspectRatio}; min-width: min(75%, 400px);" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>
        </div>
        
        <h2 class = "header">Problem Statement and Project Description</h2>
        <p style = "font-family: publicSans">
            All commerically availabe and affordable camera sliders all have a problem of not having great motion control software. 
            With all of them you can control where you want the camera slider to be and at what time, but that is it. So the goal
            with this camera slider is to have 3 axes of motion (translation, pan and tilt), and to develop a motion control software 
            that gives you the fine grain control of the the location and velocity of the camera slider at any point in time
        </p>
        <h2 class = "header"> Physical Construction</h2>
        <p style = "font-family: publicSans">The Main body of the Camera Slider is made of 4 major components: The legs, the stepper motor attachment, the belt tensioner and the cart</p>
        <h3 class = "header">The Legs</h3>
        <p style = "font-family: publicSans">
            The legs of the camera slider first are meant to hold the camera slider off the ground and allow the timing belt to pass through it, but they are also have holes for
            4 heat set inserts on top and sides of the camera slider. These heat set inserts are made so that attachments such as the belt tensioner and stepper motor attachment
            can be iterated on and screwed into the legs without having to reprint the legs eveytime
        </p>
        <h3 class = "header">The Stepper Motor Attachment</h3>
        <div class="img-container">
            <img style = "width: 40%;" src ={stepperMotorAttachment} alt="belt tensioner assembly" />
        </div>
        <p style = "font-family: publicSans">
            The Stepper Motor Attachment is meant to attach to one of the legs of the camera slider and hold the 
            stepper motor at the proper height so that the belt does not rub against an part of the aluminum
            extrusion or the legs of the camera slider. 
        </p>
        <h3 class = "header">The Belt Tensioner</h3>
        <p style = "font-family: publicSans">
            The Belt Tensioner fixes to the leg opposite to the stepper motor attachment and has two components, one
            which is the combination of two parts. One is the pulley which the belt is in contact with, and the other
            is the pulley holder which holds the pulley in place and pull it tighter or looser with a screw that connects the two pieces together. 
        </p>
        <div class="img-container">
            <img style = "width: 40%;" src ={beltTensioner} alt="belt tensioner assembly" />
        </div>
        <p style = "font-family: publicSans">
           This is the fully assembled belt tensioner. Where there is a screw in the pulley holder that screws into a nut that is placed into the pulley
           as it is printing and then on that screw there is a spring to account for any backlash in the screw. As the screw gets turned clockwise the 
           pulley will move farther away from the leg leading to more tension in the belt, and in the opposite direction it will loosen the belt.
        </p>
        <h3 class = "header">The Cart</h3>
        <div class="img-container">
            <img style = "width: 40%;" src ={cameraCart} alt="belt tensioner assembly" />
        </div>
        <p style = "font-family: publicSans">
            The cart is what actually slides along the rail of the camera cart as well as has attachments for the belts to clamp into. The clamps on the side
            of the camera carts are made of two parts that screw into each other using m2 screws. As well as on side which only has one wheel there is a flexture
            which makes it so you have some wiggle room when fixing the cart to the aluminum extrusion and instead of the entire cart flexing, all of your flexing
            comes from that one piece on the side. 
        </p>
        <h2 class="header">Motion Control Software</h2>
        <p style = "font-family: publicSans">
            Motion Control Software is split up into two main categories the embedded software and the graphical interface. The embedded software that runs
            on the actual camera slider takes instructions about camera slider location and speed and turns in into steps for the stepper motor. While the GUI
            allows the user to specify the location and speed of the camera slider and then turns that into 
        </p>
        <h3 class = "header"> Embedded Software </h3>
        <p style = "font-family: publicSans">
            The Embedded Software is meant to take in instructions from the graphical interface and turn that it movements for its stepper motors. So while for 
            this MVP there is only once axis of motion, the structure of the code is made to accomodate as many axes as you need in the MotionController class.
            In this class it allows you to setup a new axis of motion by specifying a conversion from what ever units you want to use into steps as well as a step
            and a direction pin for the stepper motor. While eventually to have perfect control of the speed, for this MVP I just wanted to get accurate control of 
            the camera's position. So the basics of how this works in the code below is you can set the camera's position in millimeters and it will move to that 
            position in whatever speed you had set in mm/s. 
        </p>
        <div style="display:flex; justify-content:center; gap: 20px">
            <pre style="width: 30%; height: 500px; overflow:scroll; border-color:white; border-style:solid">
                <code>
                    {@html code}
                </code>
            </pre>
            <pre style="width: 30%; height: 500px; overflow:scroll; border-color:white; border-style:solid">
                <code>
                    {@html code2}
                </code>
            </pre>
        </div>
        
        <h2 class="header">Next Steps</h2>
        <p>
            The next steps are to implement the proper speed acceleration, which involves both programming an interface that has bezier curves for speed controls 
            and just basic keyframes. After that it is finished the plan to get the pan and tilt camera head on it.
        </p>
    </div>

    
</main>

<style>
    
    :root{
        --main-color: #212121; 
        --text-color: white;
    }

    .header{
        font-family: publicSansT;
    }
    main{
        color: var(--text-color);
        
    }
    .img-container{
        display: flex;
        width:100%;
        justify-content: center;
    }
    .container{
        max-width: 1000px;
        width: 100%;
        position: relative;
        /* background-color: blue; */
        overflow: scroll;
    }
    p{
        font-family: "publicSans";
    }
</style>