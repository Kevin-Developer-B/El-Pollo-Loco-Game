class CoinBar extends DrawableObject {

    COIN_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    coins = 0;

    constructor() {
        super();
        this.loadImages(this.COIN_IMAGES);
        this.x = 10;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setPercentageCoin(0);
    }

    setPercentageCoin(coin) {
        this.coins = coin
        let path = this.COIN_IMAGES[this.resolveCoinIndex()];
        this.img = this.imageCache[path];
    }

    resolveCoinIndex() {
        if (this.coins == 100) {
            return 5;
        } else if (this.coins >= 80) {
            return 4;
        } else if (this.coins >= 60) {
            return 3;
        } else if (this.coins >= 40) {
            return 2;
        } else if (this.coins >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}