function startMenuTemplate() {
    return `
        <div class="menu-screens">
            <div class="start-buttons">
                <button onclick="loadInstrctionsScreen()">Instrctions</button>
                <button onclick="startTheGame()">Start Game</button>
                <button onclick="showImprint()">Imprint</button>
            </div>
        </div>
    `
}

function instrctionsTemplate() {
    return `
        <div class="layout-container">
            <div class="instructions-header">
            <h2>Instructions</h2>
            <button onclick="loadStartMenu()">X</button>
            </div>
            <img src="img/assets/tastatur-layout.png" alt="">
            <p class="description-container">
                Game Description: <br>
                Move your character, but watch out for enemies, dodge them, and collect coins. Good luck!
            </p>
        </div>
    `
}

function gameOverTemplate() {
    return `
        <div class="menu-screens">
            <div class="lost-game">
                <div class="close-button-container">
                    <button class="close-button" onclick="loadStartMenu()">X</button>
                </div>
                <button class="restart-button" onclick="startTheGame()">Restart</button>
            </div>
        </div>
    `
}

function youWinTemplate() {
    return `
        <div class="menu-screens">
            <div class="win-game">
                <div class="close-button-container">
                    <button class="close-button" onclick="loadStartMenu()">X</button>
                </div>
                <button class="restart-button" onclick="startTheGame()">Restart</button>
            </div>
        </div>
    `
}