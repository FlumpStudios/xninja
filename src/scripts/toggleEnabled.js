export default class toggleEnabled {
  #onTime = 0;
  #offTime = 0;
  #timer = 0;
  #delay = 0;
  #delayTimer = 0;

  constructor(onTime, Offtime, delay) {
    this.#onTime = onTime;
    this.#offTime = Offtime;
    this.#delay = delay;
  }

  update = (ref, dt) => {
    if (this.#onTime > 0) {

      if(this.#delay > 0 && this.#delayTimer < this.#delay)
      {
        this.#delayTimer += dt;
        return;
      }


      this.#timer += dt;
      ref.isVisible = ref.isCollisionEnabled = this.#timer < this.#onTime;
      if (this.#timer > this.#onTime + this.#offTime) {
        this.#timer = 0;
      }
    }
  };
}
