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
    throwableObject = [];
    coins = new CoinObject();
    bottle = new BottleObject();

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
            this.checkCollisions();
            this.checkCollectCoin();
            this.checkCollectBottle();
            this.checkThrowObject();
            this.checkThrowableBottleObject();
            this.checkEndbossHit();
        }, 200);
    }
    

    checkThrowObject() {
        if (this.keyboard.SPACE && this.bottleBar.bottle >= 1) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.bottleBar.bottle--;
            this.bottleBar.setPercentageBottle(this.bottleBar.bottle);
        }
    }

    checkThrowableBottleObject() {
        this.throwableObject.forEach((bottle, index) => {
            if (bottle.y > 350) {
                bottle.splash();
                setTimeout(() => {
                    this.throwableObject.splice(index, 1);
                }, 500);
            }
        })
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            };
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
        this.throwableObject.forEach((bottle) => {
            if (bottle.isColliding(this.level.enemies[4]) && !bottle.hasSplashed) {
                this.level.enemies[4].hit(40);
                bottle.bossHitSplash();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgrounObject);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.throwableObject);

        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);

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
}