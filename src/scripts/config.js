export const STEALTH_BAR_DEPLETE_SPEED = 50;
export const STEALTH_BAR_REGEN_SPEED = 15;
export const STEATH_MODE_TIME_STEP = 0.5
export const MAX_STEALTH_BAR_WIDTH = 32;
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
export const GHOST_SPEED = 900;
export const STARS_REQUIRED_FOR_BOSS = 30;
export const BOSS1_LEVEL = "Level_1_15";
export const LOCKED_LEVEL_UI_LAYER = 4;

export const effect_postions = {
    greyScale: 0,
    scanLines: 1,
    vignette: 2,
    glow: 3,
    bulge: 4,
    brightness: 5
}

export const effectIndex = {
    retro: 0,
    greyScale: 1,
    clean: 2
}

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

let totalStarCount = 0;
export const setTotalStarCount = (count) => totalStarCount = count;
export const getTotalStarCount = () => totalStarCount;

let currentTimeStep = 1;
export const setCurrentTimestep = (val) => currentTimeStep = val;
export const getCurrentTimestep = () => currentTimeStep;

let currentGameState = gameStates.mainMenu;

export const getGameState = () => currentGameState;
export const setGameState = (gameState) => currentGameState = gameState;
export const SetLevelConfig = (config) => levelConfig = config;
export let levelConfig =
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
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: true,
        hasSeenTutorial: true
    },
    "Level_1_1": {
        name: "It Starts",
        startingStars: 0,
        bronzeTarget: 10,
        silverTarget: 4,
        goldTarget: 2,
        currentBest: 0,
        nextLevel: "Level_1_2",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: true,
        hasSeenTutorial: false

    },
    "Level_1_2": {
        name: "Hump Day",
        startingStars: 0,
        bronzeTarget: 10,
        silverTarget: 1,
        goldTarget: -0.2,
        currentBest: 0,
        nextLevel: "Level_1_3",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: true,
        hasSeenTutorial: false
    },
    "Level_1_3": {
        name: "Careful Now",
        startingStars: 0,
        bronzeTarget: 10,
        silverTarget: 1,
        goldTarget: 0.2,
        currentBest: 0,
        nextLevel: "Level_1_4",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: true,
        hasSeenTutorial: false
    },
    "Level_1_4": {
        name: "No Escape",
        startingStars: 0,
        bronzeTarget: 10,
        silverTarget: 0,
        goldTarget: -0.5,
        currentBest: 0,
        nextLevel: "Level_1_5",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: true,
        hasSeenTutorial: true
    },
    "Level_1_5": {
        name: "RUN!",
        startingStars: 0,
        bronzeTarget: 15,
        silverTarget: 2.5,
        goldTarget: 1.7,
        currentBest: 0,
        nextLevel: "Level_1_6",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: true,
        hasSeenTutorial: false
    },
    "Level_1_6": {
        name: "Cloak & Ladder",
        startingStars: 0,
        bronzeTarget: 15,
        silverTarget: 2,
        goldTarget: -1,
        currentBest: 0,
        nextLevel: "Level_1_7",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    },
    "Level_1_7": {
        name: "Wet Wet Wet",
        startingStars: 0,
        bronzeTarget: 30,
        silverTarget: 10,
        goldTarget: 3.5,
        currentBest: 0,
        nextLevel: "Level_1_8",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    },
    "Level_1_8": {
        name: "Downfell",
        startingStars: 0,
        bronzeTarget: 25,
        silverTarget: 0,
        goldTarget: -10,
        currentBest: 0,
        nextLevel: "Level_1_9",
        exitUp: false,
        exitDown: true,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: 125 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    },
    "Level_1_9": {
        name: "Skate & Destroy",
        startingStars: 0,
        bronzeTarget: 40,
        silverTarget: 15,
        goldTarget: 3,
        currentBest: 0,
        nextLevel: "Level_1_10",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 225, y: 0 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    },
    "Level_1_10": {
        name: "Cave Story",
        startingStars: 0,
        bronzeTarget: 30,
        silverTarget: 10,
        goldTarget: 6,
        currentBest: 0,
        nextLevel: "Level_1_11",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    }, "Level_1_11": {
        name: "Charged",
        startingStars: 0,
        bronzeTarget: 30,
        silverTarget: 5,
        goldTarget: -1,
        currentBest: 0,
        nextLevel: "Level_1_12",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 75, y: 0 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    }, "Level_1_12": {
        name: "Spikes b flyin",
        startingStars: 0,
        bronzeTarget: 40,
        silverTarget: 15,
        goldTarget: 6,
        currentBest: 0,
        nextLevel: "Level_1_13",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 130, y: 0 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    }, "Level_1_13": {
        name: "Rising Heat",
        startingStars: 0,
        bronzeTarget: 40,
        silverTarget: 30,
        goldTarget: 24,
        currentBest: 0,
        nextLevel: "Level_1_14",
        exitUp: true,
        exitDown: false,
        exitLeft: false,
        exitRight: false,
        cameraFocusOffset: { x: 0, y: -25 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    }, "Level_1_14": {
        name: "Escape Plan",
        startingStars: 0,
        bronzeTarget: 30,
        silverTarget: 10,
        goldTarget: 5,
        currentBest: 0,
        nextLevel: "LevelSelect",
        exitUp: false,
        exitDown: false,
        exitLeft: false,
        exitRight: true,
        cameraFocusOffset: { x: 240, y: 0 },
        requiresAllEnenmiesKilled: false,
        hasSeenTutorial: true
    }, "Level_1_15": {
        name: "AHHHH!",
        startingStars: 0,
        bronzeTarget: 100,
        silverTarget: 50,
        goldTarget: 30,
        currentBest: 0,
        nextLevel: "LevelSelect",
        exitUp: true,
        exitDown: false,
        exitLeft: true,
        exitRight: true,
        cameraFocusOffset: { x: 0, y: 0 },
        requiresAllEnenmiesKilled: true,
        hasSeenTutorial: true
    } 
}