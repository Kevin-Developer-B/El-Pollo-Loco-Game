class BottleBar extends DrawableObject {

   BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'

    ];

    bottle = 0;
    
    constructor() {
        super();
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 10;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentageBottle(0);
    }

    setPercentageBottle(bottle) {
        this.bottle = bottle;
        let path = this.BOTTLE_IMAGES[this.resolveBottleIndex()];
        this.img = this.imageCache[path];
    }

    resolveBottleIndex() {
        if (this.bottle == 5) {
            return 5;
        } else if (this.bottle >= 4) {
            return 4;
        } else if (this.bottle >= 3) {
            return 3;
        } else if (this.bottle >= 2) {
            return 2;
        } else if (this.bottle >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}