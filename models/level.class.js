/**
 * Represents a game level with its objects.
 */
class Level {

    /** @type {Array} Array of enemy objects */
    /** @type {Array} Array of cloud objects */
    /** @type {Array} Array of background objects */
    /** @type {Array} Array of coin objects */
    /** @type {Array} Array of bottle objects */
    /** @type {number} X-coordinate where the level ends */
    enemies;
    clouds;
    backgrounObject;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Creates a Level instance.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} bottles - The bottles in the level.
     */
    constructor(enemies, clouds, backgrounObject, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounObject = backgrounObject;
        this.coins = coins;
        this.bottles = bottle;
    }
}