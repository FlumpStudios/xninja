import * as config from "./config.js";

let menuIndex = 0;

const getSelectedLevel = () => "Level_1_" + (menuIndex + 1).toString();

export const updateMenu = (runtime) => {

	const inst = runtime.objects.MenuBorder.getAllInstances();

	for (let i = 0; i < inst.length; i++) {
		if (i === menuIndex) {
			runtime.objects.MenuBorder.getAllInstances()[i].behaviors.Sine.isEnabled = true;
		}
		else {
			runtime.objects.MenuBorder.getAllInstances()[i].behaviors.Sine.isEnabled = false;
		}
	}
	var levelConfig = config.levelConfig[getSelectedLevel()];
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

	runtime.goToLayout(getSelectedLevel());
}

export const back = (runtime) => {
	runtime.goToLayout("MainMenu");
}