/**
 * Represents a chicken enemy in the game.
 * Chickens move left across the screen and can die when hit.
 * Inherits from MovableObject.
 */
class Chicken extends MovableObject {

    /**
    * @type {number} The Y of the chicken in pixels.
    * @type {HTMLImageElement | undefined} The current image displayed for the chicken (used for animations).
    * @type {number} The height of the chicken in pixels.
    * @type {number} The width of the chicken in pixels.
    * @type {boolean} Indicates whether the chicken is in a hurt state.
    */
    y = 345;
    img;
    height = 70;
    width = 70;
    isHurt = false;

    /**
     * Array of image paths used for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array of image paths used when the chicken dies.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Array of image paths used when the chicken dies.
     * @type {string[]}
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 650 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animation();
    }

    /**
     * Defines the offset values used for collision detection.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
     * Starts the chicken's walking and movement animations.
     * Chickens continuously move left and cycle through walking frames.
     */
    animation() {
        this.moveLeftIntervall = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walkAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 300);
    };

    /**
     * Stops the chicken's movement and walking animation.
     * Plays the dead image and sound, and marks the chicken as dead.
     */
    die() {
        clearInterval(this.moveLeftIntervall);
        clearInterval(this.walkAnimation);
        this.playAnimation(this.IMAGES_DEAD);
        sounds.dead_chicken.play();
        this.dead = true;
    }
}