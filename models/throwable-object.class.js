
/**
 * Represents a throwable bottle object that can be thrown, rotate in the air, and splash on impact.
 * Extends MovableObject to inherit movement and gravity behavior.
 */
class ThrowableObject extends MovableObject {

    /**
    * Array of image paths used for the bottle rotation animation during flight.
    * @type {string[]}
    */
    THROW_ROTATION_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
    * Array of image paths used for the bottle splash animation upon impact.
    * @type {string[]}
    */
    SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates a throwable bottle at a specific position and direction.
     * @param {number} x - The initial x position.
     * @param {number} y - The initial y position.
     * @param {number} direction - The throw direction (1 for right, -1 for left).
     */
    constructor(x, y, direction) {
        super().loadImage(this.THROW_ROTATION_BOTTLE[0]);
        this.loadImages(this.THROW_ROTATION_BOTTLE);
        this.loadImages(this.SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 80;
        this.width = 60;
        this.hasSplashed = false;
        this.markForRemoval = false;
        this.throw();
        this.bottleRotation();
        this.collisionDelay = 300;
        this.spawnTime = Date.now();
    }

    /**
     * Starts the throwing motion by setting vertical speed and horizontal movement.
     * Applies gravity and checks for splash upon ground contact.
     */
    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (!this.hasSplashed) {
                this.x += 15 * this.direction;;
                if (this.y >= 380 && this.speedY <= 0) {
                    this.splash();
                    clearInterval(this.throwInterval);
                }
            }
        }, 50);
    }

    /**
     * Animates the bottle rotation while it is in flight.
     * Plays rotation sound unless the game is muted.
     */
    bottleRotation() {
        this.rotationInterval = setInterval(() => {
            if (!this.hasSplashed) {
                this.playAnimation(this.THROW_ROTATION_BOTTLE);
                if (!gameMuted) {
                    sounds.bottle_rotate.volume = 0.1;
                    sounds.bottle_rotate.play();
                }
            }
        }, 100);
    }

    /**
     * Handles the splash animation and sound when the bottle hits the ground.
     * Marks the bottle for removal after the splash animation finishes.
     */
    splash() {
        if (this.hasSplashed) return;
        this.hasSplashed = true; this.speedY = 0; this.y = 380;
        this.clearSplashIntervals();
        this.currentImage = 0;
        let i = 0;
        this.splashInterval = setInterval(() => {
            if (i < this.SPLASH_BOTTLE.length) {
                sounds.bottle_shattering.play();
                this.img = this.imageCache[this.SPLASH_BOTTLE[i++]];
            } else {
                clearInterval(this.splashInterval);
                this.markForRemoval = true;
            }
        }, 80);
    }

    /**
     * Similar to splash but used specifically when hitting the boss.
     * Plays splash animation and marks the bottle for removal.
     */
    bossHitSplash() {
        if (this.hasSplashed) return;
        this.hasSplashed = true; this.speedY = 0;
        this.clearSplashIntervals();
        this.currentImage = 0;
        let i = 0;
        this.splashInterval = setInterval(() => {
            if (i < this.SPLASH_BOTTLE.length) {
                sounds.bottle_shattering.play();
                this.img = this.imageCache[this.SPLASH_BOTTLE[i++]];
            } else {
                clearInterval(this.splashInterval);
                this.markForRemoval = true;
            }
        }, 80);
    }

    /**
     * Clears all intervals related to gravity, rotation, and throwing motion.
     */
    clearSplashIntervals() {
        clearInterval(this.gravityInterval);
        clearInterval(this.rotationInterval);
        clearInterval(this.throwInterval);
    }
}