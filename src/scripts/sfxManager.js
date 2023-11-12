import { AudioManager } from "./audioManager.js";
let audioManager = null;

let menuMove = null;
let menuSelect = null;
let jumpSound = null;
let throwStarSound = null;
let attackSound = null;
let playerDeath = null;
let senseiDeathSound = null;

export const init = (async runtime => {
    // Initialise the audio manager. See AudioManager.js for details.
    audioManager = new AudioManager(runtime);

    // During the loading screen, load both sound files as
    // AudioBuffers and the music track all in parallel, so
    // they are ready for immediate playback on startup.
    [menuMove, menuSelect, jumpSound, throwStarSound, attackSound, playerDeath, senseiDeathSound] = await Promise.all([
        audioManager.loadSound("sfx_menu_move1.webm"),
        audioManager.loadSound("sfx_sounds_button6.webm"),
        audioManager.loadSound("jump.webm"),
        audioManager.loadSound("Laser2.webm"),
        audioManager.loadSound("shot_01.webm"),
        audioManager.loadSound("retro_explosion_05.webm"),
        audioManager.loadSound("retro_die_02.webm")
    ]);
});

export function PlayPlayerDeathsound() {
    audioManager.playSound(playerDeath);
}

export function PlaySenseiDeathsound() {
    audioManager.playSound(senseiDeathSound);
}

export function PlayMenuMove() {
    audioManager.playSound(menuMove);
}

export function PlayMenuSelect() {
    audioManager.playSound(menuSelect);
}

export function PlayJumpSounds() {
    audioManager.playSound(jumpSound);
}

export function PlayJumpAttackSound() {
    audioManager.playSound(attackSound);
}

export function PlayThrowStarSound() {
    audioManager.playSound(throwStarSound);
}


