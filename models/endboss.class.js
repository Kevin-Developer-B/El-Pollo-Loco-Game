/**
 * Represents the Endboss enemy character.
 * Handles animations, movement, health, and interactions with the player character.
 * Extends MovableObject.
 */
class Endboss extends MovableObject {

    /** @type {number} Height of the boss sprite */
    /** @type {number} Width of the boss sprite */
    /** @type {number} Vertical position of the boss */
    /** @type {number} Current energy (health) of the boss */
    /** @type {boolean} Whether the boss is currently in hurt state */
    /** @type {boolean} Flag indicating if the boss had first contact with player */
    height = 400;
    width = 500;
    y = 40;
    energy = 100;
    isHurt = false;
    hadFirstContact = false;

    /** @type {string[]} Image paths for walking animation */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} Image paths for alert animation */
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

    /** @type {string[]} Image paths for attack animation */
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

    /** @type {string[]} Image paths for hurt animation */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} Image paths for dead animation */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Initializes the boss, loads images, sets starting position, and starts animation loop.
     */
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

    /**
     * Main animation loop for the boss, switching between animations based on state.
     */
    animation() {
        this.animationInterval = setInterval(() => {
            if (this.dead) return;
            if (this.energy <= 0)
                return this.playAnimation(this.IMAGES_DEAD);
            if (this.isHurt) return this.playAnimation(this.IMAGES_HURT);
            if (this.shouldTriggerFirstContact()) {
                this.hadFirstContact = true;
                return this.playAlertAnimation();
            }
            if (this.shouldChase()) {
                this.playAnimation(this.IMAGES_WALKING);
                this.startMoving();
            }
        }, 150);
    }

    /**
     * Determines if the boss should trigger the first contact alert animation.
     * @returns {boolean} True if player passed a certain position and first contact not yet made.
     */
    shouldTriggerFirstContact() {
        return world?.character?.x >= 2000 && !this.hadFirstContact;
    }

    /**
     * Determines if the boss should start chasing the player.
     * @returns {boolean} True if first contact happened and no alert or attack animation is playing.
     */
    shouldChase() {
        return this.hadFirstContact &&
            !this.alertAnimationPlaying &&
            !this.attackAnimationPlaying;
    }

    /**
     * Starts moving the boss leftwards at intervals.
     */
    startMoving() {
        this.movementInterval = setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 300);
    }

    /**
     * Plays the alert animation sequence, then triggers attack animation.
     */
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

    /**
     * Plays the attack animation sequence.
     * Plays boss alert sound once at start.
     */
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

    /**
     * Handles the boss taking damage, updating energy, triggering hurt or death states.
     * @param {number} damage - Amount of damage inflicted to the boss.
     */
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
                this.playAttackAnimation();
            }, 1000);
        }
    }

    /**
     * Marks the boss as dead and clears all intervals, starts death animation and shows win screen.
     */
    isDead() {
        this.dead = true;
        clearInterval(this.animationInterval);
        clearInterval(this.movementInterval);
        clearInterval(this.alertInterval);
        clearInterval(this.attackInterval);
        this.startDeathSequence();
        setTimeout(() =>
            showYouWinScreen()
        , 3000);
    }

    /**
     * Plays the boss death animation frames and triggers fall to ground after completion.
     */
    startDeathSequence() {
        let i = 0;
        const frames = this.IMAGES_DEAD.length;
        this.deathInterval = setInterval(() => {
            if (i < frames) {
                this.img = this.imageCache[this.IMAGES_DEAD[i++]];
            } else {
                clearInterval(this.deathInterval);
                this.fallToGround();
            }
        }, 300);
    }


}