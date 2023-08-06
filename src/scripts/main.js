// https://www.construct.net/en/make-games/manuals/construct-3/scripting/scripting-reference/iruntime
// https://www.construct.net/en/tutorials/learn-javascript-construct-2830/page-5
// https://www.construct.net/en/tutorials/learn-javascript-construct-2833/page-4

// Import any other script files here, e.g.:
import { keyboard, gamePad, mouse } from "./controls.js"
import { setGlobalRuntime } from "./globals.js";
import { gamePlay, runLevelStart } from "./game.js";
import { uiUpdateLoop } from "./ui.js";
import SenseiInstance from "./sensei.js";
import ChargerEnemyInstance from "./chargerEnemy.js";
import PlayerInst from "./PlayerInst.js";
import Level from "./levelInstance.js";
import * as config from "./config.js"
import * as levelSelectControls from "./levelSelectControls.js";
import { updateMenu as updateLevelSelectMenu } from "./levelSelect.js";
import { pauseBehaviour } from "./pause.js"

runOnStartup(async runtime => {
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.

	setGlobalRuntime(runtime);
	runtime.levelInstance = new Level(null);
	runtime.objects.Sensei.setInstanceClass(SenseiInstance);
	runtime.objects.chargerEnemy.setInstanceClass(ChargerEnemyInstance)
	runtime.objects.Player.setInstanceClass(PlayerInst);
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime) {
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial

	// instances are created and available to use here.

	runtime.addEventListener("tick", () => tick(runtime));
	runtime.addEventListener("instancecreate", (e) => createdInstance(e, runtime));
}

let currentLayout = "";
let previousLayout = "";

const tick = (runtime) => {
	previousLayout = currentLayout;
	currentLayout = runtime.layout.name;
	if (previousLayout !== currentLayout) {
		runLevelStart(runtime);
	}

	if (config.getGameState() != config.gameStates.paused) {
		runtime.timeScale = config.getCurrentTimestep();
		if (currentLayout === config.LEVEL_SELECT_NAME) {
			config.setGameState(config.gameStates.levelSelect);
		}

		if (currentLayout === config.MAIN_MENU_NAME || currentLayout === config.SPLASH_NAME) {
			config.setGameState(config.gameStates.mainMenu);
		}

		if (currentLayout.substring(0, 6) === config.LEVEL_PREFIX) {
			config.setGameState(config.gameStates.game);
		}
	} else {
		runtime.timeScale = 0;
	}
	const gameStates = config.gameStates;
	const currentGameState = config.getGameState();

	switch (currentGameState) {
		case gameStates.game:
			pauseBehaviour(runtime);
			gamePad(runtime);
			gameLoop(runtime);
			//keyboard(runtime);
			//mouse(runtime);

			break;
		case gameStates.paused:
			pauseBehaviour(runtime);
			gamePad(runtime);
			break;
		case gameStates.levelSelect:
			levelSelectControls.gamePad(runtime);
			updateLevelSelectMenu(runtime);
			break;
		default: runtime.timeScale = 1;
	}
}



const createdInstance = (e, runtime) => {
	const player = runtime.objects.Player.getFirstInstance();
	switch (e.instance.objectType.name) {
		case "DeathStar":
			player.handleDeathStarSpawn(e.instance, runtime);
			break;
		case "Slash":
			player.handleSlashCreated(e.instance, runtime);
			break;
		default:
			break;
	}
}

const gameLoop = (runtime) => {
	runtime.levelInstance.addToLevelTime(runtime.dt * runtime.levelInstance.getTimeMultiplier());
	runtime.objects.TimeRemaining_spritefont.getFirstInstance().text = runtime.levelInstance.getLevelTime().toString();
	const player = runtime.objects.Player.getFirstInstance();

	player.update(runtime);

	for (const senesiInst of runtime.objects.Sensei.instances()) {
		senesiInst.handleSenseiBehavior(runtime);
	}

	for (const chargerEnemyInst of runtime.objects.chargerEnemy.instances()) {
		chargerEnemyInst.handleChargerBehavior(runtime);
	}

	gamePlay(runtime);
	uiUpdateLoop(runtime);
}