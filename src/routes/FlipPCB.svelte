<script>
    import backCopperFinal from "../assets/pcb-processing/back-copper-final.jpeg"
    import backCopper from "../assets/pcb-processing/back-copper.png"
    import backOutline from "../assets/pcb-processing/back-outline.png"
    import frontCopperFinal from "../assets/pcb-processing/front-copper-final.jpeg"
    import frontCopper from "../assets/pcb-processing/front-copper.png"
    import frontOutline from "../assets/pcb-processing/front-outline.png"
    import gui from "../assets/pcb-processing/gui.jpg"
    import BackButton from "../components/BackButton.svelte"
</script>
<main>
    <div class = "container">
        <div style="display: flex; gap: 10px; align-items: center">
            <BackButton width = {"50px"} height= {"50px"}></BackButton>
            <h1 class = "header">Flip PCB</h1>
        </div>
        <div class = "center-container">
            <img src={gui} alt= "flip-pcb-gui">
        </div>
        <h2>
            What is the purpose?
        </h2>
        <p>
            I mill alot of circuit boards when I am rapidly prototyping the projects I work on.
            A lot of times I needs boards that have two sides two them. However, the simplest way
            I have to do this that I have found is <a href = "https://sibusaman.fabcloud.io/doublepcb/">this method</a>.
            However, this requires manually modifying the board files in an image editor which is time consuming and
            prone to error. So flip pcb takes in the pngs which represents the front and back traces of the board as well
            as the final outline of the board and modifies all of the images so they are ready to be used in my favorite 
            PCB milling CAM software <a href="https://leomcelroy.com/bitrunner/"> Bit Runner</a>
        </p>
        
        <h2>
            Examples
        </h2>
        <p>
            Here is a board to drive some stepper motors I milled using the files I got from FlipPCB 
        </p>
        <div class = "center-container">
            <table>
                <thead>
                    <tr>
                        <th> front copper </th>
                        <th> back copper </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img class = "table-img" src={frontCopperFinal} alt={"milled front copper"} />
                        </td>
                        <td>
                            <img class = "table-img" src={backCopperFinal} alt={"milled back copper"} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>
            Workflow
        </h2>
        <p>
            As you can see from the gui at the top you select the images that represent the front and back traces of your board,
            as well as the outline. You also select the size of the endmill you are using to cut the outline of the board. Then 
            once you hit generate boards you are left with 4 different board files in your downloads folder.
        </p>
        <p>
            The first two images you will use to mill out your circuit boards are front copper traces and outline
        </p>
        <div class = "center-container">
            <table>
                <thead>
                    <tr>
                        <th> front copper traces </th>
                        <th> front copper outline </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img class = "table-img" src={frontCopper} alt={"front copper traces"} />
                        </td>
                        <td>
                            <img class = "table-img" src={frontOutline} alt={"front copper outline"} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            This generates a new front copper traces png which is same as the original just with a little padding.
            As well as, the outline to be cut out so we flip the pcb (do you get where the name comes from), 
            and mill out the back traces. The tabs on the outline are a very deliberate shape, the tabs are the same
            size as the diameter of the endmill so when we flip the board we now exact where it is relative to our origin. 
        </p>

        <div class = "center-container">
            <table>
                <thead>
                    <tr>
                        <th> back copper traces </th>
                        <th> back copper outline </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img class = "table-img" src={backCopper} alt={"back copper traces"} />
                        </td>
                        <td>
                            <img class = "table-img" src={backOutline} alt={"back copper outline"} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>
            After the board is flipped horizontally we can mill out the back traces and outline. These images also have a little padding
            as well as since we flipped the board the traces and outlines are also flipped
        </p>

        <h2>
            Technical Details
        </h2>

        <p>
            Overall there is not anything overly complicated about this script, it assumes you are only cutting out one board and not
            a batch of boards. As well as it assumes a black and white image as that is what bitrunner takes as input. The program gui
            is built using pyside6, and the image creation is all done with PIL (Python Image Library) and numpy. If you want to check it 
            out or use it, you can go to the <a href = "https://github.com/bob-mccarthy/flip-pcb">github repo</a>.
        </p>

        <h2>
            Final Thoughts / Next Steps
        </h2>
        <p>
            Overall the script is fully functional, the script has already saved me more time that I spent developing it which is a really nice
            feeling. However, some features that would be nice are batch processing, I have to do some small batch runs of pcbs for projects, and
            making a tool that would do that for me would be pretty nice. Also just for complete fun I have had an itch to rewrite some of the software
            I use in C just because I think it would be fun. The idea of writing pngs from scratch


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
    video{
        min-width: 300px;
    }
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