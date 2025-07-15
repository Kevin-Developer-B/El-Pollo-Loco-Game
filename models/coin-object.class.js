/**
 * Represents a collectible coin object that can move and animate.
 * Extends MovableObject.
 */
class CoinObject extends MovableObject {
    /**

     * @type {number} The height of the coin object in pixels.
     * @type {number} The width of the coin object in pixels.
     * @type {number} The vertical position of the coin object.
     * @type {number} The horizontal position of the coin object.
     * @type {HTMLImageElement} The image currently displayed for the coin.
     * @type {number}The amount of coins this object represents.
     */
    height = 80;
    width = 80;
    y = 150;
    x = 50;
    img;
    coins = 0;

    /**
     * Array of image paths used to animate the coin.
     * @type {string[]}
     */
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    /**
     * Creates a new CoinObject, sets a random x position, loads images, and starts animation.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 500 + Math.random() * 1000;
        this.animation();
    }

    /**
     * Animates the coin by cycling through coin images every 500ms.
     */
    animation() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 500);
    }
}