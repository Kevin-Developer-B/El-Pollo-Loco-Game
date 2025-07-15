/**
 * Handles keyboard and mobile touch input states.
 * Tracks key presses for movement and actions.
 */
class Keyboard {

    /** @type {boolean} Left arrow key pressed */
    /** @type {boolean} Right arrow key pressed */
    /** @type {boolean} Up arrow key pressed */
    /** @type {boolean} Down arrow key pressed */
    /** @type {boolean} Escape key pressed */
    /** @type {boolean} 'B' key pressed */
    /** @type {boolean} 'L' key pressed */
    /** @type {boolean} Space key pressed (for mobile throw button) */
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    ESCAPE = false;
    B = false;
    L = false;

    /**
     * Creates a new Keyboard instance and initializes desktop key event listeners.
     */
    constructor() {
        this.DesktopKeyEvents();
    }

    /**
     * Sets up event listeners for desktop keyboard keydown and keyup events.
     * Updates key states accordingly, only if the game is active.
     */
    DesktopKeyEvents() {
        window.addEventListener("keydown", (e) => {
            if (!gameActive) return;
            if (e.keyCode == 27) {
                popUp();
            }

            if (e.keyCode == 37) {
                keyboard.LEFT = true;
            }

            if (e.keyCode == 38) {
                keyboard.UP = true;
            }

            if (e.keyCode == 39) {
                keyboard.RIGHT = true;
            }

            if (e.keyCode == 40) {
                keyboard.DOWN = true;
            }
            if (e.keyCode == 27) {
                keyboard.DOWN = true;
            }
             if (e.keyCode == 66) {
                keyboard.B = true;
            }
            if (e.keyCode == 76) {
                keyboard.L = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (!gameActive) return;
            if (e.keyCode == 27) {
                keyboard.ESCAPE = false;
            }

            if (e.keyCode == 37) {
                keyboard.LEFT = false;
            }

            if (e.keyCode == 38) {
                keyboard.UP = false;
            }

            if (e.keyCode == 39) {
                keyboard.RIGHT = false;
            }

            if (e.keyCode == 40) {
                keyboard.DOWN = false;
            }

            if (e.keyCode == 66) {
                keyboard.B = false;
            }

            if (e.keyCode == 76) {
                keyboard.L = false;
            }
        });
    }

    /**
     * Sets up touch event listeners for mobile controls.
     * Prevents default touch behavior and updates input states.
     */
    MobilePressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });

        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }

}

