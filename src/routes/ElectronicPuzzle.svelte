<script>
    import BackButton from "../components/BackButton.svelte"
    import puzzleDemo from "../assets/electronic-puzzle/puzzle-demo.mp4"
</script>
<main>
    <div class = "container">
        <div style="display: flex; gap: 10px; align-items: center">
            <BackButton width = {"50px"} height= {"50px"}></BackButton>
            <h1 class = "header">Electronic Puzzle</h1>
        </div>

        <h2>
            Summary:
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
            Demo
        </h2>
        <video style="max-width: 70%; " src = {puzzleDemo} playsinline controls >
                <track kind="captions" />
        </video>

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
    th,td{
        justify-content: center;
        align-items: center;
    }
    h1,h2,h3,h4{
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
    .center-container{
        display: flex;
        width: 100%;
        justify-content: center;
        align-content: center;
    }
    img{
        width: 50%;
        min-width: 300px;
    }

    .table-img {
        display: block; /* prevents baseline alignment weirdness */
        margin: 0 auto; /* centers the image horizontally */
        max-width: 100%;
        height: auto;
        background-color: blue;
    }
    /* video{
        min-width: 300px;
    } */
    table {
        width: 75%;
    }
    a {
        color: white;
    }
    a:visited {
        color: white;

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