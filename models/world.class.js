class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    sounds;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    bossBar = new BossBar();
    throwableObject = [];
    coins = new CoinObject();
    bottle = new BottleObject();
    chicken = new Chicken();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    };

    run() {
        setInterval(() => {
            this.checkEnemyInteractions();
            this.checkChickenHitByBottle();
            this.checkCollectCoin();
            this.checkCollectBottle();
            this.checkThrowObject();
            this.checkThrowableBottleObject();
            this.checkEndbossHit();
        }, 100);
    }


    checkThrowObject() {
        const endboss = this.getEndboss();
        const canThrow =
            this.keyboard.SPACE &&
            this.bottleBar.bottle >= 1 &&
            (!endboss || (!endboss.alertAnimationPlaying && !endboss.attackAnimationPlaying));

        if (canThrow) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            sounds.throw.play();
            this.throwableObject.push(bottle);
            this.bottleBar.bottle--;
            this.bottleBar.setPercentageBottle(this.bottleBar.bottle);
        }
    }

    checkThrowableBottleObject() {
        for (let i = this.throwableObject.length - 1; i >= 0; i--) {
            const bottle = this.throwableObject[i];
            if (bottle.markForRemoval) {
                this.throwableObject.splice(i, 1);
            }
        }
    }

    checkEnemyInteractions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isJumpingOn(enemy) && !enemy.dead) {
                    enemy.die();
                    setTimeout(() => {
                        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                    }, 1000)
                }
                else if (!enemy.dead) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkChickenHitByBottle() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (
                    enemy instanceof Chicken &&
                    !enemy.dead &&
                    bottle.isColliding(enemy) &&
                    !bottle.hasSplashed
                ) {
                    enemy.die();
                    bottle.splash();

                    setTimeout(() => {
                        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                    }, 500);
                }
            });
        });
    }

    checkCollectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.coins += 20;
                this.coinBar.setPercentageCoin(this.coinBar.coins);

                this.level.coins.splice(index, 1);
            };
        });
    }

    checkCollectBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottleBar.bottle++;
                this.bottleBar.setPercentageBottle(this.bottleBar.bottle);
                this.level.bottles.splice(index, 1);
            };
        });
    }

    checkEndbossHit() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;

        this.throwableObject.forEach((bottle) => {
            if (
                !bottle.hasSplashed &&
                bottle.isColliding(endboss)
            ) {
                endboss.bossHit(25);
                this.bossBar.setPercentageBoss(endboss.energy);
                bottle.splash();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgrounObject);

        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.throwableObject);

        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.character.x > 2000) {
            this.addToMap(this.bossBar);
        }
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    getEndboss() {
        return this.level.enemies.find(e => e instanceof Endboss);
    }
}