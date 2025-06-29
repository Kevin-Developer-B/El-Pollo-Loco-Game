function startMenuTemplate() {
    return `
        <div class="start-menu">
            <div class="start-buttons">
                <button>Instrctions</button>
                <button onclick="startTheGame(), playBackgroundmusic()">Start Game</button>
                <button>Imprint</button>
            </div>
            <div class="settings-container">
            <button onclick="toggleScreen()">
                <svg id="fullscreen-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
                    <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>
                </svg>
            </button>
            <button onclick="closetFullscreen()">
                <svg onclick="" id="noFullscreen-icon" style="display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
                    <path d="M136-80 400-344H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z"/>
                </svg>
            </button>
        </div>
        </div>
        
    `
}

function gameOverTemplate() {
    return `
        <div class="end-screen-container">
            <div class="close-button-container">
                <button class="close-button" onclick="loadStartMenu()">X</button>
            </div>
            <img class="game-over-img" src="img/You won, you lost/Game Over.png" alt="">
            <button class="restart-button" onclick="startTheGame()">Restart</button>
        </div>
    `
}

function youWinTemplate() {
    return `
        <div class="end-screen-container">
            <div class="close-button-container">
                <button class="close-button" onclick="loadStartMenu()">X</button>
            </div>
            <img class="game-over-img" src="img/You won, you lost/You won A.png" alt="">
            <button class="restart-button" onclick="startTheGame()">Restart</button>
        </div>
    `
}