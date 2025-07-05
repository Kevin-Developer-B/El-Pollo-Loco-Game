class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    isKnockedBack = false;
    isHurtStatus = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    groundLevel = 415;

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (!this.hasSplash && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y + this.height < this.groundLevel;
        }
    }

    isColliding(mo) {
        if (!mo) return false;
        return this.x + this.width - this.offset.right > mo.x + this.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.width + mo.x - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

    }

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    isJumpingOn(enemy) {
        const isAbove = this.y + this.height <= enemy.y + 20;
        const isFalling = this.speedY < 0;
        return isAbove && isFalling;
    }

    hit() {
        if (this.isHurt()) return;
        this.energy -= 15.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.lastActionTime = Date.now();
            this.isHurtStatus = true;
            this.isKnockedBack = true;

            const knockbackDistance = 40;
            if (this.otherDirection) {
                this.x += knockbackDistance;
            } else {
                this.x -= knockbackDistance;
            }

            setTimeout(() => {
                this.isKnockedBack = false;
                this.isHurtStatus = false;
            }, 800);
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        const dead = this.energy == 0;
        if (dead)
            return dead;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        if (!this.isKnockedBack && !this.isHurtStatus) {
            this.x -= this.speed;
            this.otherDirection = false;
        }
    }

    moveRight() {
        if (!this.isKnockedBack && !this.isHurtStatus) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    jump() {
        this.speedY = 15;
        this.wantsToJump = false;
        sounds.jump.play();
    }

    littleJump() {
        if (this.dead) return;
        this.speedY = 8;
        this.wantsToJump = false;
    }

    walkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        sounds.walk.play();
    }

    fallToGround() {
        const groundY = 500;
        const fallSpeed = 5;

        this.fallInterval = setInterval(() => {
            if (this.y < groundY) {
                this.y += fallSpeed;
            } else {
                clearInterval(this.fallInterval);
                this.y = groundY;
            }
        }, 30);
    }
}