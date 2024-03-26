import { setEnemyCount, getEnemyCount } from "./enemy.js";
import { isOutsideLayout, isMirrored, waitForMillisecond, isOutOfScreen } from "./utils.js";
import { getGlobalRuntime } from "./globals.js";
import * as config from "./config.js";
import * as sfx from "./sfxManager.js";

export default class Boss1Instance extends globalThis.ISpriteInstance {
	health = 20;
	runningIntro = true;
	hasPlayedDeathSounds = false;
	constructor() {
		super();
		setEnemyCount(1);
		getGlobalRuntime().levelInstance.setLevelExitState(false);
	}


	handleDeathStarCollision = (runtime) => {
		for (const star of runtime.objects.DeathStar.instances()) {
			if (star.testOverlap(this)) {
				star.destroy();
				sfx.PlayBosSHit();
				this.health--;
				this.colorRgb = [1, 0, 0];				
				waitForMillisecond(50).then(() => {
					this.colorRgb = [1, 1, 1];
				});
			}
		}
	}

	handleBossBahavior = (runtime) => {
		if (this.health < 0) {
			if(!this.hasPlayedDeathSounds)
			{
				sfx.PlayBoss1Death();
				this.hasPlayedDeathSounds = true;
			}
			this.y += (runtime.dt * 30);
			this.colorRgb = [1, 0, 0];
			this.behaviors.Bullet.isEnabled = false;
			this.animationFrame = 0;

			if (this.y > 500) {
				setEnemyCount(0);
				runtime.objects.Blood.createInstance(config.layers.game, this.x, this.y);
				this.destroy()
			}
		}
		else {
			const diff = this.previousX - this.x
			if (!this.runningIntro) {
				this.behaviors.Bullet.isEnabled = true;
				this.hasStopped = diff > -0.1 && diff < 0.1;
				this.previousX = this.x;

				if ((!this.instVars.Sines || this.instVars.IsScared) && this.hasStopped && !this.instVars.Static && !this.instVars.IsStunned) {
					this.hasStopped = false;
					this.width = this.width * -1;
				}

				this.behaviors.Bullet.angleOfMotion = isMirrored(this) ? Math.PI : 0;
			}

			if (this.y < 312) {
				this.runningIntro = false;
			}
			else {
				this.animationFrame = 0;
				this.y -= (runtime.dt * 60);
				this.behaviors.Bullet.isEnabled = false;
			}

			let speed = 250 - ((this.health - 1) * 30);
			this.behaviors.Bullet.speed = speed > 0 ? speed : 75;

			this.handleDeathStarCollision(runtime);
		}
	}
}