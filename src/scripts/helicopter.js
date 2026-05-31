import * as config from "./config.js";

export default class Helicopter extends globalThis.ISpriteInstance {
  #playerOffset = 0;
  #isIntro = true;
  #isDying = false;
  #downTimer = false;
  constructor() {
    super();
    this.#playerOffset = this.instVars.playerOffset;
    this.behaviors.Sine.isEnabled = false;
  }

  update = (runtime) => {
    const player = runtime.objects.Player.getFirstInstance();

    if (this.#isIntro && !this.#isDying) {
      this.y += runtime.dt * 200;
    }

    if (this.instVars.health < 0) {
      this.#isDying = true;
    }

    if (this.#isDying) {
      this.behaviors.Sine.isEnabled = false;
      this.#downTimer++;
      this.y += runtime.dt * 100;
      if (this.#downTimer > 20 && this.#downTimer % 15 == 0) {
        this.width *= -1;
      }

      if (this.#downTimer % 10 == 0) {
        runtime.objects.Explosion.createInstance(
          config.layers.game,
          this.x + Math.floor(Math.random() * 40) - 60,
          this.y - Math.floor(Math.random() * 40),
        );
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
