<script lang="ts">
    import exhibitionBTS from "../assets/phone-exhibit/video-exhibition.mp4"
    import phoneDemo from "../assets/phone-exhibit/phone-display.mp4"
    import diagramOne from "../assets/phone-exhibit/phone-measurement.png"
    import diagramTwo from "../assets/phone-exhibit/scale-factor-vid.png"
    import diagramThree from "../assets/phone-exhibit/vid-on-phones.png"
    import diagramFour from "../assets/phone-exhibit/overlapping-text.mp4"
    import diagramFive from "../assets/phone-exhibit/blank-videos.mp4"
    import diagramSix from "../assets/phone-exhibit/web-server-interface.png"
    import diagramSeven from "../assets/phone-exhibit/downloading.mp4"
    import diagramEight from "../assets/phone-exhibit/dimension-screen.png"
    import diagramNine from "../assets/phone-exhibit/select-screen.png"
    import { screenWidth, aspectRatio } from "../scripts/aspectRatio"
    import BackButton from "../components/BackButton.svelte"
</script>

<main class="page-container" style="max-width: {$screenWidth}px;">
    <div class = "container">
        <div style="display: flex; gap: 10px; align-items: center">
            <BackButton width={"50px"} height= {"50px"}></BackButton>
            <h1>Phone Video Display</h1>
        </div>
        <p>
            Exhibit Demo (left) and Behind the Scenes (right) Videos
        </p>
        <div style="display: flex; margin:20px; justify-content:center; align-items:center; max-width:100%;">
            <video style="min-width: 70%;" playsinline controls>
                <source src="{phoneDemo}" type="video/mp4" />
                <track kind="captions" />
            </video>

            <video style="min-width: 19.9% !important; min-height: 100%; width: auto !important;" playsinline controls>
                <source src="{exhibitionBTS}" type="video/mp4" />
                <track kind="captions" />
            </video>
        </div>
        
        <h2>Description</h2>
        <p>
            This display is made of 70+ phones and tablets, and has been displayed at Harvard, the Clinton Global Initiative 
            in New York and the World Bank in DC. The exhibit has a simple video editor that allows the artists to display 
            any video across any grid of the phones at any time. The videos are then displayed on the phones and kept in sync by 
            a custom written app running on each phone and a custom web server running on a raspberry pi.
        </p>
        <h2> Software</h2>
        <p>
            The functionality of the exhibit boils down to 3 major components: the app running on the phones, the web server, and the video editor. 
            The phone app allows the phones to receive messages from the web server (messages such as start playing the video, stop playing the video, 
            restart the app, etc.), the web server sends messages and the proper video to each phone and makes sure all the phone videos are synced 
            together, and the video editor takes all the videos that the user wants to display on the phone display and processes and renders the videos 
            such that there is one for each phone.
        </p>
        <h3>Video Editor</h3>
        <p>
            The Video Editor is the most logically complex part of the exhibit as well as it gives a good intuition and it is the most important for 
            understanding how the exhibit works as a whole so we will start with it.
        </p>
        <p>
            As a brief overview the video editor takes in the sizes and positions of all of the phones in the display, as well as all of the video information 
            (what videos to display, at what times, and across which subset of phones). It will then determine which videos need to go to which phones, 
            it will crop the videos accordingly, and finally compile all the videos together such that there is one video per phone with any space in 
            between videos filled with a black video.
        </p>
        <p>
            Now to go into depth about how those pieces actually work. Let's start with the inputs, first to get the information about each of the videos 
            the video editor takes in a spreadsheet where each row represents a different video in the timeline and each column represents a different 
            parameter about that video.
        </p>
        <h4>Parameters</h4>
        <ul>
            <li>
                <p> <span style="font-family: publicSansB;">Video ID: </span> a unique identifier for each video</p>
            </li>
            <li>
                <p> <span style="font-family: publicSansB;">Video Name: </span> the name of the filename stored on the computer</p>
            </li>
            <li>
                <p> <span style="font-family: publicSansB;">Grid Size: </span> the number of rows and columns the video is split up amongst (for example if you wanted the video to span 
                    across 5 rows and 14 columns this field would be [5,14])
                </p>
            </li>
            <li>
                <p> <span style="font-family: publicSansB;">Top Left Position: </span> the phone represents the top left corner of the video you want to display
                    (For example if you wanted the video to start in the top left corner of the screen the top left position would be [0,0])</p>
            </li>
            <li>
                <p> <span style="font-family: publicSansB;">Timeline Start Time: </span> the time where the video clip should be placed in the overall
                video (since this video editor allows to compile multiple videos together) 
                </p>
                <p>
                    However, there is another parameter isAbsolute (a true or false value) which determines what the timeline start time means
                </p>
                <ul>
                    <li>
                       <p>
                            If isAbs is true, timeline start represents the absolute time of the clip. For example, if timeline start time is 5 then
                            5 seconds after the overall clip starts this video clip will begin to play 
                        </p>
                    </li>
                    <li>
                        <p>
                            If isAbs is false, timeline start time represents the time after the previous clip. For example if timeline start time is 5
                            then 5 seconds after the previous video clip finishes this video clip will begin to play
                        </p>
                    </li>
                </ul>
                
            </li>
            <li>
                <p> 
                    <span style="font-family: publicSansB;">Z-Index: </span> determines the priority of a video and is meant to handle videos that are playing at the same time. 
                    If two videos are scheduled to play on the same phone at the same time, the video with the higher z-index will play first.
                </p>
            </li>
            <li><p> <span style="font-family: publicSansB;">Video Start and Video End: </span> give the start and end time of the clip (a lot of times you do not want 
                to play a clip in its entirety so these parameters allow you to specify what parts of the clip you wanted to play, 
                such as having the video start from 1.5 seconds to 4.75 seconds).
            </p></li>
        </ul>
        <p>
            In addition to needing information about all the videos, the video editor also needs to know the positions and sizes of all of the phones (for example, 
            the program needs to know that at the phone i,j has a screen length of x millimeters, a screen height of y millimeters, as well as the offset of phone screen 
            from the top of the phone), and the phone gets this information from phone app and the web server, but I will elaborate more about the specifics of how the 
            data is collected in another section
        </p>
        <p>
            Once the program has taken in all of those inputs it can actually render out all of the videos for each of the devices. The first thing the program does 
            is go through each of the videos in the input spreadsheet and figure out which piece of each video corresponds to which phone (For example if the top left 
            position of a video was phone (0,0), and the grid size of the video was (2,2) it would correspond to the phones at positions (0,0), (0,1), (1,0), and (1,1)). 
            The program knows which rows and columns of phones that this video is going to be displayed on from the parameters of the top left position and the grid size 
            in the spreadsheet. Then since the program also took in as input the position and sizes of all of the phones, it can calculate the size of the screen that 
            this video is being displayed on in pixels (as shown in the diagram below).
        </p>
        <div class = "img-container">
            <img src={diagramOne} alt= "diagram of phones being measured">
        </div>
        <p> 
            In the diagram about the program calculates the size of the screen including the space in between the phones as well, which it knows since the frame which holds
            the phones has them at exact spacing (103 mm in the width direction and 190 mm in the y direction). For the width calculation it will find the width by finding 
            the distance in pixels from the left most pixel of the screen to the right most pixel of the screen. It does the same for the height calculation with the top and 
            bottom most pixels
        </p>
        <p>
            Once the size of the screen is known, it is very likely that not just the dimensions of the screen are different from the dimensions of the video but that the 
            aspect ratio of the screen is slightly different than the video. So to solve this issue the program finds the scale factor that you have to multiply the dimensions 
            of the video in order to have it completely cover the screen (as shown in the diagram below). 
        </p>
        <div class = "img-container">
            <img src={diagramTwo} alt= "diagram of how video is stretched over phones">
        </div>
        <p>
            In the diagram above the video 1920 x 1080 pixels and this phone screen is 50,000 pixels x 30,000 pixels so in order for it to fully fill all of the phones it
            needs to be scaled 27.77x in order to look like the diagram above
        </p>
        <p>
            With the video being scaled to the phone screens the program can calculate which pixels on the original video correspond to each of the phone screens 
            (as shown in diagram below)
        </p>
        <div class = "img-container">
            <img src={diagramThree} alt= "diagram of vids across the phone">
        </div>
        <p>
            In the diagram above, its shows all of the videos that correspond to each of the phones, so basically all of the parts of the video which do not overlap
            phones essentially get deleted. 
        </p>
        <p>
            With all of that information the program will go through every video and kept track of which phones it corresponds to and how it needs to be cropped for each. 
            So when this part of the program is finished, for each phone there is a list of videos with their corresponding information. However, for some phones there  
            might be videos that are overlapping or just blank space where there are no videos at all. An example of the overlapping case is in the diagram below, where 
            there is a video across all of the phones, but we also want another video involving some text on just one of the tablets.
        </p>
        <div class="img-container">
            <video class="vid" style="width: 50%" autoplay loop muted playsinline>
                <source src="{diagramFour}" type="video/mp4" />
                <track kind="captions" />
            </video>
        </div>
        <p>
            In the diagram above, there is a video playing across all of the phones as well as a text video just being displayed on one of the tablets tablet.
            For one tablet displaying the text there are two videos that could potentially be played. One is the text video it is displaying, and the other is
            part of the video being stretched across all of the phones.  The way the program knows which video to display on the tablet is the z index, 
            when the program is rendering videos for each phone and two videos are scheduled to play at the same time it will render the video with the higher z-index.
            So the text video has a higher z index in the spreadsheet the video editor takes in, so the video editor renders the text video on the tablet instead of the video that is 
            stretched across all of the other devices.
        </p>
        <p>
            An example of when a device is not displaying a video is in diagram below, where some phones are displaying a video and some are not.
        </p>
        <div class="img-container">
            <video class="vid" style="width: 50%" autoplay loop muted playsinline>
                <source src="{diagramFive}" type="video/mp4" />
                <track kind="captions" />
            </video>
        </div>
        <p>
            Again, the program renders one video out for each phone, so in order for the videos to appear as if they are synced even when a phone is not playing a video it 
            cannot immediately start playing the next video. So the video editor splices in a black video into any slots that are not actively taken up by videos for each phone, 
            so even when phones do not appear to be playing a video they are just playing a black video. So in the diagram above, each video is only playing on a portion of the screen
            at a time, so while any of those videos are playing the rest of the screens are just playing a black video so that the timing of everything stays synced.
        </p>
        <p>
            After all of this process the video editor knows exactly which videos are being rendered for which phone and has removed any overlapping videos and spliced in black videos 
            wherever necessary. So the program then renders out all of the videos and stores them in a folder where each video is labeled corresponding to each phone to the top left phone 
            would correspond to video 1-1.mp4. These videos are then saved on a flash drive and then brought over to the web server
        </p>
        <h3>Web Server</h3>
        <p>
            The web server is what communicates to all of the phones when to start and stop, it stores the videos for the phones to download, keeps the phones time in sync, 
            stores the videos for each phone. The web server is able to communicate with all of the phones over a local network, as all of the phones and the web server 
            are connected to the same router. While the phones and web server are connected to a router they are not connected to the internet as they just need to communicate
            with each other and so in order to cut down on cost we did not connect the network to the internet. Even without the internet the phones communicate with the web 
            server via a websockets connection which allows the phones and the web server to communicate back and forth. However, the exhibitor can actually interact with the 
            exhibit with the interface shown below, that allows the exhibitor to start and stop the video, to refresh all of the phones, as well as to download the current version 
            of the video to each of the phones. 
        </p>
        <div class = "img-container">
            <img  style = "width: 33%" src={diagramSix} alt= "interface for web server">
        </div>
        <p>
            This interface is just a website hosted on the raspberry pi, that can be accessed to any device on the same network. While the interface to perform 
            these functions is quite simple the actual way it relays these messages to the phones is more complicated.
        </p>
        <h4>Web Server Messages</h4>
        <ul>
            <li>
                <p>
                    <span style="font-family: publicSansB;">Start: </span>
                    In order to start the phones, all phones need to start playing their videos within a few hundred milliseconds of each other in order to produce a 
                    reliable video, because of this constraint the web server cannot just send a message to each phone to start playing their videos immediately because 
                    the first phone might get a message to start its video a second or two before the last phone. So in order to keep the phones synced the web server sends 
                    a time for all the phones to start at. For example if it is currently 1:30 and 15 seconds the web server will send a message telling the phones to start at 
                    1:30 and 20 seconds. So that no matter when the phones get the message as long as they get it before the actual start time has elapsed they will all start 
                    at the same time. However, this is also under the assumption that the phones' clocks are synced up with each other (which spoiler alert, they were not). 
                    Since the phones were not connected to the internet their clocks would drift significantly over time, and so the web server also had to act as an NTP (network time protocol) server, 
                    so all of the phones would sync their clocks against the web server's so that they all display their videos at the same time. 
                </p>
                <p>
                    Once you start the videos they will loop until you call the stop command. However, the videos cannot just restart once the videos finish on each phone because the phones take a 
                    variable amount of overhead time to restart their videos so if the videos just continued to play on loop the videos would drift from each other. So the web server keeps tracks how 
                    long the entire video it is playing is, and just calls the start command again after the video is over to get all of the phones synced up again
                </p>
            </li>
            <li>
                <p> 
                    <span style="font-family: publicSansB;"> Stop:</span>
                    In order to stop this phones, this does not need to be synced so the web server just sends a message to all phones to stop their playing their videos immediately 
                    and end the looping as well
                </p>
            </li>
            <li>
                <p>
                    <span style="font-family: publicSansB;"> Refresh:</span>
                    Send a message to all of the phones to reload the app. This is sometimes necessary because phones can get frozen after playing their videos for too long and 
                    you need to refresh them in order to play them again.
                </p>
            </li>
            <li>
                <p>
                    <span style="font-family: publicSansB;"> Download:</span>
                    When an editor has made changes to the phone's videos and wants the phones to download the newer version.It sends a message to each phone one by one to download 
                    it's corresponding video, once the video has been downloaded the phone will then message the web server it is done downloading, and the web server message the next 
                    phone to download its video. Once all the phones have downloaded their videos the web server sends the refresh message to all of the phones.  (We need the phones to 
                    download the videos one at a time because it is too much strain on the web server to try and download 70 videos at the same time)
                </p>
                <div class="img-container">
                    <video style="width: 33%" autoplay loop muted playsinline>
                        <source src="{diagramSeven}" type="video/mp4" />
                        <track kind="captions" />
                    </video>
                </div>
                <p>
                    (this shows the process of downloading the videos, after each phone has downloaded it changes its screen to green to show the downloading progress, and then it refreshes
                    all of the phones)
                </p>
            </li>
        </ul>
        <h3> Phones and Tablets</h3>
        <p>
            The phones and tablets are the pieces that actually make up the video screen and its main job is to take the messages from the web server as discussed above and actually use it 
            to start and stop the videos. This is done through a custom built app that is running on all of the apps using React Native which allows the phones to maintain a websockets 
            connection with the web server. The app allows the devices to communicate with the web server which then allows them to start and stop the videos (using the react-native-video 
            library) on the phones
        </p>
        <p>
            However, also when discussing the video editor it was mentioned that it needs to know the information about the sizes and locations of all of the phones on the screen and that information 
            is ascertained from the app. First, there is a dimension screen (shown below) where you can input the height,width, and screen offset of the phone screen in mm (which the app will convert to pixels), 
            and whether the device is a tablet or not. The screen offset is the distance from the top of the screen to the top of the phone.
        </p>
        <div class = "img-container">
            <img  style = "width: 20%" src={diagramEight} alt= "dimension screen demo">
        </div>
        <p>
            Finally to communicate the location of the phones there is another screen in the app which displays all of the potential positions of the phones, and for each phone you click the position 
            that the phone is on the board (so for the phone in the top left corner you would click the button labeled (1,1)). Once you press a button it sends that information to the web server of 
            its position and screen dimensions which is then stores on a json document that can used by the video editor
        </p>
        <div class = "img-container">
            <img  style = "width: 20%" src={diagramNine} alt= "select screen demo">
        </div>
        <h2> Physical Construction</h2>
        <p>
            In order to mount the phones and display them on the facts there are a few things. The boards which the phones laid on and the cases that
            held them in position all had to built from scratch
        </p>
        <p>
            For the phone cases we needed a solution that allowed us to mount the phones to the wall, that would accomodate multiple different phone sizes (since
            we were using many different kinds of phones) as well as be theft proof. So the design that I ended up 3d modelling a design that had two parts that would 
            slide together and be secured in place with a screw and a nut. Then the screws that went through the case would also be used to mount them to the panels that 
            the phones would sit against
        </p>
        <div style = "display: flex; justify-content: center">
            <iframe title ="phone case" src="https://myfas117.autodesk360.com/shares/public/SH286ddQT78850c0d8a44510efe3c195e893?mode=embed" width="50%" style="aspect-ratio: {$aspectRatio};min-width: min(75%, 400px)" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>
        </div>
        <p>
            As for the panels the phones rested on, it was attached to a set of 6 panels of komatex board which were attached to french cleats which allowed for the panels to just be
            taken off and placed on the phones with ease. The frame that they sat on was ordered from Testrite and was a steel frame, and then aluminum extrusion was cut to size 
            to give the panels and cleats something to actually attach to
        </p>
        <div style = "display: flex; justify-content: center">
            <iframe title = "travelling panel" src="https://myfas117.autodesk360.com/shares/public/SH286ddQT78850c0d8a4a360babeb4ec9dd9?mode=embed" width="50%" style="aspect-ratio: {$aspectRatio}; min-width: min(75%, 400px)" height="auto" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0" ></iframe>
        </div>
    </div>
    
</main>

<style>
    :root{
        --main-color: #212121; 
        --text-color: white;
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
        min-width: 300px;
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
