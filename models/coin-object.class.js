class CoinObject extends DrawableObject {
    height = 80;
    width = 80;
    y = 150;
    x = 50;
    img;
    coins = 0;


    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = 500 + Math.random() * 1000;
    }

}