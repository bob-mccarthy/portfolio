import { writable } from "svelte/store";

// Create a writable store for the aspect ratio
export const aspectRatio = writable(window.innerWidth / window.innerHeight);
export const screenWidth = writable(window.innerWidth)

// Function to update the aspect ratio on resize
function updateAspectRatio() {
    aspectRatio.set(window.innerWidth / window.innerHeight);
    screenWidth.set(window.innerWidth)
}

// Listen for window resizes globally
window.addEventListener("resize", updateAspectRatio);