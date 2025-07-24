/**
 * The main controllable character in the game.
 * Inherits from MovableObject and handles animations, movement, states (like jumping, hurt, dead, sleeping), and interactions.
 */
class Character extends MovableObject {

    /**
    * @type {number} The movement speed of the object. A higher value means faster movement.
     * @type {number} The vertical (Y-axis) position of the object on the canvas.
     * @type {number} The timestamp of the last action performed (e.g., attack or movement). Used to track cooldowns or idle behavior.
     * @type {boolean} Indicates whether the object is currently in a sleeping (idle) state.
     * @type {boolean} Flags whether the death animation has already been played to prevent repetition.
     */
    speed = 10;
    y = 80;
    lastActionTime = Date.now();
    isSleeping = false;
    hasPlayedDeathAnimation = false;

    /**
    * Array of image paths used for the character's normal idle animation.
    */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
    * Array of image paths used when the character is idle for an extended period (sleeping/long idle).
    */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    /**
    * Array of image paths used for the walking animation of the character.
    */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
    * Array of image paths used for the jumping animation of the character.
    */
    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    /**
    * Array of image paths used when the character dies.
    */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
    * Array of image paths used when the character is hurt.
    */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
    * Reference to the current game world instance.
    * Gives the character access to world properties like camera position, keyboard input, etc.
    */
    world;

