let canvas;
let world 
let keyboard = new Keyboard();
let start = false;


let sounds = {
     walk: new Audio('audio/walk.mp3'),
     jump: new Audio('audio/jump.mp3'),
     throw: new Audio('audio/throw.mp3')
};

function init() {
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none';
    loadStartMenu();
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE  = true;
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
        keyboard.DOWN  = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE  = false;
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
        keyboard.DOWN  = false;
    }
});

function loadStartMenu() {
    let start = document.getElementById('menu');
    start.innerHTML = startMenuTemplate();
}