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
    speed = 0.15;
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
        return this.x + this.width - this.offset.right > mo.x + this.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.width + mo.x - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

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
     * Determines if this object is jumping on top of an enemy.
     * @param {MovableObject} enemy - The enemy object.
     * @returns {boolean} True if jumping on enemy.
     */
    isJumpingOn(enemy) {
        const isAbove = this.y + this.height <= enemy.y + 20;
        const isFalling = this.speedY < 0;
        return isAbove && isFalling;
    }

    /**
     * Reduces energy when hit and applies knockback and hurt state.
     */
    hit() {
        if (this.isHurt()) return;
        this.energy -= 15.5;
        if (this.energy < 0) return this.energy = 0;
        this.lastHit = Date.now();
        this.lastActionTime = Date.now();
        this.isHurtStatus = true;
        this.isKnockedBack = true;
        this.applyKnockback();
        setTimeout(() => {
            this.isKnockedBack = false;
            this.isHurtStatus = false;
        }, 800);
    }

    /**
     * Applies knockback movement based on direction.
     */
    applyKnockback() {
        const kb = 40;
        this.x += this.otherDirection ? kb : -kb;
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