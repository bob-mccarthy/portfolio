<script>
    import BackButton from "../components/BackButton.svelte"
    import puzzleDemo from "../assets/electronic-puzzle/puzzle-demo.mp4"
    import puzzleBaseV1 from "../assets/electronic-puzzle/electronic-puzzle-base-v1.jpeg"
    import puzzleBodyV1 from "../assets/electronic-puzzle/puzzle-body-v1.jpeg"
    import puzzleTestV1 from "../assets/electronic-puzzle/puzzle-test-one.jpeg"
    import kinematicCoupling from "../assets/electronic-puzzle/kinematic-coupling-marked.png"
    import puzzleBaseFinal from "../assets/electronic-puzzle/pcb-base-marked.png"
    import prototypeWorking from "../assets/electronic-puzzle/prototype-working.mp4"
    import pcbs from "../assets/electronic-puzzle/pcbs.jpeg"
    import exposedPuzzlePiece from "../assets/electronic-puzzle/exposed-puzzle-piece.png"
    import resistorsTest from "../assets/electronic-puzzle/resistor-testing-setup.jpeg"
    import gui from "../assets/electronic-puzzle/gui.png"
</script>
<main>
    <div class = "container">
        <div style="display: flex; gap: 10px; align-items: center">
            <BackButton width = {"50px"} height= {"50px"}></BackButton>
            <h1 class = "header">Electronic Puzzle</h1>
        </div>

        <h2> 
            Demo
        </h2>
        <div class = "img-container">
            <video
                style="max-width: 70%;"
                playsinline
                controls
            >
                <source src="{puzzleDemo}" type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
            </video>
        </div>
        
        <h2>
            Description
        </h2>
        <p>
            With this project I just wanted to make something that has swappable blocks that could communicate with
            each other. So that is where the idea for the electronic puzzle came from. Each puzzle piece has an 
            attiny 1624 and an oled display. This display then can snap into any slot on the grid and communicates
            with a xiao esp32c3 over i2c.  On reboot the xiao would randomly assign a unique number to each of the
            puzzle pieces. Each puzzle piece then communicates back it's position back to the xiao based on a voltage divider
            at each position, and the xiao then uses that to communicates when it is solved. 
        </p>

        <h2>
            Process
        </h2>
        <p>
            The hardest part in creating this project was to get this to magnetically connect and be able to communicate.
            I knew that I would need pogo pins as they are used in applications with modular components, and I need someway
            to make electrical connections that had some compliance. Being able to transfer power over the pogo pins was 
            fairly trivial and was achieved pretty early on in the process. With the set up shown below
        </p>
        <h3>
            Prototype Number One
        </h3>
        <div class = "img-container">
            <img style = "max-width: 25%; height: auto" src={puzzleBaseV1} alt= "puzzle piece base">
            <img style = "max-width: 25%; height: auto" src={puzzleBodyV1} alt= "body of puzzle piece">
        </div>
        <h3> Test Run</h3>
        <div class = "img-container">
            <img style = "max-width: 25%; height: auto" src={puzzleTestV1} alt= "puzzle piece base">
        </div>
        <p>
            Before I talk about the problems with the connectors I want to explain a little more in detail how this prototype works.
            So before I built the entire puzzle I just want to get one puzzle piece working. There is the base which has the xiao esp32c3, 
            and the puzzle piece which has the attiny 1624. The puzzle piece needs 5 connections to work 3.3V, GND, ANALOG VOLTAGE,
            SDA, and SCL. 3.3V and GND are just to power the puzzle piece from the base, the analog voltage comes from a voltage
            divider in the board which is different at each slot on the board so that the puzzle piece can know where it is, and finally 
            SDA and SCL are communication lines for I2C so that the base microcontroller can tell each puzzle piece what number to display,
            or so the puzzle piece tell the base microcontroller what position on the board it is in. 
        </p>
        <p>
            In the picture above power transfer worked immediately, as the attiny was just do a preprogrammed effect on the oled screen.
            However no communication was happening between the base microcontroller and the puzzle piece. I know this because I ran an I2C
            scan sketch to see if the base microcontroller was see any devices on the i2c bus and it was not. Sometimes if I pressed the 
            microcontroller and puzzle base together and prayed I would see the i2c address of the puzzle piece, but it was not reliable at 
            all.
        </p>
        <p>
            What I learned from this iteration was first I needed stronger magnets because the magnets were not holding the pogo pins in place,
            Also there was some play in the position that the puzzle piece would rest in. Like even if the pogo pins were not there if you 
            place the puzzle piece on the magnet base there was about a millimeter of wiggle room in where the piece would sit which could 
            lead to shorting some of the connections together.
        </p>
        <p>
            Alot of iteration and time was spent to get the position as accurate as possible and this lead to the final design which is shown
            below. 
        </p>
        <div class = "img-container">
            <img style = "max-width: 25%; height: auto" src={kinematicCoupling} alt= "puzzle piece base">
            <img style = "max-width: 25%; height: auto" src={puzzleBaseFinal} alt= "body of puzzle piece">
        </div>

        <p>
            First the biggest innovation that took place was the kinematic couplings. As you can see from the 
            red markings there are 3 grooves in the bottom of the puzzle piece and 3 balls in the base for each piece.
            The reason for this is a ball in a groove contacts exactly 2 points, so it is perfectly constrained. 
            So you have 3 sets of balls and grooves 6 points are in contact which perfectlly constrains the piece
            from translation and rotation (assuming those ball and grooves are not co linear). This allow for very precise 
            positioning of the pogo pins and stopping the possibility of shorting any connections.
        </p>
        <p>
            Using this information I hacked together a quick test, where I took an old circuit board which broke out all 5 of pins 
            I needed for the puzzle piece and I plugged that into a prototype of the puzzle piece base and that was magnetically connected
            to the prototype puzzle and I was able to get i2c working over the pogo pins. 
        </p>
        <div class = "img-container">

        
            <video
                style="max-width: 25%;"
                playsinline
                controls
            >
                <source src="{prototypeWorking}" type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
            </video>
        </div>

        <h2>
            Production
        </h2>

        <p>
            After I got a prototype working I then had to mill of the circuit boards for the puzzle pieces and the big puzzle piece base
        </p>

        <div class = "img-container">
            <img style = "max-width:50%; height: auto" src={pcbs} alt= "pcb">
        </div>

        <p>
            The puzzle piece base has cutouts for all of the magnets and balls for the kinematic couplings, as well resistors for the voltage divider.
            Each puzzle piece has two pcbs. The top pcbs which holds the attiny and the oled screen and then the bottom pcb which has 
            pads to interface with the pogo pins. These twos boards interface with normal header pins and sockets. The boards are then
            reinforced with standoffs. The assembled puzzle piece is pictures below
        </p>
        <div class = "img-container">
            <img style = "max-width:50%; height: auto" src={exposedPuzzlePiece} alt= "exposed puzzle piece">
        </div>

        <p>
            Now with all of the pieces assmebled, I needed to check the value on the adc from each of spots of the boards. So I 
            could modify the code on the attiny's so that they would know what positions they are in on the puzzle base. I just
            did this by plugging the puzzle base to companion board which had a xiao soldered to it. Then I used jumper cables
            to connect the two halves of the puzzle piece so that I could also breakout the uart pins on the puzzle piece and I could
            print out its current adc value. The setup is shown below
        </p>
        <div class = "img-container">
            <img style = "max-width:50%; height: auto" src={resistorsTest} alt= "resistor test">
        </div>

        <p>
            Then after this point everything went quite smoothly. The i2c communication was reliable and so the xiao just polled 
            the i2c bus to see which puzzle pieces were attached and if the puzzle pieces were in the correct order and if so it would
            send them a message to display the you win message and to get all of these graphics on the microcontrollers I just made a simple
            gui in python which would allow me to draw on a canvas and takes all of pixels group them into groups of 8 and shift them into one
            bit to save space. Then export it as a .h file to be imported into my program on my microcontrollers. The gui is shown below.
        </p>

        <div class = "img-container">
            <img style = "max-width:50%; height: auto" src={gui} alt= "gui">
        </div>

        <h2>
            Skills:
        </h2>

            <ul>
                <li>
                    PCB Design (KiCad)
                </li>
                <li>
                    CNC milling / CAM (for PCBs and enclosure)
                </li>
                <li>
                    Programming
                    <ul>
                        <li>
                            Python: UI to draw images and convert them into header file to display on microcontrollers
                        </li>
                        <li>
                            C++: To program the attiny's and the xiao
                        </li>
                    </ul>
                </li>
                <li>
                    CAD (Fusion 360)
                </li>
                <li>
                    3D printing (parts of enclosure)
                </li>
            </ul>  

    </div>
</main>
<style>
    :root{
        --main-color: #212121; 
        --text-color: white;
    }
    h1,h2{
        font-family: publicSansT;
    }
    .container{
        max-width: 1000px;
        width: 100%;
        position: relative;
        overflow: scroll;
    }
    main{
        color: var(--text-color);
        font-family: publicSans;
        
    }

    p{
        font-family: publicSans;
    }

    .img-container{
        display: flex;
        width: 100%;
        justify-content: center;
        align-content: center;
    }
    img{
        width: 50%;
    }
    video{
        min-width: 300px;
    }
  
    /* @media only screen and (max-width: 400px) {
        img{
            width: 100%;
            min-width: none;
        }
        img{
            width: 100%;
            min-width: none;
        }
    } */
</style>