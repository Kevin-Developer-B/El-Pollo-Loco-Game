/**
 * Represents the health bar of the boss character.
 * Extends DrawableObject to display different health bar images based on boss energy.
 */
class BossBar extends DrawableObject {
    
    /**
     * Array of image paths representing boss health bar states from empty to full.
     * @type {string[]}
     */
    HEALTHBOSSBAR_IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    /**
     * Creates a new BossBar instance and initializes its properties and images.
     */
    constructor() {
        super();
        this.loadImages(this.HEALTHBOSSBAR_IMAGES);
        this.x = 500;
        this.y = 10;
        this.width = 200;
        this.height = 50;
        this.setPercentageBoss(100);
    }

    /**
     * Sets the boss health percentage and updates the displayed image accordingly.
     * @param {number} energy - Current boss health percentage (0-100).
     */
    setPercentageBoss(energy) {
        this.percentage = energy;
        let path = this.HEALTHBOSSBAR_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the health bar image to display based on current percentage.
     * @returns {number} Index of the appropriate image in HEALTHBOSSBAR_IMAGES.
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