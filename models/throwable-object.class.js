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


    constructor(x, y, direction) {
        super().loadImage(this.THROW_ROTATION_BOTTLE[0]);
        this.loadImages(this.THROW_ROTATION_BOTTLE);
        this.loadImages(this.SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 80;
        this.width = 60;
        this.hasSplashed = false;
        this.markForRemoval = false;
        this.throw();
        this.bottleRotation();
        this.collisionDelay = 300;
        this.spawnTime = Date.now();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (!this.hasSplashed) {
                this.x += 15 * this.direction;;
                if (this.y >= 380 && this.speedY <= 0) {
                    this.splash();
                    clearInterval(this.throwInterval);
                }
            }
        }, 50);
    }

    bottleRotation() {
        this.rotationInterval = setInterval(() => {
            if (!this.hasSplashed) {
                this.playAnimation(this.THROW_ROTATION_BOTTLE);
                if (!gameMuted) {
                    sounds.bottle_rotate.volume = 0.1;
                    sounds.bottle_rotate.play();
                }
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
        clearInterval(this.throwInterval);

        this.currentImage = 0;
        let i = 0;
        this.splashInterval = setInterval(() => {
            if (i < this.SPLASH_BOTTLE.length) {
                sounds.bottle_shattering.play();
                this.img = this.imageCache[this.SPLASH_BOTTLE[i]];
                i++;
            } else {
                clearInterval(this.splashInterval);
                this.markForRemoval = true;
            }
        }, 80);
    }

    bossHitSplash() {
        if (this.hasSplashed) return;
        this.hasSplashed = true;

        this.speedY = 0;

        clearInterval(this.gravityInterval);
        clearInterval(this.rotationInterval);
        clearInterval(this.throwInterval);

        this.currentImage = 0;
        let i = 0;

        this.splashInterval = setInterval(() => {
            if (i < this.SPLASH_BOTTLE.length) {
                sounds.bottle_shattering.play();
                this.img = this.imageCache[this.SPLASH_BOTTLE[i]];
                i++;
            } else {
                clearInterval(this.splashInterval);
                this.markForRemoval = true;
            }
        }, 80);
    }
}