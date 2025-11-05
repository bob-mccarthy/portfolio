<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import PhoneExhibit from "./routes/PhoneExhibit.svelte";
  import CameraSlider from "./routes/CameraSlider.svelte";
  import FlipPCB from "./routes/FlipPCB.svelte";
  export let url = "";
</script>

<Router {url}>
    <Route path = "/flipPCB" component = {FlipPCB}></Route>
    <Route path="/phoneExhibit" component={PhoneExhibit} />
    <Route path="/cameraSlider" component={CameraSlider} />
    <Route path="/about" component={About} />
    <Route path="/"><Home /></Route>
</Router>