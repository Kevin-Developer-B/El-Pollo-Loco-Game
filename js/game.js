/**
 * Global variables for the game state and controls.
 * @type {HTMLCanvasElement} canvas - The main canvas element for rendering.
 * @type {World} world - The game world instance.
 * @type {Keyboard} keyboard - The keyboard input handler instance.
 * @type {boolean} gameMuted - Indicates whether the game sounds are muted, loaded from sessionStorage.
 * @type {boolean} gameActive - Indicates whether the game is currently active.
 */
let canvas;
let world
let keyboard = new Keyboard();
let gameMuted = sessionStorage.getItem("gameMuted") ? JSON.parse(sessionStorage.getItem("gameMuted")) : false;
let gameActive = false;


/**
 * Collection of all sound effects and music used in the game.
 * 
 * @namespace sounds
 * @property {HTMLAudioElement} walk - Sound effect for walking.
 * @property {HTMLAudioElement} jump - Sound effect for jumping.
 * @property {HTMLAudioElement} hurt - Sound effect for getting hurt.
 * @property {HTMLAudioElement} throw - Sound effect for throwing.
 * @property {HTMLAudioElement} coin - Sound effect for collecting coins.
 * @property {HTMLAudioElement} bottle_rotate - Sound effect for bottle spinning.
 * @property {HTMLAudioElement} bottle_shattering - Sound effect for bottle shattering.
 * @property {HTMLAudioElement} bottle_clanging - Sound effect for bottles clanging.
 * @property {HTMLAudioElement} snoring - Sound effect for snoring.
 * @property {HTMLAudioElement} start_screen - Background music for the start screen.
 * @property {HTMLAudioElement} background_music - Background music during gameplay.
 * @property {HTMLAudioElement} boss_alert - Sound effect for boss alert.
 * @property {HTMLAudioElement} chicken_sound - Sound effect for chicken noises.
 * @property {HTMLAudioElement} chicken_pip - Sound effect for chick peeping.
 * @property {HTMLAudioElement} dead_chicken - Sound effect for dead chicken.
 * @property {HTMLAudioElement} lost - Sound effect for game over.
 * @property {HTMLAudioElement} successful - Sound effect for success.
 */
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

/**
 * Initializes the game environment.
 * - References the game world.
 * - Loads the start menu.
 * - Hides the canvas element initially.
 * - Sets up mobile-specific keyboard event handlers.
 */
function init() {
    this.world
    loadStartMenu();
    canvas = document.getElementById('canvas');
    canvas.style.display = 'none';
    keyboard.MobilePressEvents();
}

/**
 * Resets all keyboard control flags to false.
 * This clears the current keyboard input states.
 */
function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.B = false;
    ESCAPE = false;
}

/**
 * Shows or hides the loading spinner element.
 * @param {boolean} [show=true] - Whether to show the spinner (true) or hide it (false).
 */
function loadingSpinner(show = true) {
    const spinner = document.getElementById("loadSpinner");
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Loads and displays the start menu by hiding the canvas and buttons,
 * pausing sounds, and rendering the start menu template.
 */
function loadStartMenu() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.style.display = 'none';
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const buttons = document.getElementById('playSettingsButton');
    if (buttons) buttons.style.display = 'none';
    searchSoundsPause();
    const start = document.getElementById('menu');
    start.style.display = 'flex';
    start.innerHTML = startMenuTemplate();
}

/**
 * Redirects the user to the imprint page.
 */
function showImprint() {
    window.location.href = './imprint.html';
}

/**
 * Redirects the user back to the start menu page.
 */
function backToTheStartMenu() {
    window.location.href = './index.html';
}

/**
 * Loads the instructions screen by replacing the content of the menu element.
 */
function loadInstrctionsScreen() {
    let instrctions = document.getElementById('menu');
    instrctions.innerHTML = instrctionsTemplate();
}

/**
 * Loads the game over screen by replacing the content of the menu element.
 */
function loadGameOverScreen() {
    let gameOver = document.getElementById('menu');
    gameOver.innerHTML = gameOverTemplate();
}

/**
 * Loads the "You Win" screen by updating the content of the menu element.
 */
function loadYouWinScreen() {
    let youWin = document.getElementById('menu');
    youWin.innerHTML = youWinTemplate();
}

/**
 * Plays the background music in a loop if the game is not muted.
 */
function playBackgroundmusic() {
    if (gameMuted) return;
    const backgroundMusic = sounds.background_music;
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.05;
    backgroundMusic.play();
}

