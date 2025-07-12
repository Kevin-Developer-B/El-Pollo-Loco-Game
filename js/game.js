let canvas;
let world
let keyboard = new Keyboard();
let gameMuted = sessionStorage.getItem("gameMuted") ? JSON.parse(sessionStorage.getItem("gameMuted")) : false;
let gameActive = false;


let sounds = {
    walk: new Audio('audio/walk.mp3'),
    jump: new Audio('audio/jump.mp3'),
    hurt: new Audio('audio/ough.mp3'),
    throw: new Audio('audio/throw.mp3'),
    coin: new Audio('audio/retro-coin.mp3'),
    bottle_rotate: new Audio('audio/rotate.mp3'),
    bottle_shattering: new Audio('audio/bottle-shattering.mp3'),
    bottle_clanging: new Audio('audio/bottles-clanging.mp3'),
    snoring: new Audio('audio/snoring.mp3'),
    start_screen: new Audio('audio/start_music.mp3'),
    background_music: new Audio('audio/play_music.mp3'),
    boss_alert: new Audio('audio/boss-alert.mp3'),
    chicken_sound: new Audio('audio/chicken-sound.mp3'),
    chicken_pip: new Audio('audio/chick-pip.mp3'),
    dead_chicken: new Audio('audio/dead-chicken.mp3'),
    lost: new Audio('audio/lost.mp3'),
    successful: new Audio('audio/successful.mp3')
};

function init() {
    this.world
    loadStartMenu();
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none';
    keyboard.MobilePressEvents();
}

if (sessionStorage.getItem("gameMuted") === null) {
    sessionStorage.setItem("gameMuted", JSON.stringify(false));
}

function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.B = false;
    ESCAPE = false;
}

function loadingSpinner(show = true) {
    const spinner = document.getElementById("loadSpinner");
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';

    }
}

function loadStartMenu() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.style.display = 'none';
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const buttons = document.getElementById('playSettingsButton');
    if (buttons) buttons.style.display = 'none';
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    const start = document.getElementById('menu');
    start.style.display = 'flex';
    start.innerHTML = startMenuTemplate();
}

function showImprint() {
    window.location.href = './imprint.html';
}

function backToTheStartMenu() {
    window.location.href = './index.html';
}

function loadInstrctionsScreen() {
    let instrctions = document.getElementById('menu');
    instrctions.innerHTML = instrctionsTemplate();
}

function loadGameOverScreen() {
    let gameOver = document.getElementById('menu');
    gameOver.innerHTML = gameOverTemplate();
}

function loadYouWinScreen() {
    let youWin = document.getElementById('menu');
    youWin.innerHTML = youWinTemplate();
}

function playBackgroundmusic() {
    if (gameMuted) return;
    const backgroundMusic = sounds.background_music;
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.05;
    backgroundMusic.play();
}

function startTheGame() {
    gameActive = true;
    start = document.getElementById('menu');
    start.style.display = "none"
    loadingSpinner(true);
    setTimeout(() => {
        canvas = document.getElementById('canvas');
        buttons = document.getElementById('playSettingsButton')
        canvas.style.display = 'block';
        buttons.style.display = "block"
        document.getElementById('mute-icon').style.display = gameMuted ? 'none' : '';
        document.getElementById('unMute-icon').style.display = gameMuted ? '' : 'none';

        Object.values(sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        initLevel();
        world = new World(canvas, keyboard);
        if (gameMuted) {
            muteAllSounds();
        } else {
            unmuteAllSounds();
            playBackgroundmusic();
        }
        loadingSpinner(false);
    }, 1500);
}

function showGameOverScreen() {
    gameActive = false;
    resetKeyboard();
    buttons = document.getElementById('playSettingsButton');
    sounds.background_music.pause();
    sounds.lost.play();
    setTimeout(() => {
        Object.values(sounds).forEach(sound => {
            sound.pause();
            sound.volume = 0;
        });
    }, 2000);
    canvas.style.display = 'none';
    gameOver = document.getElementById('menu');
    gameOver.style.display = "block"
    buttons.style.display = "none"
    loadGameOverScreen();
}

function showYouWinScreen() {
    gameActive = false;
    buttons = document.getElementById('playSettingsButton');
    sounds.successful.play();
    setTimeout(() => {
        Object.values(sounds).forEach(sound => {
            sound.pause();
            sound.volume = 0;
        });
    }, 2000);
    canvas.style.display = 'none';
    buttons.style.display = "none"
    youWin = document.getElementById('menu');
    youWin.style.display = 'block'
    loadYouWinScreen();
}

function popUp() {
    const popupElement = document.getElementById('popUp');
    popupElement.style.display = 'block';
}

function popUpYes() {
    if (world && typeof world.stop === 'function') {
        world.stop();
    }
    world = null;
    gameActive = false;
    
    const popupElement = document.getElementById('popUp');
    popupElement.style.display = 'none';

    const canvas = document.getElementById('canvas');
    canvas.style.display = 'none';

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    init();
}

function popUpNO() {
    const popupElement = document.getElementById('popUp');
    popupElement.style.display = 'none';
}