import { AudioManager } from "./audioManager.js";
let audioManager = null;

let menuMove = null;
let menuSelect = null;
let jumpSound = null;
let throwStarSound = null;
let attackSound = null;
let playerDeath = null;
let senseiDeathSound = null;
let enemyScaredSound = null;
let starPickupSound = null;
let skatePickup = null
let escapeSound = null;
let bossDeath = null;
let bossHit = null;
export const init = (async runtime => {
    // Initialise the audio manager. See AudioManager.js for details.
    audioManager = new AudioManager(runtime);

    // During the loading screen, load both sound files as
    // AudioBuffers and the music track all in parallel, so
    // they are ready for immediate playback on startup.
    [menuMove, menuSelect, jumpSound, throwStarSound, attackSound, playerDeath, senseiDeathSound, enemyScaredSound, starPickupSound, skatePickup, escapeSound, bossDeath, bossHit] = await Promise.all([
        audioManager.loadSound("sfx_menu_move1.webm"),
        audioManager.loadSound("sfx_sounds_button6.webm"),
        audioManager.loadSound("jump.webm"),
        audioManager.loadSound("Laser2.webm"),
        audioManager.loadSound("shot_01.webm"),
        audioManager.loadSound("retro_explosion_05.webm"),
        audioManager.loadSound("retro_die_02.webm"),
        audioManager.loadSound("enemyScared.webm"),
        audioManager.loadSound("starPickup.webm"),
        audioManager.loadSound("skate_pickup.webm"),
        audioManager.loadSound("escape.webm"),
        audioManager.loadSound("bossDeath.webm"),
        audioManager.loadSound("synth_misc_10.webm")
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

export function PlayThrowStarPickupSound() {
    audioManager.playSound(starPickupSound);
}

export function PlayEnemyScared() {
    audioManager.playSound(enemyScaredSound);
}

export function PlayerSkatePickup() {
    audioManager.playSound(skatePickup);
}

export function PlayerEnemyEspcapeSound() {
    audioManager.playSound(escapeSound);
}

export function PlayBoss1Death() {
    audioManager.playSound(bossDeath);
}

export function PlayBosSHit() {
    audioManager.playSound(bossHit);
}

export function SetVolume(vol) {
    if (audioManager) {
        audioManager.changeVolume(vol)
    }
}