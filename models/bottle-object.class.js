/**
 * Represents a collectible bottle object in the game world.
 * Inherits from MovableObject and is rendered on the ground at a randomized horizontal position.
 */
class BottleObject extends MovableObject {
    
    /** @type {number} Width of the bottle in pixels */
    /** @type {number} Height of the bottle in pixels */
    /** @type {number} Vertical position (Y-axis) of the bottle */
    /** @type {number} Horizontal position (X-axis) of the bottle */
    /** @type {HTMLImageElement} The image used to display the bottle */
    height = 80;
    width = 80;
    y = 350;
    x = 50;
    img;
    
    /**
     * An array of available bottle image paths.
     * The constructor selects one at random for each bottle instance.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    /**
     * Creates a new BottleObject with a random image and a randomized X position.
     * Loads the corresponding image and initializes the bottle's appearance.
     */
    constructor() {
        super().loadImage(this.BOTTLE_IMAGES[Math.floor(Math.random() * this.BOTTLE_IMAGES.length)]);
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 500 + Math.random() * 1000;
    }

    /**
     * Defines the offset values used for collision detection.
     */
    offset = {
        top: 20,
        bottom: 10,
        left: 25,
        right: 25
    }
}