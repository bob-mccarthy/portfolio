<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import PhoneExhibit from "./routes/PhoneExhibit.svelte";
  import CameraSlider from "./routes/CameraSlider.svelte";
  import FlipPCB from "./routes/FlipPCB.svelte";
  import ElectronicPuzzle from "./routes/ElectronicPuzzle.svelte";
  export let url = "";
</script>

<Router {url}>
    <Route path="/electronicPuzzle"><ElectronicPuzzle /></Route>
    <Route path="/flipPCB"><FlipPCB /></Route>
    <Route path="/phoneExhibit"><PhoneExhibit /></Route>
    <Route path="/cameraSlider"><CameraSlider /></Route>
    <Route path="/about"><About /></Route>
    <Route path="/"><Home /></Route>
</Router>