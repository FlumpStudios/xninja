import * as config from "./config.js";
import { getGlobalRuntime } from "./globals.js";

let enemyCount = 0;
export const getEnemyCount = () => enemyCount;
export const setEnemyCount = (count) => enemyCount = count;

export default class enemy extends globalThis.ISpriteInstance {
    spawnLocation = { x: 0, y: 0 }
    spawnDimensions = { width: 0, height: 0 }

    constructor() {
        super();
        this.spawnLocation = { x: this.x, y: this.y }
        this.spawnDimensions = { width: this.width, height: this.height }
        this.setSolidCollisionFilter(false, "Border");
        this.addToEnemyCount();

        // Bit of a hack to get around this constructor being called before the levelInstance is created
        getGlobalRuntime().levelInstance.setLevelExitState(false);
    }

    addToEnemyCount = () => ++enemyCount;
    removeFromEnemyCount = () => --enemyCount;

    runKill = (runtime) => {
        const killCount = runtime.objects.KillCount_spritefont.getFirstInstance();
        killCount.text = runtime.levelInstance.addToKills().toString();
        runtime.objects.Blood.createInstance(config.layers.game, this.x, this.y);
        this.removeFromEnemyCount();
    }

    handleDeathStarCollision = (runtime, destructor) => {
        for (const star of runtime.objects.DeathStar.instances()) {
            if (star.testOverlap(this)) {
                this.runKill(runtime);
                star.destroy();
                destructor();
            }
        }
    }

    handleSlashCollision = (runtime, destructor) => {
        for (const slash of runtime.objects.Slash.instances()) {
            if (slash.testOverlap(this)) {
                this.runKill(runtime);
                // getGlobalRuntime().objects.DeathStarPickUp.createInstance(config.layers.game, this.x, this.y - 23);			
                destructor();
            }
        }
    }

    handleChargeEnemyCollision = (runtime, destructor) => {
        for (const charger of runtime.objects.chargerEnemy.instances()) {
            if (charger.testOverlap(this)) {
                if (charger.instVars.IsScared) {
                    this.runKill(runtime);
                    destructor();
                }
                // getGlobalRuntime().objects.DeathStarPickUp.createInstance(config.layers.game, this.x, this.y - 23);			
            }
        }
    }

    handleSpikeCollisions = (runtime, destructor) => {
        for (const spike of runtime.objects.Spike.instances()) {
            if (spike.testOverlap(this)) {
                this.runKill(runtime);
                destructor();
                return;
            }
        }

        for (const spike of runtime.objects.SpikeSine.instances()) {
            if (spike.testOverlap(this)) {
                this.runKill(runtime);
                destructor();
            }
        }
    }

    hasLineOfSightOfPlayer = (runtime) => {
        const player = runtime.objects.Player.getFirstInstance();
        if (!player) { return };

        if (player.opacity < 1) {
            return false;
        }

        return this.behaviors.LineOfSight.hasLOStoPosition(player.x, player.y);
    }

    handleEscaped = (runtime, destructor) => {
        runtime.levelInstance.addToLevelTime(config.ESCAPE_PENALTY);
        const escapedCount = runtime.objects.EscapedCount_spritefont.getFirstInstance();
        escapedCount.text = runtime.levelInstance.addToEscaped().toString();
        this.removeFromEnemyCount();
        destructor();
    }
}