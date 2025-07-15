/**
 * Represents a health bar UI element.
 * Displays health status as an image based on percentage.
 * Extends DrawableObject.
 */
class HealthBar extends DrawableObject {

    /** @type {string[]} Paths to health bar images representing different health levels */
    HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /** @type {number} Current health percentage (0-100) */
    percentage = 100;
    
     /**
     * Creates a new HealthBar instance.
     * Loads health images and sets default position and size.
     */
    constructor() {
        super();
        this.loadImages(this.HEALTH_IMAGES);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }    

    /**
     * Updates the health bar image according to the current health percentage.
     * @param {number} percentage - The current health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the health image based on the current percentage.
     * @returns {number} Index in HEALTH_IMAGES corresponding to the current health level.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}