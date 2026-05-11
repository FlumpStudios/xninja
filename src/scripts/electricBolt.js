import toggleEnabled from "./toggleEnabled.js";

export default class electricBolt extends globalThis.ISpriteInstance {
  #onTime = 0;
  #offTime = 0;
  #timer = 0;
  #toggleEnabled = null;

  constructor() {
    super();
    this.#toggleEnabled = new toggleEnabled(
      this.instVars.OnTime,
      this.instVars.OffTime,
    );
  }

  update = (runtime) => {
    if (this.#toggleEnabled) {
      this.#toggleEnabled.update(this, runtime.dt);
    }
  };
}
