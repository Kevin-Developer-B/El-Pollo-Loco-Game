class Level {
    enemies;
    clouds;
    backgrounObject;
    level_end_x = 2200;

    constructor(enemies, clouds, backgrounObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounObject = backgrounObject;
    }
}