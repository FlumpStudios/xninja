import * as levelSelect from "./levelSelect.js";
import * as config from "./config.js"

let wasLeftDown = false;
let wasRightDown = false;
let wasUpDown = false;
let wasDownDown = false;
let wasEnterDown = false;
let wasEscapeDown = false;

const checKeyDown = (runtime, key) =>
	runtime.keyboard.isKeyDown(key);

const checKeyUp = (runtime, key) =>
	!runtime.keyboard.isKeyDown(key);

export const keyboard = (runtime) => {
	if (checKeyDown(runtime, "ArrowLeft") || checKeyDown(runtime, "KeyA")) {
		if (!wasLeftDown) {
			if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
				levelSelect.selectLeft(runtime);
			}
		}
		wasLeftDown = true;
	}

	if (checKeyDown(runtime, "ArrowRight") || checKeyDown(runtime, "KeyD")) {
		if (!wasRightDown) {
			if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
				levelSelect.selectRight(runtime);
			}
		}
		wasRightDown = true;
	}

	if (checKeyDown(runtime, "ArrowUp") || checKeyDown(runtime, "KeyW")) {
		if (!wasUpDown) {
			if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
				levelSelect.selectUp(runtime);
			}
		}
		wasUpDown = true;
	}

	if (checKeyDown(runtime, "ArrowDown") || checKeyDown(runtime, "KeyS")) {
		if (!wasDownDown) {
			if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
				levelSelect.selectDown(runtime);
			}
		}
		wasDownDown = true;
	}


	if (checKeyDown(runtime, "Enter")) {
		if (!wasEnterDown) {
			if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
				levelSelect.confirm(runtime);
			}
		}
		wasEnterDown = true;
	}

	if (checKeyDown(runtime, "Escape")) {
		if (!wasEscapeDown) {
			if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
				levelSelect.back(runtime);
			}
		}
		wasEscapeDown = true;
	}


	if (checKeyUp(runtime, "ArrowLeft") && checKeyUp(runtime, "KeyA")) {
		wasLeftDown = false;
	}

	if (checKeyUp(runtime, "ArrowRight") && checKeyUp(runtime, "KeyD")) {
		wasRightDown = false;
	}

	if (checKeyUp(runtime, "ArrowUp") && checKeyUp(runtime, "KeyW")) {
		wasUpDown = false;
	}

	if (checKeyUp(runtime, "ArrowDown") && checKeyUp(runtime, "KeyS")) {
		wasDownDown = false;
	}

	if (checKeyUp(runtime, "Enter")) {
		wasEnterDown = false;
	}
	if (checKeyUp(runtime, "Escape")) {
		wasEscapeDown = false;
	}

}


const button_A = 0;
const button_B = 1;
const button_X = 2;
const button_Y = 3;

const button_L1 = 4
const button_R1 = 5

const button_L2 = 6
const button_R2 = 7

const button_select = 8;
const button_start = 9;

const button_dpad_up = 12;
const button_dpad_down = 13;
const button_dpad_left = 14;
const button_dpad_right = 15;

const axis_left_hori = 0;
const axis_left_vert = 1;
const dead_zone = 0.5;

let action_confirm = button_A;
let action_confirm_alt = button_start;
let action_back = button_B;

let action_up = button_dpad_up;
let action_down = button_dpad_down;
let action_left = button_dpad_left;
let action_right = button_dpad_right;

let was_action_up_down = true;
let was_action_down_down = true;
let was_action_left_down = true;
let was_action_right_down = true;

let was_action_confirm_down = true;
let was_action_confirm_down_alt = true;

let was_action_back_down = true;

export const gamePad = (runtime) => {
	if (navigator.webkitGetGamepads) {
		// TODO HANDLE OTHER CONTROLS
	} else {

		const gp = navigator.getGamepads()[0];
		if (!gp) { return; }

		if (gp.axes[axis_left_hori] > dead_zone || gp.buttons[action_right].value > 0 || gp.buttons[action_right].pressed) {
			if (!was_action_right_down) {
				if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
					levelSelect.selectRight(runtime);
				}
				else if (runtime.layout.name === config.MAIN_MENU_NAME) {
					if (runtime.objects.MenuArrow.getFirstInstance().instVars.MenuIndex === 1) {
						runtime.objects.DisplayManager.getFirstInstance().instVars.EffectIndex++;
					}
				}
				was_action_right_down = true;
			}
		}
		else {
			was_action_right_down = false;
		}

		if (gp.axes[axis_left_hori] < -dead_zone || gp.buttons[action_left].value > 0 || gp.buttons[action_left].pressed) {
			if (!was_action_left_down) {
				if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
					levelSelect.selectLeft(runtime);
				}
				else if (runtime.layout.name === config.MAIN_MENU_NAME) {
					if (runtime.objects.MenuArrow.getFirstInstance().instVars.MenuIndex === 1) {
						runtime.objects.DisplayManager.getFirstInstance().instVars.EffectIndex--;
					}
				}
				was_action_left_down = true;
			}
		}
		else {
			was_action_left_down = false;
		}

		if (gp.axes[axis_left_vert] > dead_zone || gp.buttons[action_down].value > 0 || gp.buttons[action_down].pressed) {
			if (!was_action_down_down) {
				if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
					levelSelect.selectDown(runtime);
				}
				else if (runtime.layout.name === config.MAIN_MENU_NAME) {
					runtime.objects.MenuArrow.getFirstInstance().instVars.MenuIndex++;
				}
				was_action_down_down = true;
			}
		}
		else { was_action_down_down = false }

		if (gp.axes[axis_left_vert] < -dead_zone || gp.buttons[action_up].value > 0 || gp.buttons[action_up].pressed) {
			if (!was_action_up_down) {
				if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
					levelSelect.selectUp(runtime);
				}
				else if (runtime.layout.name === config.MAIN_MENU_NAME) {
					runtime.objects.MenuArrow.getFirstInstance().instVars.MenuIndex--;
				}
				was_action_up_down = true;
			}
		}
		else { was_action_up_down = false }

		if (gp.buttons[action_confirm].value > 0 || gp.buttons[action_confirm].pressed) {
			if (!was_action_confirm_down) {
				if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
					levelSelect.confirm(runtime);
				}
				was_action_confirm_down = true;
			}
		}
		else { was_action_confirm_down = false; }

		if (gp.buttons[action_back].value > 0 || gp.buttons[action_back].pressed) {
			if (!was_action_back_down) {
				if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
					levelSelect.back(runtime);
				}
				was_action_back_down = true;
			}
		}
		else { was_action_back_down = false; }

		if (gp.buttons[action_confirm_alt].value > 0 || gp.buttons[action_confirm_alt].pressed) {
			if (!was_action_confirm_down_alt) {
				if (runtime.layout.name === config.LEVEL_SELECT_NAME) {
					levelSelect.confirm(runtime);
				}
				was_action_confirm_down_alt = true;
			}
		}
		else { was_action_confirm_down_alt = false; }
	}
}