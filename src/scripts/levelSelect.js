import * as config from "./config.js";

let menuIndex = 0;

const getSelectedLevel = () => "Level_1_" + (menuIndex + 1).toString();

const STAR_NAME = "UIStar_";

export const updateMenu = (runtime) => {

	let starCount = 0;

	const inst = runtime.objects.MenuBorder.getAllInstances();

	for (let i = 0; i < inst.length; i++) {

		let levelStars = runtime.objects[(STAR_NAME + (i + 1))].getAllInstances();
		const l = "Level_1_" + (i + 1).toString();
		const starLevelConfig = config.levelConfig[l];
		if (starLevelConfig.currentBest > 0 || starLevelConfig.currentBest < 0) {
			levelStars[0].isVisible = true;
			starCount++;
			if (starLevelConfig.currentBest < starLevelConfig.goldTarget) {
				levelStars[2].isVisible = true;
				starCount++;
			}
			else {
				levelStars[2].isVisible = false;
			}

			if (starLevelConfig.currentBest < starLevelConfig.silverTarget) {
				levelStars[1].isVisible = true;
				starCount++;
			}
			else {
				levelStars[1].isVisible = false;
			}
		}
		else {
			for (let i = 0; i < levelStars.length; i++) {
				levelStars[i].isVisible = false;
			}
		}


		if (i === menuIndex) {
			runtime.objects.MenuBorder.getAllInstances()[i].behaviors.Sine.isEnabled = true;
		}
		else {
			runtime.objects.MenuBorder.getAllInstances()[i].behaviors.Sine.isEnabled = false;
		}
	}

	config.setTotalStarCount(starCount);
	
	const lockedLevelLayer = runtime.layout.getLayer(config.LOCKED_LEVEL_UI_LAYER);
	const starsLeft = config.STARS_REQUIRED_FOR_BOSS - starCount;	
	runtime.objects.StarsRequiredText.getFirstInstance().text = starsLeft + " more stars required";	
	lockedLevelLayer.isVisible = starCount < config.STARS_REQUIRED_FOR_BOSS;
	
	const levelConfig = config.levelConfig[getSelectedLevel()];
	runtime.objects.Level_Name.getFirstInstance().text = levelConfig.name;
	runtime.objects.Level_Best.getFirstInstance().text = levelConfig.currentBest.toFixed(2).toString();

	runtime.objects.Bronze_Text.getFirstInstance().text = levelConfig.bronzeTarget.toFixed(2).toString();
	runtime.objects.Silver_Text.getFirstInstance().text = levelConfig.silverTarget.toFixed(2).toString();
	runtime.objects.Gold_Text.getFirstInstance().text = levelConfig.goldTarget.toFixed(2).toString();
}

export const selectLeft = (runtime) => {
	if (menuIndex > 0) {
		menuIndex--;
	}
}

export const selectRight = (runtime) => {
	if (menuIndex < runtime.objects.MenuBorder.getAllInstances().length - 1) {
		menuIndex++;
	}
}

export const selectUp = (runtime) => {
	if (menuIndex > 2) {
		menuIndex -= 3;
	}
}

export const selectDown = (runtime) => {
	if (menuIndex < runtime.objects.MenuBorder.getAllInstances().length - 3) {
		menuIndex += 3;
	}
}

export const confirm = (runtime) => {
	const selectedLevel = getSelectedLevel();
	if (selectedLevel === config.BOSS1_LEVEL)
	{
		// Only allow selection if there's enough stars for the boss level
		if(config.getTotalStarCount() < config.STARS_REQUIRED_FOR_BOSS)
		{
			return;
		}
	}
	runtime.goToLayout(getSelectedLevel());
}

export const back = (runtime) => {
	runtime.goToLayout("MainMenu");
}