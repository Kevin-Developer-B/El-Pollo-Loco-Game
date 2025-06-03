class Endboss extends MovableObject {

    height = 500;
    width = 500;
    y = -25;
    energy = 100;
    isHurt = false;

    IMAGES_WALKING = [
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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2500;
        this.animation();
    }

    animation() {
        setInterval(() => {
            if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    };

    // hit(damage) {
    //     if (this.energy > 0) {
    //         this.energy -= damage;
    //         this.isHurt = true;

    //         setTimeout(() => {
    //             this.isHurt = false;
    //         }, 400); // kurzzeitig "Hurt"-Animation zeigen
    //     }
    // }

    // isDead() {
    //     return this.energy <= 0;
    // }
}