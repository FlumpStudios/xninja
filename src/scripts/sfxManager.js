import { AudioManager } from "./audioManager.js";
let audioManager = null;

let menuMove = null;
let menuSelect = null;

export const init = (async runtime => {
    // Initialise the audio manager. See AudioManager.js for details.
    audioManager = new AudioManager(runtime);

    // During the loading screen, load both sound files as
    // AudioBuffers and the music track all in parallel, so
    // they are ready for immediate playback on startup.
    [menuMove, menuSelect] = await Promise.all([
        audioManager.loadSound("sfx_menu_move1.webm"),
        audioManager.loadSound("sfx_sounds_button6.webm")
    ]);
});

// These functions are called by the button click events.
export function PlayMenuMove() {
    audioManager.playSound(menuMove);
}

export function PlayMenuSelect() {
    audioManager.playSound(menuSelect);
}
