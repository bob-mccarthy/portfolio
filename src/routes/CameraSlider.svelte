<script lang="ts">
    import beltTensioner from "../assets/camera-slider/belt-tensioner-assembly.png"
    import cameraCart from "../assets/camera-slider/camera-cart.png"
    import stepperMotorAttachment from "../assets/camera-slider/stepper-motor-attachment.png"
    import { screenWidth, aspectRatio } from "../scripts/aspectRatio";
    import BackButton from "../components/BackButton.svelte";
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
            This is the next major step for the project, I want to be able to control this project with keyframes like I would in my editing softwares. For 
            those unfamiliar with keyframes it is just a concept where you define the state of an object at a certain moment in time (like it's position or rotation),
            and then it determines the interpolation for you. So this kind of functionality is different from traditional stepper motors from traditional cnc firmware
            which takes in max acceleration and velocity parameters and takes in a set of points and tries to move the robot as fast a possible. As I do not necessarily
            want the fastest speeds everytime I just want the timings to be accurate. I also do not like the current popular stepper motor libraries. So I have reading through
            githubs of libraries like FluidNC to see how they control they stepper motors to see what I can take from them. As of right now the answer is really fast timer interrupts 
            and then offloading stepping to any other peripherals on the chip. In my case I am using the esp32 and I want to incorporate the rmt peripherial
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