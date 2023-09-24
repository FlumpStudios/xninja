import { isOutsideBottomOfLayout, isOutsideTopOfLayout, isOutsideSidesOfLayout } from "./utils.js"
import { getEnemyCount, setEnemyCount } from "./enemy.js";
import Level from "./levelInstance.js";
import * as config from "./config.js";

export const resetLevel = (runtime) => {
    config.setGameState(config.gameStates.game);
    setEnemyCount(0);
    runLevelStart(runtime);
    runtime.goToLayout(runtime.layout.name);
}

export const runLevelStart = (runtime) => {
    runtime.levelInstance = new Level(runtime.layout.name);
}

const goToNextLevel = (runtime) => {
    runtime.levelInstance.addToLevelTime(getEnemyCount() * config.ESCAPE_PENALTY);
    const currentBest = config.levelConfig[runtime.layout.name].currentBest;
    const currentTime = runtime.levelInstance.getLevelTime();
    if (currentBest === 0 || (currentTime < currentBest)) {
        config.levelConfig[runtime.layout.name].currentBest = currentTime
    }
    runtime.goToLayout(getCurrentConfig(runtime).nextLevel);
}

const getCurrentConfig = (runtime) => config.levelConfig[runtime.layout.name];

export const gamePlay = (runtime) => {
    const player = runtime.objects.Player.getFirstInstance();

    const levelTime = runtime.levelInstance.getLevelTime();
    if (levelTime < 0) {
        runtime.objects.TimeRemaining_spritefont.getFirstInstance().colorRgb = [0, 0, 1];
    }
    else if (levelTime > 25) {
        runtime.objects.TimeRemaining_spritefont.getFirstInstance().colorRgb = [1, 0, 0];
    }
    else{
        runtime.objects.TimeRemaining_spritefont.getFirstInstance().colorRgb = [1, 1, 1];
    }

    if (levelTime > 30) {
        if (!runtime.objects.Ghost.getFirstInstance()) {
            runtime.objects.Ghost.createInstance(config.layers.game, player.x + 700, player.y - 500);
        }
    }

    


    if (!player) { return; }

    // Level 2 hack to make sure there's always enough stars to complete level
    if (
        runtime.layout.name === "Level_1_3"
        && runtime.levelInstance.getStarcount() <= 0
        && runtime.objects.DeathStarPickUp.getAllInstances().length < 1
        && !runtime.levelInstance.isLevelInExitState()) {
        runtime.objects.DeathStarPickUp.createInstance(config.layers.game, 104, 336);
    }

    if ((getEnemyCount() <= 0 && config.levelConfig[runtime.layout.name].requiresAllEnenmiesKilled) || player.getHasPlayerEnteredLevelEndBox()) {
        if (!runtime.levelInstance.isLevelInExitState()) {
            if (getCurrentConfig(runtime).exitUp) {
                const arrow = runtime.objects.LevelEndArrowTop.getFirstInstance();
                arrow.behaviors.Flash.flash(0.1, 0.1, 1);
                arrow.behaviors.Flash.addEventListener("flashend", e => arrow.behaviors.Flash.flash(0.1, 0.1, 1));
            }

            if (getCurrentConfig(runtime).exitDown) {
                const arrow = runtime.objects.LevelEndArrowBottom.getFirstInstance();
                arrow.behaviors.Flash.flash(0.1, 0.1, 1);
                arrow.behaviors.Flash.addEventListener("flashend", e => arrow.behaviors.Flash.flash(0.1, 0.1, 1));
            }

            if (getCurrentConfig(runtime).exitLeft) {
                const arrow = runtime.objects.LevelEndArrowLeft.getFirstInstance();
                arrow.behaviors.Flash.flash(0.1, 0.1, 1);
                arrow.behaviors.Flash.addEventListener("flashend", e => arrow.behaviors.Flash.flash(0.1, 0.1, 1));
                runtime.objects.Borders.getFirstInstance().behaviors.Solid.isEnabled = false;
            }

            if (getCurrentConfig(runtime).exitRight) {
                const arrow = runtime.objects.LevelEndArrowRight.getFirstInstance();
                arrow.behaviors.Flash.flash(0.1, 0.1, 1);
                arrow.behaviors.Flash.addEventListener("flashend", e => arrow.behaviors.Flash.flash(0.1, 0.1, 1));
                runtime.objects.Borders2.getFirstInstance().behaviors.Solid.isEnabled = false;
            }

            runtime.levelInstance.setLevelExitState(true);
        }

        if (isOutsideSidesOfLayout(player)) {
            goToNextLevel(runtime);
        }

        if (isOutsideBottomOfLayout(player)) {
            if (getCurrentConfig(runtime).exitDown) {
                goToNextLevel(runtime);
            }
            else {
                resetLevel(runtime);
            }
        }

        if (getCurrentConfig(runtime).exitUp) {
            if (isOutsideTopOfLayout(player)) {
                goToNextLevel(runtime);
            }
        }
    }
    else {
        if (isOutsideBottomOfLayout(player)) {
            resetLevel(runtime);
        }
    }
}

