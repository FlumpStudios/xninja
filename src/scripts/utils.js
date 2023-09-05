// Calculate the angle in radians between two points.
export const angleTo = (x1, y1, x2, y2) =>
	Math.atan2(y2 - y1, x2 - x1);

// Calculate the distance between two points.
export const distanceTo = (x1, y1, x2, y2) => {
	return Math.hypot(x2 - x1, y2 - y1);
}

// Test if a given instance is outside the bounds of the layout.
export const isOutsideLayout = (inst) => {
	const layout = inst.layout;
	return inst.x < 0 || inst.y < 0 ||
		inst.x > layout.width || inst.y > layout.height;
}

export const isOutsideBottomOfLayout = (inst) => {
	const layout = inst.layout;
	return inst.y > layout.height;
}

export const isOutsideTopOfLayout = (inst) => {
	return inst.y < 0;
}

export const isOutsideSidesOfLayout = (inst) => {
	const layout = inst.layout;
	return inst.x < 0 || inst.x > layout.width;
}

export const isOutOfScreen = (inst, runtime) => {
	const scrollx = parseFloat(inst.layout.scrollX);
	const scrolly = parseFloat(inst.layout.scrollY);
	const height = parseFloat(runtime.viewportHeight);
	const width = parseFloat(runtime.viewportWidth);

	if (inst.x > scrollx + (width / 2)) {
		return true;
	}

	if (inst.x < scrollx - (width / 2)) {
		return true;
	}

	if (inst.y > scrolly + (height / 2)) {
		return true;
	}

	if (inst.y < scrolly - (height / 2)) {
		return true;
	}

	return false;
}

// Convert x from degrees to radians.
export const toRadians = (x) =>
	x * (Math.PI / 180);

export const fromRadians = (x) =>
	(x * 180) / Math.PI;

// Rotate from angle 'start' towards angle 'end' by the angle
// 'step' (all in radians).
export const angleRotate = (start, end, step) => {
	const ss = Math.sin(start);
	const cs = Math.cos(start);
	const se = Math.sin(end);
	const ce = Math.cos(end);

	if (Math.acos(ss * se + cs * ce) > step) {
		if (cs * se - ss * ce > 0)
			return start + step;
		else
			return start - step;
	}
	else {
		return end;
	}
}

export const waitForMillisecond = (ms) => new Promise(res => setTimeout(res, ms));

export const isMirrored = (inst) => inst.width < 0;

export const getAngleTo = (obj1, obj2) =>
	Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x);


