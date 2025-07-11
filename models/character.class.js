class Character extends MovableObject {
    speed = 10;
    y = 80;
    lastActionTime = Date.now();
    isSleeping = false;
    hasPlayedDeathAnimation = false;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        sounds.snoring.loop = true;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animation();
    }

    offset = {
        top: 100,
        bottom: 0,
        left: 20,
        right: 20
    }

    animation() {

        setInterval(() => {
            if (!this.isHurtStatus && !this.isKnockedBack) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                }

                if (this.world.keyboard.LEFT && this.x > -600) {
                    this.moveLeft();
                    this.otherDirection = true;
                }

                if (this.world.keyboard.UP && !this.isAboveGround()) {
                    this.playAnimation([this.IMAGES_JUMP[2]]);
                    this.jump();
                }
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                if (!this.hasPlayedDeathAnimation) {
                    this.hasPlayedDeathAnimation = true;
                    this.playOnceAnimation();
                }
                return;
            }
            if (this.isHurt()) {
                this.stopSnoring();
                sounds.hurt.play();
                this.playAnimation(this.IMAGES_HURT);
                return;
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.isHurtStatus) {
                this.lastActionTime = Date.now();

                if (this.isSleeping) {
                    this.isSleeping = false;
                    this.currentImage = 0;
                    this.stopSnoring();
                }
                this.walkAnimation();
                return;
            }
            const idleTime = Date.now() - this.lastActionTime;
            if (idleTime > 15000) {
                if (!this.isSleeping) {
                    this.isSleeping = true;
                    this.currentImage = 0;

                    if (this.world && gameActive && sounds.snoring.paused) {
                        sounds.snoring.currentTime = 0;
                        sounds.snoring.play();
                    }
                }

                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                if (this.isSleeping) {
                    this.isSleeping = false;
                    this.currentImage = 0;
                    this.stopSnoring();
                }

                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100);

        setInterval(() => {
            if (this.isDead()) return;
            if (this.isAboveGround()) {
                if (this.speedY >= 16) {
                    this.playAnimation([this.IMAGES_JUMP[3]]);
                }
                else if (this.speedY >= 0) {
                    this.playAnimation([this.IMAGES_JUMP[4]]);
                }
                else if (this.speedY >= -6) {
                    this.playAnimation([this.IMAGES_JUMP[5]]);
                }
                else if (this.speedY >= -16) {
                    this.playAnimation([this.IMAGES_JUMP[6]]);
                }
                else if (this.speedY >= -20) {
                    this.playAnimation([this.IMAGES_JUMP[7]]);
                }
                else if (this.speedY >= -21) {
                    this.playAnimation([this.IMAGES_JUMP[8]]);
                }
                else {
                    this.playAnimation([this.IMAGES_JUMP[0]]);
                }
            }
        }, 100);
    };

    playOnceAnimation() {
        this.speedY = 25;
        this.applyGravity;
        this.isKnockedBack = true;
        this.dead = true;
        let i = 0;
        const deathFrames = this.IMAGES_DEAD.length;
        this.deathInterval = setInterval(() => {

            if (i < deathFrames) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
                this.fallToGround();
            }
            else {
                clearInterval(this.deathInterval);
                showGameOverScreen();
            }
        }, 200);
    }

    stopSnoring() {
        if (sounds.snoring && !sounds.snoring.paused) {
            sounds.snoring.pause();
            sounds.snoring.currentTime = 0;
        }
    }
}