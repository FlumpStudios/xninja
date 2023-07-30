import { handlePausePressed, updatePauseIndex, handlePauseConfirm } from "./pause.js";

import * as config from "./config.js";

const checKeyDown = (runtime, key) =>
	runtime.keyboard.isKeyDown(key);

const checKeyUp = (runtime, key) =>
	!runtime.keyboard.isKeyDown(key);

const checkMouseDown = (runtime, button) =>
	runtime.mouse.isMouseButtonDown(button);

const checkMouseUp = (runtime, button) =>
	!runtime.mouse.isMouseButtonDown(button);

let wasLeftMouseDown = false;
let wasRightMouseDown = false;
export const mouse = (runtime) => {
	const player = runtime.objects.Player.getFirstInstance();

	if (checkMouseDown(runtime, 0)) {
		if (!wasLeftMouseDown) {
			player.attack(runtime);
		}

		wasLeftMouseDown = true;
	}
	if (checkMouseDown(runtime, 2)) {
		if (!wasRightMouseDown) {
			player.secondaryAttack(runtime);
		}
		wasRightMouseDown = true;
	}

	if (checkMouseUp(runtime, 0)) {
		wasLeftMouseDown = false;
	}

	if (checkMouseUp(runtime, 2)) {
		wasRightMouseDown = false;
	}
}

