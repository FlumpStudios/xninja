import toggleEnabled from "./toggleEnabled.js";

export default class sparksInst extends globalThis.IParticlesInstance {
  #onTime = 0;
  #offTime = 0;
  #timer = 0;
  #toggleEnabled = null;

  constructor() {
    super();
    this.#toggleEnabled = new toggleEnabled(
      this.instVars.OnTime,
      this.instVars.OffTime,
      this.instVars.Delay
    );
  }

  update = (runtime) => {
    if (this.#toggleEnabled) {
      this.#toggleEnabled.update(this, runtime.dt);
    }
  };
}