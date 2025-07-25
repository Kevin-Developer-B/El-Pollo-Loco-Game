/**
 * Represents a small yellow chicken enemy in the game.
 * Inherits from MovableObject and handles walking, jumping, and dying animations.
 */
class YellowChicken extends MovableObject {

    /**
     * @type {number} The vertical position of the YellowChicken on the canvas.
     * @type {HTMLImageElement|undefined} The current image of the YellowChicken (used for rendering).
     * @type {number} The height of the YellowChicken in pixels.
     * @type {number} The width of the YellowChicken in pixels.
     * @type {boolean} Indicates whether the YellowChicken is currently hurt.
     */
    y = 345;
    img;
    height = 70;
    width = 70;
    isHurt = false;

    /**
     * Paths to the walking animation frames.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Path to the dead sprite.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a new YellowChicken with random position and speed.
     * Initializes its animations and gravity.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 650 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.applyGravity();
        this.animation();
    }

    /**
     * Defines the offset values used for collision detection.
     */
    offset = {
        top: -15,
        bottom: 10,
        left: -2,
        right: -2
    }

    /**
     * Starts the walking, jumping, and animation intervals for the chicken.
     * - Moves left continuously.
     * - Plays walking animation.
     * - Occasionally performs a small jump.
     */
    animation() {
        this.moveLeftIntervall = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.walkAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 300);
        setInterval(() => {
            if (Math.random() < 0.10) { 
                this.littleJump();
            }
        }, 200);
    };

    /**
     * Triggers the death animation and sound, and stops movement.
     * Marks the chicken as dead.
     */
    die() {
        clearInterval(this.moveLeftIntervall);
        clearInterval(this.walkAnimation);
        this.playAnimation(this.IMAGES_DEAD);
        sounds.dead_chicken.play();
        this.dead = true;
    }
}