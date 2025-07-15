
/**
 * Represents the game world including character, level, and all interactions.
 */
class World {

    /**
     * @type {Character} The main character of the game.
     * @type {Level} Current level object.
     * @type {HTMLCanvasElement} Canvas element for rendering.
     * @type {CanvasRenderingContext2D} 2D rendering context of the canvas.
     * @type {Keyboard} Keyboard input handler.
     * @type {Object.<string, HTMLAudioElement>} Object holding sound effects.
     * @type {number} Horizontal camera offset.
     * @type {HealthBar} UI element showing character's health.
     * @type {CoinBar} UI element showing collected coins.
     * @type {BottleBar} UI element showing collected bottles.
     * @type {BossBar} UI element showing boss health.
     * @type {ThrowableObject[]} Array of throwable objects currently active.
     * @type {CoinObject} Sample coin object.
     * @type {BottleObject} Sample bottle object.
     * @type {Chicken} Chicken enemy instance.
     * @type {number} Interval ID for game logic loop.
     * @type {number} Animation frame ID for rendering loop.
     * @type {boolean} Flag indicating whether the game is running.
     */
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
    intervalId;
    animationFrameId;
    running = true;

    /**
     * Initializes the World instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference in the character object.
     */
    setWorld() {
        this.character.world = this;
    };

    /**
     * Starts the game loop interval for interactions and logic.
     */
    run() {
        this.intervalId = setInterval(() => {
            this.checkEnemyInteractions();
            this.checkChickenHitByBottle();
            this.checkCollectCoin();
            this.checkCollectBottle();
            this.checkThrowObject();
            this.checkThrowableBottleObject();
            this.checkEndbossHit();
        }, 100);
    }

    /**
    * Checks if the player can throw a bottle and creates a new ThrowableObject if possible.
    */
    checkThrowObject() {
        const endboss = this.getEndboss();
        const canThrow =
            this.keyboard.B &&
            this.bottleBar.bottle >= 1 &&
            (!endboss || (!endboss.alertAnimationPlaying && !endboss.attackAnimationPlaying));
        if (canThrow) {
            let direction = this.character.otherDirection ? -1 : 1;
            let offsetX = direction * 50;
            let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 90, direction);
            sounds.throw.play();
            this.throwableObject.push(bottle);
            this.bottleBar.bottle--;
            this.bottleBar.setPercentageBottle(this.bottleBar.bottle);
        }
    }

    /**
    * Removes throwable bottles marked for removal from the throwableObject array.
    */
    checkThrowableBottleObject() {
        for (let i = this.throwableObject.length - 1; i >= 0; i--) {
            const bottle = this.throwableObject[i];
            if (bottle.markForRemoval) {
                this.throwableObject.splice(i, 1);
            }
        }
    }

    /**
    * Checks for collisions between the character and enemies, handling hits or kills accordingly.
    */
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

    /**
    * Checks if a bottle collides with a valid chicken enemy and handles the collision.
    * @param {ThrowableObject} bottle - The thrown bottle object.
    */
    checkEnemiesCollision(bottle) {
        this.level.enemies.forEach(enemy => {
            if (this.isValidChicken(enemy) && bottle.isColliding(enemy) && !bottle.hasSplashed) {
                enemy.die();
                bottle.splash();
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 500);
            }
        });
    }

    /**
    * Checks if any thrown bottle hits a chicken enemy.
    */
    checkChickenHitByBottle() {
        this.throwableObject.forEach(bottle => {
            if (this.isBottleCollidable(bottle)) this.checkEnemiesCollision(bottle);
        });
    }

    /**
    * Checks if a bottle is old enough to be collidable.
    * @param {ThrowableObject} bottle - The thrown bottle.
    * @returns {boolean} True if the bottle can collide with enemies.
    */
    isBottleCollidable(bottle) {
        return Date.now() - bottle.spawnTime >= bottle.collisionDelay;
    }

    /**
    * Checks if an enemy is a valid chicken and not dead.
    * @param {Enemy} enemy - The enemy object.
    * @returns {boolean} True if enemy is a living chicken.
    */
    isValidChicken(enemy) {
        return (enemy instanceof Chicken || enemy instanceof YellowChicken) && !enemy.dead;
    }

    /**
    * Checks if the character collects a coin and updates the coin bar.
    */
    checkCollectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.coins += 20;
                this.coinBar.setPercentageCoin(this.coinBar.coins);
                sounds.coin.play();
                this.level.coins.splice(index, 1);
            };
        });
    }

    /**
    * Checks if the character collects a bottle and updates the bottle bar.
    */
    checkCollectBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (
                this.character.isColliding(bottle) &&
                this.bottleBar.bottle < 5
            ) {
                this.bottleBar.bottle++;
                this.bottleBar.setPercentageBottle(this.bottleBar.bottle);
                this.level.bottles.splice(index, 1);
                sounds.bottle_clanging.play();
            }
        });
    }

    /**
    * Checks if a thrown bottle hits the endboss and applies damage and splash effects.
    */
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
                bottle.bossHitSplash();
            }
        });
    }

    /**
    * Main draw loop of the game world. Clears the canvas, renders background, game objects, UI, and schedules the next frame.
    */
    draw() {
        if (!this.running) return;
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawBackgroundObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawUI();
        this.loopDraw();
    }

    /**
    * Clears the entire canvas.
    */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
    * Draws all game background and dynamic objects (character, enemies, coins, etc.).
    */
    drawBackgroundObjects() {
        this.addObjectToMap(this.level.backgrounObject);
        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.throwableObject);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
    }

    /**
    * Draws the user interface elements (health bar, coin bar, bottle bar, boss bar).
    */
    drawUI() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
    }

    /**
    * Recursively schedules the next frame for rendering using requestAnimationFrame.
    */
    loopDraw() {
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }

    /**
    * Adds an array of drawable objects to the canvas.
    * @param {DrawableObject[]} objects - An array of drawable objects (e.g., clouds, enemies).
    */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
    * Draws a single drawable object to the canvas with optional image flipping based on direction.
    * @param {DrawableObject} mo - A drawable game object.
    */
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

    /**
    * Flips the image horizontally before drawing (for characters/enemies facing left).
    * @param {DrawableObject} mo - The object to flip.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the original orientation after drawing a flipped object.
    * @param {DrawableObject} mo - The object to flip back.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
    * Retrieves the Endboss instance from the level enemies.
    * @returns {Endboss | undefined} The Endboss object if found, otherwise undefined.
    */
    getEndboss() {
        return this.level.enemies.find(e => e instanceof Endboss);
    }

    /**
    * Stops the game loop, clears intervals and animations, and stops all sounds.
    */
    stop() {
        this.running = false;

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        Object.values(sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}