    /**
    * Creates a new instance of the Character class.
    * Initializes the character with its default image, loads all animations,
    * applies gravity, starts animation loops, and sets up looping snore sound.
    */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        sounds.snoring.loop = true;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animation();
    }

    /**
    * Object defining the character's hitbox offset from its actual image size.
    * Useful for precise collision detection.
    */
    offset = {
        top: 130,
        bottom: 10,
        left: 30,
        right: 30
    }

    /**
    * Starts the character's animation loops including movement, idle, hurt, and jump.
    */
    animation() {
        this.handleMovementLoop();
        this.handleIdleAndHurtLoop();
        this.handleJumpAnimationLoop();
    }

    /**
    * Continuously checks for keyboard input to handle character movement and jumping.
    * Also updates the camera position based on character location.
    */
    handleMovementLoop() {
        setInterval(() => {
            if (this.isHurtStatus || this.isKnockedBack) return;
            const kb = this.world.keyboard;
            if (kb.RIGHT && this.x < this.world.level.level_end_x)
                this.moveRight();
            if (kb.LEFT && this.x > -600)
                this.moveLeftAndTurn();
            if (kb.UP && !this.isAboveGround())
                this.jumpUp();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
    * Moves the character to the left and sets the direction to "facing left".
    */
    moveLeftAndTurn() {
        this.moveLeft();
        this.otherDirection = true;
    }

    /**
    * Plays a single jump frame and triggers the jump mechanic.
    */
    jumpUp() {
        this.playAnimation([this.IMAGES_JUMP[2]]);
        this.jump();
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
        this.energy -= 12.5;
        if (this.energy < 0) return this.energy = 0;
        this.lastHit = Date.now();
        this.lastActionTime = Date.now();
        this.isHurtStatus = true;
        this.isKnockedBack = true;
        this.applyKnockback();
        setTimeout(() => {
            this.isKnockedBack = false;
            this.isHurtStatus = false;
        }, 700);
    }

    /**
     * Applies knockback movement based on direction.
     */
    applyKnockback() {
        const kb = 20;
        this.x += this.otherDirection ? kb : -kb;
    }

    /**
    * Continuously checks for idle, movement, hurt, or death states every 100ms.
    * Triggers corresponding animations and state transitions (e.g., sleep, wake).
    */
    handleIdleAndHurtLoop() {
        setInterval(() => {
            if (this.handleDeath() || this.handleHurt()) return;
            const kb = this.world.keyboard;
            if (kb.RIGHT || kb.LEFT || kb.UP || this.isHurtStatus) {
                this.lastActionTime = Date.now();
                if (this.isSleeping) this.wakeUp();
                this.walkAnimation();
                return;
            }
            this.handleIdleAndSleep();
        }, 100);
    }

    /**
    * Checks if the character is dead and, if not already triggered, starts the death animation.
    * @returns {boolean} True if character is dead, otherwise false.
    */
    handleDeath() {
        if (!this.isDead()) return false;
        if (!this.hasPlayedDeathAnimation) {
            this.hasPlayedDeathAnimation = true;
            this.playOnceAnimation();
        }
        return true;
    }

    /**
    * Checks if the character is hurt. Plays hurt animation and stops snoring.
    * @returns {boolean} True if character is hurt, otherwise false.
    */
    handleHurt() {
        if (!this.isHurt()) return false;
        this.stopSnoring();
        sounds.hurt.play();
        this.playAnimation(this.IMAGES_HURT);
        return true;
    }

    /**
    * Handles idle behavior and transition into sleep mode after 15 seconds of inactivity.
    * Plays idle or sleep animations depending on inactivity duration.
    */
    handleIdleAndSleep() {
        const idleTime = Date.now() - this.lastActionTime;
        const sleeping = idleTime > 5000;

        if (sleeping && !this.isSleeping) this.enterSleep();
        else if (!sleeping && this.isSleeping) this.wakeUp();

        const images = sleeping ? this.IMAGES_LONG_IDLE : this.IMAGES_IDLE;
        this.playAnimation(images);
    }

    /**
    * Puts the character into a sleeping state and starts snoring sound.
    */
    enterSleep() {
        this.isSleeping = true;
        this.currentImage = 0;
        if (this.world && gameActive && sounds.snoring.paused) {
            sounds.snoring.currentTime = 0;
            sounds.snoring.play();
        }
    }

    /**
    * Wakes the character from sleep state and stops the snoring sound.
    */
    wakeUp() {
        this.isSleeping = false;
        this.currentImage = 0;
        this.stopSnoring();
    }

    /**
    * Animates the character’s jump based on vertical speed.
    * Runs continuously every 100ms if the character is in the air.
    */
    handleJumpAnimationLoop() {
        setInterval(() => {
            if (this.isDead()) return;
            if (!this.isAboveGround()) return;
            this.playJumpFrame();
        }, 100);
    }

    /**
    * Plays a specific jump animation frame based on vertical speed.
    */
    playJumpFrame() {
        const s = this.speedY;
        const img = this.IMAGES_JUMP;
        if (s >= 16) this.playAnimation([img[3]]);
        else if (s >= 0) this.playAnimation([img[4]]);
        else if (s >= -6) this.playAnimation([img[5]]);
        else if (s >= -16) this.playAnimation([img[6]]);
        else if (s >= -20) this.playAnimation([img[7]]);
        else if (s >= -21) this.playAnimation([img[8]]);
        else this.playAnimation([img[0]]);
    }

    /**
    * Initiates the death sequence by applying gravity, disabling controls, and playing the death animation once.
    */
    playOnceAnimation() {
        this.speedY = 25;
        this.applyGravity();
        this.isKnockedBack = true;
        this.dead = true;
        this.startDeathAnimation();
    }

    /**
    * Plays the death animation frame by frame and then triggers the game over screen.
    */
    startDeathAnimation() {
        let i = 0;
        const frames = this.IMAGES_DEAD.length;
        this.deathInterval = setInterval(() => {
            if (i < frames) {
                this.img = this.imageCache[this.IMAGES_DEAD[i++]];
                this.fallToGround();
            } else {
                clearInterval(this.deathInterval);
                showGameOverScreen();
            }
        }, 200);
    }

    /**
    * Stops the snoring sound and resets its playback position.
    */
    stopSnoring() {
        if (sounds.snoring && !sounds.snoring.paused) {
            sounds.snoring.pause();
            sounds.snoring.currentTime = 0;
        }
    }
}