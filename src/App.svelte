<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import PhoneExhibit from "./routes/PhoneExhibit.svelte";
  import CameraSlider from "./routes/CameraSlider.svelte";

  export let url = "";
</script>

<Router {url}>
  <!-- <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/phoneExhibit">Phone Exhibit</Link>
  </nav> -->
    <Route path="/phoneExhibit" component={PhoneExhibit} />
    <Route path="/cameraSlider" component={CameraSlider} />
    <Route path="/about" component={About} />
    <Route path="/"><Home /></Route>
</Router>