import * as config from "./config.js";

export default class fireSpawner extends globalThis.ISpriteInstance {
  #spawnTimer = 0;
  #spawnInterval = 0;
  #animationSpeed = 0;
  #moveSpeed = 0;
  #onTime = 0;
  #offTime = 0;

  constructor() {
    super();
    this.#spawnInterval = this.instVars.spawnInterval;   
    this.#animationSpeed = this.instVars.fireAnimationSpeed;
    this.#moveSpeed = this.instVars.moveSpeed;
    this.#onTime = this.instVars.onTime;
    this.#offTime = this.instVars.offTime;
    
    this.isVisible = false;
  }

  update = (runtime) => {
    if (this.#spawnInterval <= 0) {
      return;
    }

    this.#spawnTimer += runtime.dt * 60;
    if (this.#spawnTimer > this.#spawnInterval) {
      this.#spawnTimer = 0;
      const fire = runtime.objects.Explosion.createInstance(
        config.layers.game,
        this.x + (Math.floor(Math.random() * 50) - 100) + 70,
        this.y - Math.floor(Math.random() * 40),
      );

      fire.angle = this.angle;
      fire.behaviors.Bullet.angleOfMotion = this.angle;
      fire.behaviors.Bullet.speed = this.#moveSpeed;
      fire.animationSpeed = this.#animationSpeed;


    }
  };
}
