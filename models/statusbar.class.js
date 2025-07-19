/**
 * Represents a status bar in the game UI (e.g., health, coin, bottle, or boss health).
 * Extends DrawableObject and manages loading, updating, and rendering
 * the correct image based on a percentage value.
 */
class StatusBar extends DrawableObject {

    /**
     * Array of health bar image paths representing health levels from 0% to 100%.
     * These images are used for the player's health status bar.
     * Indexed in 20% steps: [0%, 20%, 40%, 60%, 80%, 100%]
     * @type {string[]}
    */
    HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Array of bottle bar image paths showing the number of collected bottles.
     * Used to render the bottle status bar.
     * Indexed in 20% steps: [0%, 20%, 40%, 60%, 80%, 100%]
     * @type {string[]}
    */
    BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'

    ];

    /**
     * Array of coin bar image paths showing how many coins the player has collected.
     * Used for the coin status display.
     * Indexed in 20% steps: [0%, 20%, 40%, 60%, 80%, 100%]
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
     * Array of health bar images for the endboss character.
     * Indicates boss health from 0% to 100%.
     * Indexed in 20% steps: [0%, 20%, 40%, 60%, 80%, 100%]
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
     * Number of bottles the player has collected.
     * Used for internal logic and display in the bottle status bar.
     * @type {number}
     * Number of coins the player has collected.
     * Used for internal logic and display in the coin status bar.
     * @type {number}
     */
    bottle = 0;
    coins = 0;

    /**
     * Creates a new StatusBar instance based on the given type.
     * Loads the image set corresponding to the type and sets the initial percentage.
     * @param {string} type - The type of status bar ('health', 'coin', 'bottle', or 'boss').
     */
    constructor(type = 'health') {
        super();
        this.type = type;
        this.percentage = this.getInitialPercentage(type);
        const images = this.getImagesForType();
        this.loadImages(images);
        this.setPercentage(this.percentage);
    }

    /**
     * Updates the current percentage value and sets the appropriate image.
     * @param {number} value - The percentage (from 0 to 100) to represent the current status.
     */
    setPercentage(value) {
        this.percentage = value;
        let images = this.getImagesForType();
        let index = this.getImageIndex(value);
        let path = images[index];
        this.img = this.imageCache[path];
    }

    /**
    * Returns the list of images associated with the current status bar type.
    * @returns {string[]} - An array of image paths.
    */
    getImagesForType() {
        switch (this.type) {
            case 'health': return this.HEALTH_IMAGES;
            case 'coin': return this.COIN_IMAGES;
            case 'bottle': return this.BOTTLE_IMAGES;
            case 'boss': return this.HEALTHBOSSBAR_IMAGES;
            default: return this.HEALTH_IMAGES;
        }
    }

    /**
     * Returns the initial percentage value for the given type.
     * @param {string} type - The type of status bar.
     * @returns {number} - Initial percentage (100 for health-related, 0 for collectibles).
     */
    getInitialPercentage(type) {
        if (type === 'coin' || type === 'bottle') return 0;
        return 100;
    }

    /**
     * Maps a percentage value to an image index (0 to 5).
     * @param {number} percentage - The current status percentage.
     * @returns {number} - Index of the corresponding image.
     */
    getImageIndex(percentage) {
        if (percentage >= 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 20) return 1;
        return 0;
    }
}
