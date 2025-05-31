class BottleObject extends DrawableObject {
    height = 80;
    width = 80;
    y = 350;
    x = 50;
    img;
    bottle = 0;


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 500 + Math.random() * 1000;
    }

}