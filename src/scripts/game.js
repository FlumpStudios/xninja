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
    const currentConfig = getCurrentConfig(runtime);

    const levelTime = runtime.levelInstance.getLevelTime();
    if (levelTime < 0) {
        runtime.objects.TimeRemaining_spritefont.getFirstInstance().colorRgb = [0, 0, 1];
    }
    else if (levelTime > currentConfig.silverTarget) {
        runtime.objects.TimeRemaining_spritefont.getFirstInstance().colorRgb = [1, 0, 0];
    }
    else {
        runtime.objects.TimeRemaining_spritefont.getFirstInstance().colorRgb = [1, 1, 1];
    }

    if (levelTime > currentConfig.bronzeTarget) {
        if (!runtime.objects.Ghost.getFirstInstance()) {
            const ghost = runtime.objects.Ghost.createInstance(config.layers.game, player.x + 700, player.y - 500);
            ghost.behaviors.Bullet.speed = config.GHOST_SPEED;
        }
    }

    if (!player) { return; }

    // Level 4 hack to make sure there's always enough stars to complete level
    if (
        runtime.layout.name === "Level_1_4"
        && runtime.levelInstance.getStarcount() <= 0
        && runtime.objects.DeathStarPickUp.getAllInstances().length < 1
        && !runtime.levelInstance.isLevelInExitState()) {
        runtime.objects.DeathStarPickUp.createInstance(config.layers.game, 104, 336);
    }

    if (
        runtime.layout.name === "Level_1_15"
        && runtime.levelInstance.getStarcount() <= 0
        && runtime.objects.DeathStarPickUpX5.getAllInstances().length < 1
        && !runtime.levelInstance.isLevelInExitState()) {
        runtime.objects.DeathStarPickUpX5.createInstance(config.layers.game, 320, 32);
    }

    if ((getEnemyCount() <= 0 && config.levelConfig[runtime.layout.name].requiresAllEnenmiesKilled) || player.getHasPlayerEnteredLevelEndBox()) {

        if (!runtime.levelInstance.isLevelInExitState()) {
            if (currentConfig.exitUp) {
                const arrow = runtime.objects.LevelEndArrowTop.getFirstInstance();
                arrow.behaviors.Flash.flash(0.1, 0.1, 1);
                arrow.behaviors.Flash.addEventListener("flashend", e => arrow.behaviors.Flash.flash(0.1, 0.1, 1));
            }

            if (currentConfig.exitDown) {
                const arrow = runtime.objects.LevelEndArrowBottom.getFirstInstance();
                arrow.behaviors.Flash.flash(0.1, 0.1, 1);
                arrow.behaviors.Flash.addEventListener("flashend", e => arrow.behaviors.Flash.flash(0.1, 0.1, 1));
            }

            if (currentConfig.exitLeft) {
                const arrow = runtime.objects.LevelEndArrowLeft.getFirstInstance();
                arrow.behaviors.Flash.flash(0.1, 0.1, 1);
                arrow.behaviors.Flash.addEventListener("flashend", e => arrow.behaviors.Flash.flash(0.1, 0.1, 1));
                runtime.objects.Borders.getFirstInstance().behaviors.Solid.isEnabled = false;
            }

            if (currentConfig.exitRight) {
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
            if (currentConfig.exitDown) {
                goToNextLevel(runtime);
            }
            else {
                resetLevel(runtime);
            }
        }

        if (currentConfig.exitUp) {
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

