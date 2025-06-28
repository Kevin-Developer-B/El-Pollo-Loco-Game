class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
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
        return this.x < mo.x + mo.width &&
            this.x + this.width > mo.x &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
    }

    isJumpingOn(enemy) {
        const isAbove = this.y + this.height <= enemy.y + 20;
        const isFalling = this.speedY < 0;
        return isAbove && isFalling;
    }

    hit() {
        if (this.isHurt()) return;
        this.energy -= 20.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            const knockbackDistance = 40;
            if (this.otherDirection) {
                this.x += knockbackDistance;
            } else {
                this.x -= knockbackDistance;
            }
            this.isKnockedBack = true;
            setTimeout(() => {
                this.isKnockedBack = false;
            }, 300);
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
        if (!this.isKnockedBack) {
            this.x -= this.speed;
            this.otherDirection = false;
        }
    }

    moveRight() {
        if (!this.isKnockedBack) {
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