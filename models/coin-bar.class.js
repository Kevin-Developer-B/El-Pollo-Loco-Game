/**
 * Represents the coin status bar UI element.
 * Displays coin collection progress with different images based on the coin percentage.
 * Extends DrawableObject.
 */
class CoinBar extends DrawableObject {

    /**
     * Array of image paths representing coin bar states from 0% to 100%.
     * @type {string[]}
     */
    COIN_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * @type {number} Current coin collection percentage (0-100).
     */
    coins = 0;

     /**
     * Initializes the coin bar, loads images, sets position and size, and initializes with 0% coins.
     */
    constructor() {
        super();
        this.loadImages(this.COIN_IMAGES);
        this.x = 10;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setPercentageCoin(0);
    }

    /**
     * Updates the coin percentage and changes the displayed image accordingly.
     * @param {number} coin - The current coin collection percentage (0-100).
     */
    setPercentageCoin(coin) {
        this.coins = coin
        let path = this.COIN_IMAGES[this.resolveCoinIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display based on the current coin percentage.
     * @returns {number} The index of the image in COIN_IMAGES array.
     */
    resolveCoinIndex() {
        if (this.coins == 100) {
            return 5;
        } else if (this.coins >= 80) {
            return 4;
        } else if (this.coins >= 60) {
            return 3;
        } else if (this.coins >= 40) {
            return 2;
        } else if (this.coins >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}