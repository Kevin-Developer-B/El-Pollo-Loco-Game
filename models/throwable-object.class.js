class ThrowableObject extends MovableObject {

    THROW_ROTATION_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y) {
        super().loadImage(this.THROW_ROTATION_BOTTLE[0]);
        this.loadImages(this.THROW_ROTATION_BOTTLE);
        this.loadImages(this.SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.hasSplashed = false;
        this.throw(100, 150);
        this.bottleRotation();
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();

        setInterval(() => {
            if (!this.hasSplashed) {
                this.x += 15;
                if (this.y > 300) {
                    this.splash();
                }
            }
        }, 50);
    }

    bottleRotation() {
        this.rotationInterval = setInterval(() => {
            if (!this.hasSplashed) {
                this.playAnimation(this.THROW_ROTATION_BOTTLE);
            }
        }, 100);
    }

    splash() {
        if (this.hasSplashed) return;
        this.hasSplashed = true;

        this.speedY = 0;
        this.y = 380;

        clearInterval(this.gravityInterval);
        clearInterval(this.rotationInterval);

        this.currentImage = 0;
        this.splashInterval = setInterval(() => {
            this.playAnimation(this.SPLASH_BOTTLE);
            clearInterval(this.splashInterval);
        }, 100);
    }

    bossHitSplash() {
        if (this.hasSplashed) return;
        this.hasSplashed = true;

        this.speedY = 0;
        this.currentImage = 0;

        setInterval(() => {
            this.playAnimation(this.SPLASH_BOTTLE);
        }, 100);
    }

}