/**
 * Starts the game by hiding the menu, showing a loading spinner, initializing the game world,
 * clearing the previous game state, setting sound based on mute status, and displaying the game UI.
 */
function startTheGame() {
    gameActive = true;
    start = document.getElementById('menu');
    start.style.display = "none"
    loadingSpinner(true);
    setTimeout(() => {
        showGameUI();
        searchSoundsPause();
        clearGame();
        initLevel();
        world = new World(canvas, keyboard);
        gameMuted ? muteAllSounds() : (unmuteAllSounds(), playBackgroundmusic());
        loadingSpinner(false);
    }, 1500);
}

/**
 * Displays the Game Over screen, stops background music, plays lost sound,
 * disables the canvas, resets keyboard input, and manages UI visibility.
 */
function showGameOverScreen() {
    gameActive = false;
    resetKeyboard();
    buttons = document.getElementById('playSettingsButton');
    sounds.background_music.pause();
    sounds.lost.play();
    setTimeout(() => {
        searchSoundsPause();
    }, 2000);
    canvas.style.display = 'none';
    gameOver = document.getElementById('menu');
    gameOver.style.display = "block"
    buttons.style.display = "none"
    loadGameOverScreen();
}

/**
 * Displays the "You Win" screen by stopping the game,
 * playing success sound, hiding the game canvas and buttons,
 * and showing the victory menu after handling sounds.
 */
function showYouWinScreen() {
    gameActive = false;
    buttons = document.getElementById('playSettingsButton');
    sounds.successful.play();
    setTimeout(() => {
        searchSoundsPause();
    }, 2000);
    canvas.style.display = 'none';
    buttons.style.display = "none"
    youWin = document.getElementById('menu');
    youWin.style.display = 'block'
    loadYouWinScreen();
}

/**
 * Shows the popup element by setting its display style to 'block'.
 */
function popUp() {
    const popupElement = document.getElementById('popUp');
    popupElement.style.display = 'block';
}

/**
 * Handles the "Yes" action on the popup:
 * - Stops the game world if running,
 * - Resets game state and UI,
 * - Clears and reinitializes the game.
 */
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
    clearGame();
    init();
}

/**
 * Handles the "No" action on the popup by simply hiding the popup element.
 */
function popUpNO() {
    const popupElement = document.getElementById('popUp');
    popupElement.style.display = 'none';
}

/**
 * Toggles the game's mute state, updates the mute icons,
 * saves the state in sessionStorage, and manages sound playback accordingly.
 */
function toggleMute() {
    let muteIcon = document.getElementById('mute-icon');
    let unMuteIcon = document.getElementById('unMute-icon');
    toggleMuteIcon(muteIcon, unMuteIcon);
    gameMuted = !gameMuted;
    sessionStorage.setItem("gameMuted", JSON.stringify(gameMuted));
    if (gameMuted) {
        muteAllSounds();
    } else {
        unmuteAllSounds();
        if (sounds.background_music.paused) {
            sounds.background_music.play();
        }
    }
}

/**
 * Mutes all sounds by pausing them and setting their volume to 0.
 */
function muteAllSounds() {
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.volume = 0;
    });
}

/**
 * Unmutes all sounds by setting their volume to default levels.
 * The background music is set to a lower volume (0.05), 
 * while other sounds are set to full volume (1).
 */
function unmuteAllSounds() {
    Object.entries(sounds).forEach(([key, sound]) => {
        if (key === 'background_music') {
            sound.volume = 0.05;
        } else {
            sound.volume = 1;
        }
    });
}

/**
 * Pauses all sounds and resets their playback position to the start.
 */
function searchSoundsPause() {
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

/**
 * Toggles the display of mute and unmute icons.
 * 
 * @param {HTMLElement} muteIcon - The mute icon element.
 * @param {HTMLElement} unMuteIcon - The unmute icon element.
 */
function toggleMuteIcon(muteIcon, unMuteIcon) {
    muteIcon.style.display = muteIcon.style.display === 'none' ? '' : 'none';
    unMuteIcon.style.display = unMuteIcon.style.display === 'none' ? '' : 'none';
}

/**
 * Clears the entire game canvas.
 */
function clearGame() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Displays the game UI elements including the canvas and control buttons.
 * Also updates the mute/unmute icon based on the current mute state.
 */
function showGameUI() {
    canvas = document.getElementById('canvas');
    buttons = document.getElementById('playSettingsButton');
    canvas.style.display = buttons.style.display = 'block';
    document.getElementById('mute-icon').style.display = gameMuted ? 'none' : '';
    document.getElementById('unMute-icon').style.display = gameMuted ? '' : 'none';
}
