/**
 * Represents a background layer object in the game.
 * Extends MovableObject to enable movement (e.g., parallax scrolling).
 */
class BackgroundObject extends MovableObject {
    
    /** @type {number} Width of the background image in pixels */
    /** @type {number} Height of the background image in pixels */
    width = 720;
    height = 480;
    
    /**
     * Creates a background object with the specified image and horizontal position.
     * @param {string} imagePath - Path to the background image file.
     * @param {number} x - Initial x-position of the background object.
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}