class CoinObject extends DrawableObject {
    height = 80;
    width = 80;
    y = 150;
    x = 50;
    img;
    coins = 0;

    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]


    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 500 + Math.random() * 1000;
        this.animation();
    }

    animation() {
        setInterval(() => {
            this.playAnimation([this.COIN_IMAGES]);
        }, 2000);
    }
}