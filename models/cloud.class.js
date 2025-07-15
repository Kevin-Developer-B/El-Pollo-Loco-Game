/**
 * Represents a cloud object that moves slowly across the screen.
 * Inherits from MovableObject.
 */
class Cloud extends MovableObject {

    /**
     * @type {number} The vertical position (y-axis) of the cloud on the canvas.
     * @type {number} The width of the cloud image in pixels.
     * @type {number} The height of the cloud image in pixels.
     */
    y = 0;
    width = 450;
    height = 300;

    /**
     * Creates a new cloud instance with a random horizontal position and speed.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 2500;
        this.y = Math.random() * 0;
        this.speed = 0.05 + Math.random() * 0.1;
        this.cloudAnimation();
    }

    /**
     * Starts the animation loop that moves the cloud slowly to the left.
     */
    cloudAnimation() {
        setInterval(() => {
            this.moveLeft();
        }, 20);
    }
}