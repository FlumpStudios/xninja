export default class toggleEnabled {
  #onTime = 0;
  #offTime = 0;
  #timer = 0;

  constructor(onTime, Offtime) {
    this.#onTime = onTime;
    this.#offTime = Offtime;
  }

  update = (ref, dt) => {
    if (this.#onTime > 0) {
      this.#timer += dt;
      ref.isVisible = ref.isCollisionEnabled = this.#timer < this.#onTime;
      if (this.#timer > this.#onTime + this.#offTime) {
        this.#timer = 0;
      }
    }
  };
}
