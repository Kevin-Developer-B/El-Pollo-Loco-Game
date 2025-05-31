class Level {
    enemies;
    clouds;
    backgrounObject;
    coins;
    bottles;
    level_end_x = 2200;

    constructor(enemies, clouds, backgrounObject, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounObject = backgrounObject;
        this.coins = coins;
        this.bottles = bottle;
    }
}