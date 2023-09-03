import enemy from "./enemy.js";
import { getAngleTo } from "./utils.js";
import { isOutsideLayout, isMirrored, waitForMillisecond } from "./utils.js";
import { getGlobalRuntime } from "./globals.js";
import * as config from "./config.js";

export default class BatInstance extends enemy {

	CHASE_SPEED = 350;

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


	lockSenseZone = () => {
		this.senseZone.x = this.x;
		this.senseZone.y = this.y;
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
			this.behaviors.Bullet.speed = this.CHASE_SPEED;
		}
	}

	handleBatBehavior = (runtime) => {
		const player = runtime.objects.Player.getFirstInstance();

		if (this.instVars.IsScared) {
			if (player.isVisible) {
				if (player.x < this.x) {
					this.width = this.initialWidth * -1;
				}
				else {
					this.width = this.initialWidth;
				}

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

		if (!this.instVars.IsScared) {
			this.handleSlashCollision(runtime, this.runCleanUp);
		}

		this.handleDeathStarCollision(runtime, this.runCleanUp);
		this.handleSpikeCollisions(runtime, this.runCleanUp);
		this.lockSenseZone();
		if (!this.instVars.IsScared) {
			this.handleSenseZoneCollision(runtime);
		}
	}
}
