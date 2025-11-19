<script>
    import { Link } from "svelte-routing";
    export let width;
    export let height;
</script>

<Link to="/" style = " text-decoration: none; color: white">
    <div class="back-button" style = "width: {width}; height: {height};">
        <p>BACK</p>
    </div>
    
</Link>
<style>
    .back-button{
        border-radius: calc(0.1 * 100%);
        background-color: #212121;
        border-color: white;
        border: solid;
        display: flex;
        justify-content: center;
    }
    p{
        font-family: publicSansT;
    }
</style>