/**
 * Base class for drawable objects with position, size, and image handling.
 */
class DrawableObject {

    /** 
     * @type {number} Horizontal position of the object.
     * @type {number} Vertical position of the object.
     * @type {number} Height of the object in pixels.
     * @type {number} Width of the object in pixels.
     * @type {HTMLImageElement} The current image displayed by the object.
     * @type {Object.<string, HTMLImageElement>} Keys are image paths, values are HTMLImageElement objects. Cache for loaded images to improve performance.
     * @type {number} Index of the current image in animation sequences.
     */
    imageCache = {};
    img;
    width = 150;
    height = 250;
    y = 280;
    x = 120;
    currentImage = 0;

    /**
     * Loads an image from the given path and sets it as the current image.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image on the provided canvas rendering context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Optionally draws a transparent frame around the object for debugging,
     * but only if the object is an instance of specific subclasses.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof YellowChicken || this instanceof CoinObject || this instanceof BottleObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            const collisionX = this.x + this.offset.left;
            const collisionY = this.y + this.offset.top;
            const collisionWidth = this.width - this.offset.left - this.offset.right;
            const collisionHeight = this.height - this.offset.top - this.offset.bottom;

            ctx.beginPath();
            ctx.lineWidth = 0;
            ctx.strokeStyle = 'transparent';
            ctx.rect(collisionX, collisionY, collisionWidth, collisionHeight);
            ctx.stroke();
        }
    }

    /**
     * Preloads an array of images into the image cache.
     * @param {string[]} arr - Array of image file paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}