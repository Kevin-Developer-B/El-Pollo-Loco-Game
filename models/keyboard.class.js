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
    * A mapping between key codes and logical keyboard actions.
    * Used to translate physical key presses into game input states. 
    * Key codes:
    * - 27: ESCAPE
    * - 37: LEFT arrow
    * - 38: UP arrow
    * - 39: RIGHT arrow
    * - 40: DOWN arrow
    * - 66: B key
    * - 76: L key
    */
    keyMap = {
        27: 'ESCAPE',
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN',
        66: 'B',
        76: 'L'
    };

    /**
    * Handles keyboard input events and updates the keyboard state accordingly.
    * Triggers popup if ESCAPE key is pressed.
    * @param {KeyboardEvent} e - The keyboard event triggered by user input.
    * @param {boolean} state - True for keydown, false for keyup.
    */
    handleKey(e, state) {
        if (!gameActive) return;
        if (e.keyCode === 27 && state) popUp();
        const key = this.keyMap[e.keyCode];
        if (key) keyboard[key] = state;
    }

    /**
    * Initializes key event listeners for desktop keyboard input.
    * Registers handlers for keydown and keyup events.
    */
    DesktopKeyEvents() {
        window.addEventListener("keydown", e => this.handleKey(e, true));
        window.addEventListener("keyup", e => this.handleKey(e, false));
    }

    /**
     * Sets up touch event listeners for mobile controls.
     * Prevents default touch behavior and updates input states.
     */
    MobilePressEvents() {
        this.moveLeft();
        this.moveRight();
        this.moveJump()
        this.moveThrow();
    }

    /**
    * Enables left movement by setting the `LEFT` flag to true when the
    * left button is touched, and resetting it to false when the touch ends.
    * Prevents default touch behavior to avoid unintended browser interactions.
    */
    moveLeft() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }

    /**
    * Enables right movement by setting the `RIGHT` flag to true when the
    * right button is touched, and resetting it to false when the touch ends.
    * Prevents default touch behavior to avoid unintended browser interactions.
    */
    moveRight() {
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }

    /**
    * Enables jumping by setting the `UP` flag to true when the jump button is touched,
    * and resetting it to false when the touch ends.
    * Prevents default touch behavior to avoid unintended browser interactions.
    */
    moveJump() {
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });
    }

    /**
    * Enables bottle throwing by setting the `B` flag to true when the throw button is touched,
    * and resetting it to false when the touch ends.
    * Prevents default touch behavior to avoid unintended browser interactions.
    */
    moveThrow() {
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.B = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.B = false;
        });
    }

}

