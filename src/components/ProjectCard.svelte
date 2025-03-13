<script lang="ts">
    let {width, height,icon, name, path, desc} = $props()
    import { Link } from "svelte-routing";
</script>
<main>
    <Link style = "text-decoration:none" to={path}>
        <div class="container" style="--w: {width}px; --h: {height}px; --r: {width /8}px">
            <div class="text-container" style="--t: 5%; --th: 20%;font-family: publicSansT; font-size: 24px">
                <p>{name}</p>
            </div>
            
            <img src={icon} alt = {name + "photo"} >
            <div class = "text-container" style="--t: 70%; --th:30%;font-family: publicSans;">
                <div style="width: 90%;">
                    <p  >{desc}</p>
                </div>
                
            </div>
            
        </div>
    </Link>
</main>
<style>
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
    .text-container{
        width: 100%; 
        height: var(--th); 
        position:absolute; 
        top:var(--t); 
        display: flex; 
        justify-content: center;
        align-items: center;
    }
    p{
        
        text-align: center;
        color: #212121;
    }
    .container{
        width: var(--w);
        height: var(--h);
        border-radius: var(--r);
        background-color: #F6F6F6;
        position: relative;
    }
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* Moves the div back by half its own size */
        width: 90%;
    }
    
</style>