class Endboss extends MovableObject {

    height = 500;
    width = 500;
    y = -25;
    energy = 100;
    isHurt = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animation();
    }

    animation() {
        this.animationInterval = setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else { 
                this.startMoving();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    };

    startMoving() {
        this.movementInterval = setInterval(() => {
            if (this.energy >= 0) {
                this.moveLeft();
            }
        }, 1000);
    }

    bossHit(damage) {
        if (this.energy > 0) {
            this.energy -= damage;
            this.isHurt = true;

            setTimeout(() => {
                this.isHurt = false;
            }, 1000);
        } else {
            this.isDead();
        }
    }

    isDead() {
        clearInterval(this.animationInterval);
        clearInterval(this.movementInterval);
        this.playAnimation(this.IMAGES_DEAD);
    }
}