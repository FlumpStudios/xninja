import enemy from "./enemy.js";
import { getAngleTo } from "./utils.js";

export default class GhostInstance extends enemy {

    CHASE_SPEED = 400;
    initialWidth = 0;
    constructor() {
        super();
        this.behaviors.Bullet.speed = this.CHASE_SPEED;
        this.initialWidth = this.width;
    }

    handleGhostBehavior = (runtime) => {
        const player = runtime.objects.Player.getFirstInstance();

        if (player.testOverlap(this)) {
            player.killPlayer(runtime);
        }

        if (player.isVisible) {
            if (player.x < this.x) {
                this.width = this.initialWidth * -1;
            }
            else {
                this.width = this.initialWidth;
            }

            this.behaviors.Bullet.angleOfMotion = getAngleTo(player, this);
        }

    }
}
