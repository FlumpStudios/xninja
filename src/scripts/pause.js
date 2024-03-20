import { setEnemyCount } from "./enemy.js";
import * as config from "./config.js";
import { resetLevel } from "./game.js";
let pauseMenuIndex = 0;

export const pauseBehaviour = (runtime) => {
    const pauseLayer = runtime.layout.getLayer(config.layers.pause);
    if (config.getGameState() === config.gameStates.paused) {
        pauseLayer && (pauseLayer.isVisible = true);
    }
    else {
        pauseLayer && (pauseLayer.isVisible = false);
    }
}

export const handlePausePressed = () => {
    pauseMenuIndex = 0;
    if (config.getGameState() === config.gameStates.paused) {
        config.setGameState(config.gameStates.game)
    } else {
        config.setGameState(config.gameStates.paused)
    }
}

export const handlePauseConfirm = (runtime) => {
    if (config.getGameState() != config.gameStates.paused) { return; }
    switch (pauseMenuIndex) {
        case 0:
            config.setGameState(config.gameStates.game)
            break;
        case 1:
            resetLevel(runtime);
            break;
        case 2:
            setEnemyCount(0);
            config.setGameState(config.gameStates.levelSelect);
            runtime.goToLayout("LevelSelect");
            break;
    }
}

export const updatePauseIndex = (val, runtime) => {
    console.log(runtime.objects);
    const inst = runtime.objects.PauseOption.getAllInstances();

    pauseMenuIndex += val;
    if (pauseMenuIndex >= inst.length) {
        pauseMenuIndex = 0;
    }

    if (pauseMenuIndex < 0) {
        pauseMenuIndex = inst.length - 1;
    }

    for (let i = 0; i < inst.length; i++) {
        if (i === pauseMenuIndex) {
            runtime.objects.PauseOption.getAllInstances()[i].opacity = 1;
        }
        else {
            runtime.objects.PauseOption.getAllInstances()[i].opacity = 0.5;
        }
    }
}