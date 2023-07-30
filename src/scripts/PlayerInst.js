import { waitForMillisecond, isMirrored } from "./utils.js"
import { resetLevel } from "./game.js";
import * as config from "./config.js";

const SLASH_POSITION_OFFSET = 24;


export default class PlayerInst extends globalThis.ISpriteInstance {
    constructor() {
        super();
        this.setSolidCollisionFilter(false, "EnemyBouncer");
        this.#hasPlayerEnteredLevelEndBox = false;
    }

    #currentRunAnimation = "Run";
    #currentAttackAnimation = "Slice";
    #currentJumpAnimation = "Jump";

    #isSkating = false;

    #stealthLocked = false;
    #greyIntensity = 0;
    #wasOnFloor = false;
    #hasPlayerEnteredLevelEndBox = false;

    getHasPlayerEnteredLevelEndBox = () => this.#hasPlayerEnteredLevelEndBox;
    setHasPlayerEnteredLevelEndBox = (val) => this.#hasPlayerEnteredLevelEndBox = val;

    setAnimationToRun = () => this.setAnimation(this.#currentRunAnimation);
    setAnimationToAttack = () => this.setAnimation(this.#currentAttackAnimation);
    setAnimationToJump = () => this.setAnimation(this.#currentJumpAnimation);
    setAnimationToKickFlip = () => this.setAnimation("Kickflip");
    setAnimationToShuv = () => this.setAnimation("Shuv");

    getCurrentJumpAnimation = () => this.#currentRunAnimation;
    getCurrentAttackAnimation = () => this.#currentAttackAnimation;
    getCurrentJumpAnimation = () => this.#currentJumpAnimation;
    getIsSkating = () => this.#isSkating;


    pinSlashToPlayer = (runtime) => {
        const player = this;
        for (const Slash of runtime.objects.Slash.instances()) {
            if (isMirrored(Slash)) {
                Slash.x = player.x + SLASH_POSITION_OFFSET * -1;
                Slash.y = player.y;
            } else {
                Slash.x = player.x + SLASH_POSITION_OFFSET;
                Slash.y = player.y;
            }
        }
    }

    pinCameraOffet = (runtime) => {
        const cam = runtime.objects.CameraFocus.getFirstInstance();

        if (!cam) {
            throw "Cannot find camera in scene";
        }
        const cameOffset = config.levelConfig[runtime.layout.name].cameraFocusOffset;

        cam.x = this.x + cameOffset.x;
        cam.y = this.y + cameOffset.y;
    }


    setStealthMode = (on, runtime) => {
        const player = this;
        const stealthBar = runtime.objects.StealthBar.getFirstInstance();
        if (!stealthBar) { return; }

        if (this.#stealthLocked) {
            stealthBar.colorRgb = [1, 0, 0];
        } else {
            stealthBar.colorRgb = [1, 1, 1];
        }

        if (stealthBar.width < 1) {
            this.#stealthLocked = true;
        }

        if (stealthBar.width > config.MAX_STEALTH_BAR_WIDTH - 1) {
            this.#stealthLocked = false;
            stealthBar.isVisible = false;
        }
        else {
            stealthBar.isVisible = true;
        }


        if (on && !this.#stealthLocked) {
            runtime.levelInstance.setTimeMultiplier(2);
            stealthBar.width -= (config.STEALTH_BAR_DEPLETE_SPEED * runtime.dt);
            player.opacity = 0.50;
            config.setCurrentTimestep(config.STEATH_MODE_TIME_STEP);
            player.effects[0].isActive = true;

            if (this.#greyIntensity < 0.3) {
                this.#greyIntensity += runtime.dt * 1.5;
            }
            runtime.objects.StealthFade.getFirstInstance().opacity = this.#greyIntensity;
            if (runtime.layout.scale < 1.5) {
                if (player.x > 150 && player.x < runtime.layout.width - 150) {
                    if (player.y > 50 && player.y < runtime.layout.height - 50) {


                        if (player.x > (runtime.layout.scrollX - 200)) {
                            runtime.layout.scale += (runtime.dt * 0.25);
                        }
                    }
                }
            }
        }
        else {
            runtime.levelInstance.setTimeMultiplier(1);
            if (stealthBar.width < config.MAX_STEALTH_BAR_WIDTH) {
                stealthBar.width += (config.STEALTH_BAR_REGEN_SPEED * runtime.dt);
            }
            runtime.objects.StealthFade.getFirstInstance().opacity = 0;

            config.setCurrentTimestep(1);
            player.opacity = 1;
            player.effects[0].isActive = false;
            runtime.layout.scale = 1;

            this.#greyIntensity = 0;

            if (runtime.layout.scale > 1) {
                runtime.layout.scale = 1;
            }
        }
    }

    checkIfPLayerinLevelEndBox = (runtime) => {
        const endLevelBox = runtime.objects.LevelEndBox.getFirstInstance();
        if (endLevelBox && endLevelBox.testOverlap(this)) {
            this.setHasPlayerEnteredLevelEndBox(true);
        }
    }

    checkEnemyOnFloor = () => {
        if (this.behaviors.Platform.isOnFloor && !this.#wasOnFloor) {
            this.setAnimationToRun();
        }

        this.#wasOnFloor = this.behaviors.Platform.isOnFloor;
    }

    isInWater = (runtime) => {
        const player = this;
        if (player.behaviors.Platform.isByWall("left") || player.behaviors.Platform.isByWall("right")) {
            return false;
        }

        for (const water of runtime.objects.Water.instances()) {
            if (water.testOverlap(player)) {
                return true;
            }
        }
        return false;
    }

    attack = (runtime) => {
        if (this.isInWater(runtime)) { return; }
        this.setAnimationToAttack();
        waitForMillisecond(100).then(() => {
            if (this) {
                this.setAnimationToRun();
                if (isMirrored(this)) {
                    runtime.objects.Slash.createInstance(config.layers.game, this.x - SLASH_POSITION_OFFSET, this.y);
                }
                else {
                    runtime.objects.Slash.createInstance(config.layers.game, this.x + SLASH_POSITION_OFFSET, this.y);
                }
            }
        });
    }

    secondaryAttack = (runtime) => {
        if (this.isInWater(runtime)) { return; }

        const player = this;

        const starsThrown = runtime.levelInstance.getStarcount();

        if (starsThrown < 1) { return; }
        if (this.width < 0) {
            const star = runtime.objects.DeathStar.createInstance(config.layers.game, player.x - 12, player.y + 7);
            star.behaviors.Bullet.speed = config.DEATH_STAR_SPEED + this.behaviors.Platform.speed;
            star.behaviors.Bullet.angleOfMotion = Math.PI;
        }
        else {
            const star = runtime.objects.DeathStar.createInstance(config.layers.game, player.x + 12, player.y + 7);
            star.behaviors.Bullet.speed = config.DEATH_STAR_SPEED + this.behaviors.Platform.speed;
            star.behaviors.Bullet.angleOfMotion = 0;
        }

        if (starsThrown < config.INFINATE_STAR_AMOUNT) {
            runtime.levelInstance.removeFromStarCount().toString();
        }
    }

    jump = (runtime) => {

        if (this.isInWater(runtime)) {
            this.behaviors.Platform.jumpStrength = config.WATER_JUMP_STRENGTH;
            this.behaviors.Platform.jumpSustain = config.WATER_JUMP_SUSTAIN;
        } else {
            this.behaviors.Platform.jumpStrength = config.JUMP_STRENGTH;
            this.behaviors.Platform.jumpSustain = config.JUMP_SUSTAIN;
        }

        if (this.#isSkating) {
            for (const e of runtime.objects.RampEndZone.instances()) {
                if (e.testOverlap(this)) {
                    return;;
                }
            }
        }

        this.behaviors.Platform.simulateControl("jump");
        waitForMillisecond(50).then(() => {
            if (this) {
                this.setAnimationToJump();
            }
        });
    }

    killPlayer = (runtime) => {
        if (!this.isVisible) { return; }
        runtime.objects.StealthBar.getFirstInstance().destroy();
        this.isVisible = false;
        this.behaviors.Platform.isEnabled = false;
        runtime.objects.Blood.createInstance(config.layers.game, this.x, this.y);
        waitForMillisecond(config.TIME_IN_DEATH_STATE).then(() => {
            resetLevel(runtime);
        });
    }

    checkEnemyCollisions = (runtime) => {
        for (const spike of runtime.objects.Spike.instances()) {
            if (spike.testOverlap(this)) {
                this.killPlayer(runtime);
            }
        }

        for (const spike of runtime.objects.SpikeSine.instances()) {
            if (spike.testOverlap(this)) {
                this.killPlayer(runtime);
            }
        }
    }

    checkPickupCollisions = (runtime) => {

        for (const pickup of runtime.objects.DeathStarPickUp.instances()) {
            if (pickup.testOverlap(this)) {
                runtime.levelInstance.addToStarCount(runtime);
                pickup.destroy();
            }
        }

        for (const skateboardPickUp of runtime.objects.SkateboardPickUp.instances()) {
            if (skateboardPickUp.testOverlap(this)) {
                this.setToSkating(runtime);
                this.setAnimationToRun();
                skateboardPickUp.destroy();
            }
        }
    }

    setToSkating = (runtime) => {
        this.#currentRunAnimation = "Skate";
        this.#currentAttackAnimation = "SkateSlash";
        this.#currentJumpAnimation = "Ollie";
        this.#isSkating = true;
        this.animationSpeed = 5;
        this.behaviors.Platform.maxSpeed = config.SKATE_SPEED;
    }

    setToNotSkating = (runtime) => {
        this.#currentRunAnimation = "Run";
        this.#currentAttackAnimation = "Slash";
        this.#currentJumpAnimation = "Jump";
        this.#isSkating = false;
    }

    setRunning = (runtime) => {
        if (this.#isSkating) { return; }
        if (this.isInWater(runtime)) {
            this.setSwimming(runtime);
            return;
        }


        this.behaviors.Platform.maxSpeed = config.RUN_SPEED;
        this.animationSpeed = 35;
    }

    setWalking = (runtime) => {

        if (this.#isSkating) { return; }

        if (this.isInWater(runtime)) {
            this.setSwimming(runtime);
            return;
        }

        this.behaviors.Platform.maxSpeed = config.MOVE_SPEED;
        this.animationSpeed = 20;
    }

    setSwimming = (runtime) => {
        this.behaviors.Platform.maxSpeed = config.WATER_MOVE_SPEED;
        this.animationSpeed = 7;
    }


    movePlayerleft = (runtime) => {
        if (this.#isSkating) { return; }
        this.behaviors.Platform.simulateControl("left");

        if (!isMirrored(this)) {
            this.width = this.width * -1;
        }
    }

    movePlayerRight = (runtime) => {

        this.behaviors.Platform.simulateControl("right");

        if (this.width < 0) {
            this.width = this.width * -1;
        }
    }

    fallThrough = (runtime) => {
        this.behaviors.Platform.fallThrough();
    }


    handleDeathStarSpawn = (instance, runtime) => {
        instance.setSolidCollisionFilter(false, "Border EnemyBouncer");
        if (isMirrored(this)) {
            instance.behaviors.Bullet.angleOfMotion = Math.PI;
        }
        else {
            instance.behaviors.Bullet.angleOfMotion = 0;
        }
    }

    handleSlashCreated = (instance, runtime) => {
        if (isMirrored(this)) {
            instance.width = instance.width * -1;
        }

        waitForMillisecond(100).then(() => {
            try {
                instance.destroy()
            } catch { }
        });
    }

    checkRampCollision = (runtime) => {
        for (const e of runtime.objects.RampStartZone.instances()) {
            if (e.testOverlap(this)) {
                this.angle = e.angle;
            }
        }

        for (const e of runtime.objects.RampEndZone.instances()) {
            if (e.testOverlap(this)) {
                this.behaviors.Platform.simulateControl("jump");



                waitForMillisecond(50).then(() => {
                    if (this.animationName != "Shuv" && this.animationName != "Kickflip") {
                        if (Math.floor(Math.random() * 10) <= 5) {
                            this.setAnimationToKickFlip();
                        }
                        else {
                            this.setAnimationToShuv();
                        }
                    }
                    this.angle = 0;
                });
            }
        }
    }

    update = (runtime) => {
        this.pinSlashToPlayer(runtime);
        this.checkEnemyOnFloor();
        this.checkIfPLayerinLevelEndBox(runtime);
        this.checkEnemyCollisions(runtime);
        this.checkPickupCollisions(runtime);
        this.pinCameraOffet(runtime);

        if (this.#isSkating) {
            this.checkRampCollision(runtime);
            this.movePlayerRight(runtime);
        }
    }
}