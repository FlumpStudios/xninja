import enemy from "./enemy.js";
import { isOutsideLayout, isMirrored, waitForMillisecond } from "./utils.js";
import { getGlobalRuntime } from "./globals.js";
import * as config from "./config.js";

export default class SenseiInstance extends enemy {
	visionCone = null;
	visionConeDestroyed = false;
	previousX = 0;
	hasStopped = false;

	constructor() {
		super();
		this.visionCone = getGlobalRuntime().objects.VisionCone.createInstance(config.layers.game, this.x, this.y);
	}

	runCleanUp = () => {
		if (this) {			
			if (!this.visionConeDestroyed) {
				this.visionCone.destroy();
				this.visionConeDestroyed = true;
			}
			this.destroy();
		}
	}

	handleSenseiBehavior = (runtime) => {
		this.#senseiPatrol(runtime);
		if (isOutsideLayout(this)) {
			this.handleEscaped(runtime, this.runCleanUp);
			return;
		}

		const diff = this.previousX - this.x
		this.hasStopped = diff > -0.1 && diff < 0.1;
		this.previousX = this.x;

		if ((!this.instVars.Sines || this.instVars.IsScared) && this.hasStopped && !this.instVars.Static) {
			this.hasStopped = false;
			this.width = this.width * -1;
		}

		this.behaviors.Bullet.angleOfMotion = isMirrored(this) ? Math.PI : 0;

		this.#handleVisionCone();

		this.handleDeathStarCollision(runtime, this.runCleanUp);
		this.handleSlashCollision(runtime, this.runCleanUp);
		this.handleSpikeCollisions(runtime, this.runCleanUp);

		if (this.hasLineOfSightOfPlayer(runtime) && !this.instVars.IsScared) {
			this.instVars.IsScared = true;
			waitForMillisecond(100).then(() => {
				// There is a chance the enemy doesn't exist after the wait, so just swallowing it for now.
				if (this) {
					try {
						this.setSolidCollisionFilter(false, "Border EnemyBouncer");
						this.behaviors.Platform.simulateControl("jump");	
						this.behaviors.Bullet.speed = -800;
						this.width = this.width * -1;
					} catch { }
				}
			});
		}
	}

	set = false;

	#senseiPatrol = (runtime) => {
		if (Math.round(runtime.gameTime) % 2 === 1) {
			if (!this.set) {
				if (this.instVars.Sines) {
					if (!this.instVars.IsScared) {
						this.width = this.width * -1;
					}
				}
				this.set = true;
			}
		}
		else {
			this.set = false;
		}
	}

	#handleVisionCone = () => {
		if (!this.visionConeDestroyed) {
			this.visionCone.x = this.x;
			this.visionCone.y = this.y;
			this.visionCone.width = isMirrored(this) ? this.behaviors.LineOfSight.range * -1 : this.behaviors.LineOfSight.range;

			if (this.instVars.IsScared) {
				this.visionCone.destroy();
				this.visionConeDestroyed = true;
			}
		}
	}
}
