<script lang="ts">
    import ProjectCard from "../components/ProjectCard.svelte";
    import portraitIcon from "../assets/bobby-portrait.jpg"
    import backgroundVid from "../assets/bobby-pointing-phones.mp4"
    import phoneExhibitIcon from "../assets/phone-exhibit-icon.png";
    import cameraSliderIcon from "../assets/camera-slider-icon.png"

    const projects = [
        {
            name: "Programmable Phone Display",
            icon: phoneExhibitIcon,
            desc: "Synchronized Video Screen Made of 70+ phones displayed at the World Bank ",
            path: "/phoneExhibit"
        },
        {
            name: "Camera Slider",
            icon: cameraSliderIcon,
            desc: "Camera Slider and Custom Motion Control System",
            path: "/cameraSlider"
        }

    ]
</script>
<main class="page-container">
    <div class="container">
        <div class = "nav-background">
            <video class= "vid" src = {backgroundVid} autoplay loop muted style="width: 100%; object-fit:cover">
                <track kind="captions" />
            </video>
        </div>
        
        <div class = "text-background">
            
            <div class = "img-icon">
                <img style = "width: 100%" src = {portraitIcon} alt="portrait icon">
            </div>
            <div class = "background-gradient">

            </div>
            <p style="font-family: publicSansT; font-size: 72px; position: absolute; top: -130px; left: 200px" >
                Bobby McCarthy
            </p>
            <br>
            <br>
            <br>
            <br>
            <p style = "font-family: publicSansT; font-size: 24px"> About Me</p>
            <p style = "font-family: publicSans">
                I'm Bobby McCarthy and I am a maker. I love just owning every aspect of the project from the mechanical to electrical to the programming
                to the filmmaking and presentation of the things that I make. 
            </p>
            <p style = "font-family: publicSansT; font-size: 24px"> Projects</p>
            <div style = "z-index: -1">
                <div class="project-carousel">
                    {#each projects as project}
                        <ProjectCard width={300} height={300} icon = {project.icon} name = {project.name} path ={project.path} desc = {project.desc}></ProjectCard>
	                {/each}
                    
                </div>
            </div>
            <p style = "font-family: publicSansT; font-size: 24px"> Connect</p>
            <p style = "font-family: publicSans">
                I'm Bobby McCarthy and I am a maker. I love just owning every aspect of the project from the mechanical to electrical to the programming
                to the filmmaking and presentation of the things that I make. 
            </p>
            <br>
            <br>
            <br>

        </div>  
        
       
    </div>
    
</main>

<style>
    :root{
        --main-color: #212121; 
        --text-color: white;
    }
    p{
        color: var(--text-color)
    }
    @font-face{
        font-family:publicSans;
        src: url("../assets/public-sans/webfonts/PublicSans-Regular.woff")
    }
    @font-face{
        font-family:publicSansEB;
        src: url("../assets/public-sans/webfonts/PublicSans-ExtraBold.woff")
    }
    @font-face{
        font-family:publicSansB;
        src: url("../assets/public-sans/webfonts/PublicSans-Bold.woff")
    }
    @font-face{
        font-family:publicSansT;
        src: url("../assets/public-sans/webfonts/PublicSans-Thin.woff")
    }
    .page-container{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        margin: -10px;
    }
    .vid{
        -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 85%);
        mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 85%);
    }
    .nav-background{
        z-index: -2; 
        position: sticky; 
        top: 0; 
        width: 100%; 
        height: 250px; 
        background-color: var(--main-color);
    }
    .text-background{
        background-color: var(--main-color); 
        /* background: linear-gradient(to bottom,rgba(0, 0, 0, 0), var(--main-color)10px); */
        position: relative; 
        /* transform: translateY(-5px); */
    }
    .background-gradient{
        height: 400px;
        width: 100%;
        position: absolute;
        top: -400px;
        background-color: transparent;
        background: linear-gradient(to top, var(--main-color), rgba(255, 255, 255, 0));
    }
    .container{
        max-width: 1000px;
        width: 100%;
        position: relative;
        /* background-color: blue; */
        overflow: scroll;
    }
    .project-carousel{
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        gap: 10px;
    }
    
    .img-icon{
        z-index: 99; 
        position: absolute; 
        top: -100px; 
        left: 25px; 
        width: 150px; 
        height: 150px; 
        border-radius: 50px; 
        overflow: hidden;
        justify-content: center;
        align-items: center;
    }
    
</style>