let wasLeftDown = false;
let wasRightDown = false;
export const keyboard = (runtime) => {
	const player = runtime.objects.Player.getFirstInstance();
	if (checKeyDown(runtime, "ArrowLeft") || checKeyDown(runtime, "KeyA")) {
		player.movePlayerleft(runtime);
		if (!wasLeftDown) {
			player.animationFrame = 0;
			player.startAnimation();
		}
		wasLeftDown = true;
	}

	if (checKeyDown(runtime, "ArrowRight") || checKeyDown(runtime, "KeyD")) {
		player.movePlayerRight(runtime);
		if (!wasRightDown) {
			player.animationFrame = 0;
			player.startAnimation();
		}
		wasRightDown = true;
	}

	if (checKeyDown(runtime, "ShiftLeft")) {
		player.setRunning(runtime);
	} else {
		player.setWalking(runtime);
	}

	if (checKeyDown(runtime, "ArrowUp") || checKeyDown(runtime, "KeyW")) {
		player.jump(runtime);
	}

	if (checKeyDown(runtime, "ArrowDown") || checKeyDown(runtime, "KeyS")) {
		player.fallThrough(runtime);
	}

	if (!checKeyDown(runtime, "ArrowLeft")
		&& !checKeyDown(runtime, "KeyA")
		&& !checKeyDown(runtime, "ArrowRight")
		&& !checKeyDown(runtime, "KeyD")) {

		if (!player.getIsSkating()) {
			player.stopAnimation();
		}
	}

	if (checKeyUp(runtime, "ArrowLeft") && checKeyUp(runtime, "KeyA")) {
		wasLeftDown = false;
	}

	if (checKeyUp(runtime, "ArrowRight") && checKeyUp(runtime, "KeyD")) {
		wasRightDown = false;
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

let action_pause = button_start;
let action_pause_menu_up = button_dpad_up;
let action_pause_menu_down = button_dpad_down;
let action_pause_menu_confirm = button_A;

let action_stealth = button_L2;

let action_jump = button_A;
let action_run = button_R2;
let action_throw_star = button_B;
let action_slash = button_X;
let action_fallThrough = button_dpad_down;
let action_left = button_dpad_left;
let action_right = button_dpad_right;


let was_action_throw_star_down = true;
let was_action_slash_down = true;
let was_action_left_down = true;
let was_action_right_down = true;
let was_action_pause_down = true;

let was_action_pause_move_up_down = true;
let was_action_pause_move_down_down = true;
let was_action_pause_confirm_down = true;


export const gamePad = (runtime) => {
	const player = runtime.objects.Player.getFirstInstance();
	if (!player) { return; }
	if (navigator.webkitGetGamepads) {
		// const gp = navigator.webkitGetGamepads()[0];

		// if (!gp) { return; }

		// if (gp.buttons[action_jump] === 1) {
		// 	jump(runtime);
		// }
	} else {

		const gp = navigator.getGamepads()[0];
		if (!gp) { return; }

		if (gp.buttons[action_pause].value > 0 || gp.buttons[action_pause].pressed) {
			if (!was_action_pause_down) {
				handlePausePressed();
				was_action_pause_down = true;
			}
		}
		else { was_action_pause_down = false; }

		if (config.getGameState() === config.gameStates.paused) {
			if (gp.axes[axis_left_vert] < -dead_zone || gp.buttons[action_pause_menu_up].value > 0 || gp.buttons[action_pause_menu_up].pressed) {
				if (!was_action_pause_move_up_down) {
					updatePauseIndex(-1, runtime);
					was_action_pause_move_up_down = true;
				}
			}
			else {
				was_action_pause_move_up_down = false;
			}

			if (gp.axes[axis_left_vert] > dead_zone || gp.buttons[action_pause_menu_down].value > 0 || gp.buttons[action_pause_menu_down].pressed) {
				if (!was_action_pause_move_down_down) {
					updatePauseIndex(1, runtime);
					was_action_pause_move_down_down = true;
				}
			}
			else {
				was_action_pause_move_down_down = false;
			}

			if (gp.buttons[action_pause_menu_confirm].value > 0 || gp.buttons[action_pause_menu_confirm].pressed) {
				if (!was_action_pause_confirm_down) {
					handlePauseConfirm(runtime);
					was_action_pause_confirm_down = true;
				}
			}
			else { was_action_pause_confirm_down = false; }
			return;
		}

		if (gp.axes[axis_left_hori] > dead_zone || gp.buttons[action_right].value > 0 || gp.buttons[action_right].pressed) {
			player.movePlayerRight(runtime);
			if (!was_action_right_down) {
				player.animationFrame = 0;
				player.startAnimation();
				was_action_right_down = true;
			}
		}
		else {
			was_action_right_down = false;
		}

		if (gp.axes[axis_left_hori] < -dead_zone || gp.buttons[action_left].value > 0 || gp.buttons[action_left].pressed) {
			player.movePlayerleft(runtime);
			if (!was_action_left_down) {
				player.animationFrame = 0;
				player.startAnimation();
				was_action_left_down = true;
			}
		}
		else {
			was_action_left_down = false;
		}

		if (gp.axes[axis_left_hori] > -dead_zone
			&& gp.buttons[action_left].value === 0
			&& !gp.buttons[action_left].pressed
			&& gp.axes[axis_left_hori] < dead_zone
			&& gp.buttons[action_right].value === 0
			&& !gp.buttons[action_right].pressed) {
				if (!player.getIsSkating()) {
					player.stopAnimation();
				}
		}

		if (gp.axes[axis_left_vert] > 0.8 || gp.buttons[action_fallThrough].value > 0 || gp.buttons[action_fallThrough].pressed) {
			player.fallThrough(runtime);
		}

		if (gp.buttons[action_jump].value > 0 || gp.buttons[action_jump].pressed) {
			player.jump(runtime);
		}

		if (gp.buttons[action_run].value > 0 || gp.buttons[action_run].pressed) {
			player.setRunning(runtime);
		} else {
			player.setWalking(runtime);
		}

		if (gp.buttons[action_stealth].value > 0 || gp.buttons[action_stealth].pressed) {
			player.setStealthMode(true, runtime);
		} else {
			player.setStealthMode(false, runtime);
		}

		if (gp.buttons[action_slash].value > 0 || gp.buttons[action_slash].pressed) {
			if (!was_action_slash_down) {
				player.attack(runtime);
				was_action_slash_down = true;
			}
		}
		else { was_action_slash_down = false; }

		if (gp.buttons[action_throw_star].value > 0 || gp.buttons[action_throw_star].pressed) {
			if (!was_action_throw_star_down) {
				player.secondaryAttack(runtime);
				was_action_throw_star_down = true;
			}
		}
		else { was_action_throw_star_down = false; }
	}
}