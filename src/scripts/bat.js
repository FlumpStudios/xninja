import enemy from "./enemy.js";
import { getAngleTo } from "./utils.js";
import { isOutsideLayout, isMirrored, waitForMillisecond } from "./utils.js";
import { getGlobalRuntime } from "./globals.js";
import * as config from "./config.js";

export default class BatInstance extends enemy {

	currentPatrolTime = 0;
	senseZone = null;
	senseZoneDestroyed = false;
	hasStopped = false;
	initialWidth = 68;

	constructor() {
		super();
		const runTime = getGlobalRuntime();
		this.senseZone = runTime.objects.senseZone.createInstance(config.layers.game, this.x, this.y);
		if (this.instVars.patrolTime > 0 && this.instVars.patrolSpeed > 0) {
			this.setAnimation("Fly");
			this.behaviors.Bullet.isEnabled = true;
		}
		else {
			this.behaviors.Bullet.isEnabled = false;
			this.setAnimation("Sleep");
		}
	}

	runCleanUp = () => {
		if (this) {
			if (!this.senseZoneDestroyed) {
				this.senseZone.destroy();
				this.senseZoneDestroyed = true;
			}
			this.destroy();
		}
	}

	handleSenseZoneCollision = (runtime) => {
		const player = runtime.objects.Player.getFirstInstance();
		if (player.isStealthed()) { return; }
		if (player.testOverlap(this.senseZone)) {
			this.instVars.IsScared = true;
			this.senseZone.destroy();
			this.senseZoneDestroyed = true;
			this.setAnimation("Fly");
			this.behaviors.Bullet.isEnabled = true;
		}
	}

	handleBatBehavior = (runtime) => {
		const player = runtime.objects.Player.getFirstInstance();

		if (this.instVars.IsScared) {
			if (player.x < this.x) {
				this.width = this.initialWidth * -1;
			}
			else {
				this.width = this.initialWidth;
			}

			if (player.isVisible) {
				this.behaviors.Bullet.angleOfMotion = getAngleTo(player, this);
			}
		} else {			
			this.currentPatrolTime += runtime.dt;

			if (this.instVars.patrolTime > 0 && this.currentPatrolTime > this.instVars.patrolTime) {
				this.width *= -1;
				this.behaviors.Bullet.speed *= -1;
				this.currentPatrolTime = 0;
			}
		}


		if (isOutsideLayout(this)) {
			this.destroy();
			return;
		}

		this.handleDeathStarCollision(runtime, this.runCleanUp);
		this.handleSlashCollision(runtime, this.runCleanUp);
		this.handleSpikeCollisions(runtime, this.runCleanUp);
		if (!this.instVars.IsScared) {
			this.handleSenseZoneCollision(runtime);
		}
	}
}
