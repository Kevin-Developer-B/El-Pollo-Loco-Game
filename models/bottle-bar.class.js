/**
 * Represents the bottle status bar UI element showing bottle charge level.
 * Extends DrawableObject to handle image rendering and caching.
 */
class BottleBar extends DrawableObject {

    /** @type {string[]} Paths to bottle bar images representing charge levels */
   BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'

    ];

    /** @type {number} Current bottle charge level (0 to 5) */
    bottle = 0;
    
     /**
     * Initializes the bottle bar by loading images and setting default properties.
     */
    constructor() {
        super();
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 10;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentageBottle(0);
    }

    /**
     * Sets the current bottle charge level and updates the displayed image.
     * @param {number} bottle - The current bottle level (integer from 0 to 5).
     */
    setPercentageBottle(bottle) {
        this.bottle = bottle;
        let path = this.BOTTLE_IMAGES[this.resolveBottleIndex()];
        this.img = this.imageCache[path];
    }

     /**
     * Determines the correct index for the bottle image based on the current bottle level.
     * @returns {number} Index in BOTTLE_IMAGES corresponding to the current bottle level.
     */
    resolveBottleIndex() {
        if (this.bottle == 5) {
            return 5;
        } else if (this.bottle >= 4) {
            return 4;
        } else if (this.bottle >= 3) {
            return 3;
        } else if (this.bottle >= 2) {
            return 2;
        } else if (this.bottle >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}