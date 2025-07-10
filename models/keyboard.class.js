class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    ESCAPE = false;
    L = false;

    constructor() {
        this.DesktopKeyEvents();
    }
    DesktopKeyEvents() {
        window.addEventListener("keydown", (e) => {
            if (!gameActive) return;
            if (e.keyCode == 27) {
                return popUp();
            }
            if (e.keyCode == 32) {
                keyboard.SPACE = true;
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
            if (e.keyCode == 76) {
                keyboard.L = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (!gameActive) return;
            if (e.keyCode == 27) {
                keyboard.ESCAPE = false;
            }
            if (e.keyCode == 32) {
                keyboard.SPACE = false;
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
            if (e.keyCode == 76) {
                keyboard.L = false;
            }
        });
    }


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

