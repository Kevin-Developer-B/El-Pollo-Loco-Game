class Endboss extends MovableObject {

    height = 500;
    width = 500;
    y = -25;
    energy = 100;
    isHurt = false;
    hadFirstContact = false;

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
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
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
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animation();
    }

    animation() {
        this.animationInterval = setInterval(() => {
            if (this.dead) return; 
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (world.character.x > 2000 && !this.hadFirstContact) {
                this.hadFirstContact = true
                this.playAlertAnimation();
            }
            else if (this.hadFirstContact && !this.alertAnimationPlaying && !this.attackAnimationPlaying) {
                this.playAnimation(this.IMAGES_WALKING);
                this.startMoving();
            }

        }, 150);
    };

    startMoving() {
        this.movementInterval = setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1500);
    }

    playAlertAnimation() {
        this.alertAnimationPlaying = true;
        this.currentImage = 0;
        let i = 0;
        this.alertInterval = setInterval(() => {
            if (i < this.IMAGES_ALERT.length) {
                this.img = this.imageCache[this.IMAGES_ALERT[i]];
                i++;
            } else {
                clearInterval(this.alertInterval);
                this.alertAnimationPlaying = false;
                this.playAttackAnimation();
            }
        }, 150);
    }

    playAttackAnimation() {
        this.attackAnimationPlaying = true;
        sounds.boss_alert.play();
        this.currentImage = 0;

        let i = 0;
        this.attackInterval = setInterval(() => {
            if (i < this.IMAGES_ATTACK.length) {
                this.img = this.imageCache[this.IMAGES_ATTACK[i]];
                i++;
            } else {
                clearInterval(this.attackInterval);
                this.attackAnimationPlaying = false;
            }
        }, 120);
    }

    bossHit(damage) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead();
        } else {
            this.isHurt = true;
            clearInterval(this.movementInterval);
            sounds.chicken_sound.play();
            setTimeout(() => {
                this.isHurt = false;
            }, 1000);
        }
    }

    isDead() {
        this.dead = true;
        clearInterval(this.animationInterval);
        clearInterval(this.movementInterval);
        clearInterval(this.alertInterval);
        clearInterval(this.attackInterval);

        let i = 0;
        const deathFrames = this.IMAGES_DEAD.length;
        this.deathInterval = setInterval(() => {
            if (i < deathFrames) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
            } else {
                clearInterval(this.deathInterval);
                this.fallToGround();
            }
        }, 300);
    }

}