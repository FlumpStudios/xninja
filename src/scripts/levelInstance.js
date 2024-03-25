import * as config from "./config.js";

export default class Level {

  #isInLevelExitState = false;
  #killCount = 0;
  #escapeCount = 0;
  #starCount = 0;
  #levelTime = 0;
  #timeMultiplier = 1;
  #isLevelReady = false;

  constructor(level) {
    if (level && config.levelConfig[level]) {
      this.#starCount = config.levelConfig[level].startingStars;
    }
  }

  getIsLevelReady = () => this.#isLevelReady;
  
  setIsLevelReady = (ready) => this.#isLevelReady = ready;

  setTimeMultiplier = (amount) => this.#timeMultiplier = amount;
  
  getTimeMultiplier = () => this.#timeMultiplier;

  addToLevelTime = (amount) => this.#levelTime += (amount);

  getLevelTime = () => this.#levelTime;

  addToKills = () => ++this.#killCount;

  setLevelExitState = (isExitState) => this.#isInLevelExitState = isExitState;

  isLevelInExitState = () => this.#isInLevelExitState;

  addToEscaped = () => ++this.#escapeCount;

  removeFromStarCount = () => --this.#starCount;

  addToStarCount = () => ++this.#starCount;

  resetKills = () => this.#killCount = 0;

  resetEscaped = () => this.#escapeCount = 0;

  resetStarcount = () => this.#starCount = 0;

  getKills = () => this.#killCount;

  getEscaped = () => this.#escapeCount;

  getStarcount = () => this.#starCount;
}