import toggleEnabled from "./toggleEnabled.js";

export default class electricBolt extends globalThis.ISpriteInstance {
  #onTime = 0;
  #offTime = 0;
  #timer = 0;
  #toggleEnabled = null;
  #randomAngleTime = 0;
  #randAngleTimer = 0;

  constructor() {
    super();
    this.#toggleEnabled = new toggleEnabled(
      this.instVars.OnTime,
      this.instVars.OffTime,
      this.instVars.Delay,
    );
    this.#randomAngleTime = this.instVars.RandomAngleTime;
  }

  update = (runtime) => {
    if (this.#toggleEnabled) {
      this.#toggleEnabled.update(this, runtime.dt);
    }
    this.#randAngleTimer += runtime.dt;

    if(this.#randomAngleTime > 0 && this.#randAngleTimer > this.#randomAngleTime)
    {
      console.log(this.angle);
      this.angle = Math.random() * 360;
      this.#randAngleTimer = 0;
    }

  };
}
