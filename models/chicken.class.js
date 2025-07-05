class Chicken extends MovableObject {
    y = 345;
    img;
    height = 70;
    width = 70;
    isHurt = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 650 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animation();
    }

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    animation() {
        this.moveLeftIntervall = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walkAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 300);
    };

    die() {
        clearInterval(this.moveLeftIntervall);
        clearInterval(this.walkAnimation);
        this.playAnimation(this.IMAGES_DEAD);
        sounds.dead_chicken.play();
        this.dead = true;
    }
}