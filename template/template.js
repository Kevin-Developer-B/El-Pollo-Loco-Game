function startMenuTemplate() {
    return `
        <div id="startMenu" class="start-menu">
            <div class="start-buttons">
                <button onclick="loadInstrctionsScreen()">Instrctions</button>
                <button onclick="startTheGame(), playBackgroundmusic()">Start Game</button>
                <button onclick="showImprint()">Imprint</button>
            </div>
        </div>
    `
}

function instrctionsTemplate() {
    return `
        <div>
            <img src="img/assets/keyboard-layout.png" alt="">
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