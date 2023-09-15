export const STEALTH_BAR_DEPLETE_SPEED = 50;
export const STEALTH_BAR_REGEN_SPEED = 15;
export const STEATH_MODE_TIME_STEP = 0.5
export const MAX_STEALTH_BAR_WIDTH = 32;
export const ESCAPE_PENALTY = 5;
export const INFINATE_STAR_AMOUNT = 1000;
export const LEVEL_PREFIX = "Level_";
export const LEVEL_SELECT_NAME = "LevelSelect";
export const MAIN_MENU_NAME = "MainMenu";
export const SPLASH_NAME = "Splash";
export const JUMP_STRENGTH = 400;
export const WATER_JUMP_STRENGTH = 200;
export const JUMP_SUSTAIN = 0.275;
export const WATER_JUMP_SUSTAIN = 0.0;
export const TIME_IN_DEATH_STATE = 750;
export const MOVE_SPEED = 325;
export const RUN_SPEED = 450;
export const SKATE_SPEED = 600;
export const WATER_MOVE_SPEED = 150;
export const DEATH_STAR_SPEED = 500;
export const SLASH_POSITION_OFFSET = 24;

export const layers = {
    farBackground: 0,
    midBackground: 1,
    nearBackground: 2,
    indoorBackground: 3,
    backgroundEffect: 4,
    game: 5,
    foregroundEffect: 6,
    ui: 7,
    pause: 8
}

export const gameStates = {
    game: 0,
    levelSelect: 1,
    paused: 2,
    mainMenu: 3
}


let currentTimeStep = 1;
export const setCurrentTimestep = (val) => currentTimeStep = val;
export const getCurrentTimestep = () => currentTimeStep;


let currentGameState = gameStates.mainMenu;

export const getGameState = () => currentGameState;
export const setGameState = (gameState) => currentGameState = gameState;

export const levelConfig =
{
    "LevelSelect": {
        name: "Level Select",
        startingStars: 0,
        bronzeTarget: 10,
        silverTarget: 5,
        goldTarget: 2,
        currentBest: 0,
        nextLevel: "Level_1_1",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 }
    },
    "Level_1_1": {
        name: "It starts",
        startingStars: 0,
        bronzeTarget: 15,
        silverTarget: 10,
        goldTarget: 4,
        currentBest: 0,
        nextLevel: "Level_1_2",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 }
    },
    "Level_1_2": {
        name: "Careful now",
        startingStars: 0,
        bronzeTarget: 8,
        silverTarget: 6,
        goldTarget: 4,
        currentBest: 0,
        nextLevel: "Level_1_3",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 }
    },
    "Level_1_3": {
        name: "No escape",
        startingStars: 0,
        bronzeTarget: 8,
        silverTarget: 5,
        goldTarget: 3,
        currentBest: 0,
        nextLevel: "Level_1_4",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 }
    },
    "Level_1_4": {
        name: "Cloak and ladder",
        startingStars: 0,
        bronzeTarget: 8,
        silverTarget: 5,
        goldTarget: 3,
        currentBest: 0,
        nextLevel: "Level_1_5",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 }
    },
    "Level_1_5": {
        name: "Wet wet wet",
        startingStars: 0,
        bronzeTarget: 30,
        silverTarget: 25,
        goldTarget: 20,
        currentBest: 0,
        nextLevel: "Level_1_6",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 0 }
    },
    "Level_1_6": {
        name: "Downfell",
        startingStars: 0,
        bronzeTarget: 35,
        silverTarget: 30,
        goldTarget: 25,
        currentBest: 0,
        nextLevel: "Level_1_7",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 125 }
    },
    "Level_1_7": {
        name: "Skate and destroy",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "Level_1_8",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 225, y: 0 }
    },
    "Level_1_8": {
        name: "Cavern Story",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "Level_1_9",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 }
    }, "Level_1_9": {
        name: "Charged",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "Level_1_10",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 75, y: 0 }
    }, "Level_1_10": {
        name: "[PLACE HOLDER]",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "Level_1_11",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 130, y: 0 }
    }, "Level_1_11": {
        name: "[PLACE HOLDER]",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "Level_1_12",
        exitUp: true,
        exitDown: false,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: -25 }
    }, "Level_1_12": {
        name: "[PLACE HOLDER]",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "LevelSelect",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 0 }
    }, "Level_1_13": {
        name: "[PLACE HOLDER]",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "LevelSelect",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 0 }
    }, "Level_1_14": {
        name: "[PLACE HOLDER]",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "LevelSelect",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 0 }
    }, "Level_1_15": {
        name: "[PLACE HOLDER]",
        startingStars: 0,
        bronzeTarget: 5,
        silverTarget: 3,
        goldTarget: 1,
        currentBest: 0,
        nextLevel: "LevelSelect",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 0 }
    }
}