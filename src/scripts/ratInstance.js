import enemy from "./enemy.js";
import {
  isOutsideLayout,
  isMirrored,
  waitForMillisecond,
  isOutOfScreen,
  getAngleTo,
} from "./utils.js";
import { getGlobalRuntime } from "./globals.js";
import * as config from "./config.js";
import * as sfx from "./sfxManager.js";

export default class RatInstance extends enemy {
  #orignalSpeed = 0;
  visionCone = null;
  visionConeDestroyed = false;
  previousX = 0;
  hasStopped = false;
  exlaim = null;
  constructor() {
    super();
    const runTime = getGlobalRuntime();
    if (this.instVars.HasCone) {
      this.visionCone = runTime.objects.VisionCone.createInstance(
        config.layers.game,
        this.x,
        this.y,
      );
    }
    if (this.instVars.ForceConeToTopOfLayer) {
      this.visionCone.moveToTop();
    }
    this.bonusWorth = -3;

    this.#orignalSpeed = this.behaviors.Bullet.speed;
  }

  runCleanUp = () => {
    if (this) {
      if (this.visionCone && !this.visionConeDestroyed) {
        if (this.exlaim) {
          this.exlaim.isVisible = false;
          this.exlaim.destroy();
        }

        this.visionCone.destroy();
        this.visionConeDestroyed = true;
      }
      this.destroy();
    }
  };

  handleChargeEnemyCollision = (runtime, destructor) => {
    for (const charger of runtime.objects.chargerEnemy.instances()) {
      if (charger.testOverlap(this)) {
        if (charger.instVars.IsScared) {
          this.runKill(runtime, sfx.PlaySenseiDeathsound);
          destructor();
        }
      }
    }
  };

  handleRatBehavior = (runtime) => {
    this.#senseiPatrol(runtime);
    if (isOutOfScreen(this, runtime) && this.instVars.IsScared) {
      sfx.PlayerEnemyEspcapeSound();
      this.handleEscaped(runtime, this.runCleanUp);
      return;
    }

    const diff = this.previousX - this.x;
    this.hasStopped = diff > -0.1 && diff < 0.1;
    this.previousX = this.x;

    if (
      (!this.instVars.Sines || this.instVars.IsScared) &&
      this.hasStopped &&
      !this.instVars.Static &&
      !this.instVars.IsStunned
    ) {
      this.hasStopped = false;
      this.width = this.width * -1;
    }

    this.behaviors.Bullet.angleOfMotion = isMirrored(this) ? Math.PI : 0;

    this.#handleVisionCone();

    if (this.hasLineOfSightOfPlayer(runtime) && !this.instVars.IsScared) {
      if (!this.instVars.IsScared) {
        sfx.PlayEnemyScared();
        this.instVars.IsStunned = true;
        this.behaviors.Bullet.speed = 0;
      }
      this.instVars.IsScared = true;
      
      waitForMillisecond(25).then(() => {
        // There is a chance the enemy doesn't exist after the wait, so just swallowing it for now.
        // this.behaviors.Platform.simulateControl("jump");

        if (this) {
          try {
            const player = runtime.objects.Player.getFirstInstance();
            // this.behaviors.Bullet.angleOfMotion = getAngleTo(player, this);
            this.instVars.IsStunned = false;
            // this.behaviors.Platform.isEnabled = true;
            //this.setSolidCollisionFilter(false, "Border EnemyBouncer");
            // this.behaviors.Platform.simulateControl("jump");
            this.behaviors.Bullet.speed = 800;
            //this.width = this.width * -1;

            waitForMillisecond(2000).then(() => {
              try {
                this.visionCone.isVisible = true;
                this.visionConeDestroyed = false;
                this.instVars.IsStunned = false;
                this.instVars.IsScared = false;
                this.behaviors.Bullet.speed = this.#orignalSpeed;
              } catch {}
            });
          } catch {}
        }
      });
    }

    this.handleDeathStarCollision(
      runtime,
      this.runCleanUp,
      sfx.PlaySenseiDeathsound,
    );
    this.handleSlashCollision(
      runtime,
      this.runCleanUp,
      sfx.PlaySenseiDeathsound,
    );
    this.handleSpikeCollisions(
      runtime,
      this.runCleanUp,
      sfx.PlaySenseiDeathsound,
    );
    this.handleChargeEnemyCollision(
      runtime,
      this.runCleanUp,
      sfx.PlaySenseiDeathsound,
    );
  };

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
    } else {
      this.set = false;
    }
  };

  #handleVisionCone = () => {
    if (this.visionCone && !this.visionConeDestroyed) {
      this.visionCone.x = this.x;
      this.visionCone.y = this.y;
      this.visionCone.width = isMirrored(this)
        ? this.behaviors.LineOfSight.range * -1
        : this.behaviors.LineOfSight.range;

      if (this.instVars.IsScared) {
        this.visionCone.isVisible = false;
        this.visionConeDestroyed = true;
      }
    }
  };
}
