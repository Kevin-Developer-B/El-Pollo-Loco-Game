/**
 * Represents a movable object with physics-like behavior.
 * Extends DrawableObject with movement, gravity, collision, and state management.
 */
class MovableObject extends DrawableObject {
    /** 
    * @type {number} Movement speed in the horizontal direction.
    * @type {boolean} Indicates if the object is facing the opposite direction.
    * @type {boolean} Indicates if the object is currently knocked back.
    * @type {boolean} Indicates if the object is currently hurt.
    * @type {number} Vertical speed (used for jumping/falling).
    * @type {number} Acceleration applied to vertical speed (gravity).
    * @type {number} Current energy/health of the object.
    * @type {number} Timestamp (in ms) of the last time the object was hit.
    * @type {number} Y-position representing the ground level.
    */
    speed = 0.35;
    otherDirection = false;
    isKnockedBack = false;
    isHurtStatus = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    groundLevel = 415;

    /**
     * Applies gravity to the object, making it fall when above ground.
     * Runs repeatedly at a fixed interval.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (!this.hasSplash && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} True if above ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y + this.height < this.groundLevel;
        }
    }

    /**
     * Checks collision with another MovableObject.
     * @param {MovableObject} mo - The other object to check collision with.
     * @returns {boolean} True if colliding.
     */
    isColliding(mo) {
        if (!mo) return false;

        const thisLeft = this.x + this.offset.left;
        const thisRight = this.x + this.width - this.offset.right;
        const thisTop = this.y + this.offset.top;
        const thisBottom = this.y + this.height - this.offset.bottom;

        const moLeft = mo.x + mo.offset.left;
        const moRight = mo.x + mo.width - mo.offset.right;
        const moTop = mo.y + mo.offset.top;
        const moBottom = mo.y + mo.height - mo.offset.bottom;

        return thisRight > moLeft &&
            thisBottom > moTop &&
            thisLeft < moRight &&
            thisTop < moBottom;
    }

    /**
    * Offsets for collision detection to adjust the hitbox.
    * @type {{top: number, bottom: number, left: number, right: number}}
    */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
    * Checks if the object is currently in a hurt state.
    * @returns {boolean} True if hurt.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Checks if the object is dead (energy zero).
     * @returns {boolean} True if dead.
     */
    isDead() {
        const dead = this.energy == 0;
        if (dead)
            return dead;
    }

    /**
     * Plays an animation cycling through given images.
     * @param {string[]} images - Array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the left if not knocked back or hurt.
     */
    moveLeft() {
        if (!this.isKnockedBack && !this.isHurtStatus) {
            this.x -= this.speed;
            this.otherDirection = false;
        }
    }

    /**
     * Moves the object to the right if not knocked back or hurt.
     */
    moveRight() {
        if (!this.isKnockedBack && !this.isHurtStatus) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    /**
     * Initiates a jump by setting vertical speed and playing jump sound.
     */
    jump() {
        this.speedY = 15;
        this.wantsToJump = false;
        sounds.jump.play();
    }

    /**
     * Performs a smaller jump.
     */
    littleJump() {
        if (this.dead) return;
        this.speedY = 8;
        this.wantsToJump = false;
    }

    /**
     * Performs a smaller jump.
     */
    littleJumpBoss() {
        if (this.dead) return;
        this.speedY = 15;
        this.isJumping = true;
        this.wantsToJump = false;
        const jumpDistance = 60;
        sounds.boss_alert.play();
        const moveIntervalTime = 85; 
        const totalSteps = 35;
        let steps = 0;

        let jumpForwardInterval = setInterval(() => {
            this.x -= jumpDistance / totalSteps;
            steps++;
            if (steps >= totalSteps) clearInterval(jumpForwardInterval);
        }, moveIntervalTime);
    }

    /**
     * Plays walking animation and sound.
     */
    walkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        sounds.walk.play();
    }

    /**
     * Simulates a fall to the ground with gradual vertical movement.
     */
    fallToGround() {
        const groundY = 500;
        const fallSpeed = 5;
        this.fallInterval = setInterval(() => {
            if (this.y < groundY) {
                this.y += fallSpeed;
            } else {
                clearInterval(this.fallInterval);
                this.y = groundY;
            }
        }, 30);
    }
}