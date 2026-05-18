export default class fallingBlockTrigger extends globalThis.ISpriteInstance {
  #triggerIndex = 0;
  constructor() {
    super();
    this.#triggerIndex = this.instVars.TriggerIndex;
  }

  update = (runtime) => {
    let player = runtime.objects.Player.getFirstInstance();

    if (this.testOverlap(player)) {
        console.log("Hit payer");
      for (const block of runtime.objects.FallingBlock.instances()) {
        if (block.instVars.TriggerIndex === this.#triggerIndex) {
          block.behaviors.Physics.isEnabled = true;
        }
      }
    }
  };
}
