class BottleObject extends MovableObject {
    
    height = 80;
    width = 80;
    y = 350;
    x = 50;
    img;
    

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        super().loadImage(this.BOTTLE_IMAGES[Math.floor(Math.random() * this.BOTTLE_IMAGES.length)]);
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 500 + Math.random() * 1000;
    }

    
}