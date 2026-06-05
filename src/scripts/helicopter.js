import * as config from "./config.js";

export default class Helicopter extends globalThis.ISpriteInstance {
  #isAlive = false;
  #playerOffset = 0;
  #isIntro = true;
  #isDying = false;
  #downTimer = false;
  constructor() {
    super();
    this.#playerOffset = this.instVars.playerOffset;
    this.#isAlive = this.instVars.isAlive;
    this.behaviors.Sine.isEnabled = false;
  }

  update = (runtime) => {
    this.#downTimer += Math.round(runtime.dt * 60);

    if (this.#downTimer > 100) {
      this.#downTimer = 0;
    }

    // Guard
    if (this.#isDying || !this.#isAlive) {
      this.animationSpeed = 0;
      this.behaviors.Sine.isEnabled = false;
      if (this.#downTimer % 10 == 0) {
        const explo = runtime.objects.Explosion.createInstance(
          config.layers.game,
          this.x + (Math.floor(Math.random() * 50) - 100) + 70,
          this.y - Math.floor(Math.random() * 40),
        );
        if (!this.#isAlive) {
          explo.behaviors.Bullet.angleOfMotion = 4.71;
          explo.moveToBottom();
        } else {
          explo.behaviors.Bullet.angleOfMotion = 0;
        }
      }
    }

    if (!this.#isAlive) {
      return;
    }

    const player = runtime.objects.Player.getFirstInstance();

    if (this.#isIntro && !this.#isDying) {
      this.y += runtime.dt * 200;
    }

    if (this.instVars.health < 0) {
      this.#isDying = true;
    }

    if (this.#isDying) {
      this.y += runtime.dt * 100;
      if (this.#downTimer > 20 && this.#downTimer % 15 == 0) {
        this.width *= -1;
      }
    }

    if (this.y > 1100) {
      this.destroy();
    }

    if (this.y > 250 && this.#isIntro) {
      this.#isIntro = false;
      this.behaviors.Sine.isEnabled = true;
    }

    this.instVars.canFire = !this.#isIntro && !this.#isDying;

    if (this.#playerOffset != 0) {
      this.x = player.x + this.#playerOffset;
    }
  };
}
