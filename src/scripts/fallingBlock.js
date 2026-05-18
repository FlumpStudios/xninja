export default class fallingBlock extends globalThis.ISpriteInstance {
    #requireTrigger = false;
    constructor()
    {
        super();
        this.#requireTrigger = this.instVars.RequiresTrigger;        
        this.behaviors.Physics.isEnabled = !this.#requireTrigger        
    }

}