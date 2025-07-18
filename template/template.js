/**
 * Returns the HTML template for the start menu.
 * Includes buttons to view instructions, start the game, and view the imprint.
 * @returns {string} HTML string of the start menu layout
 */
function startMenuTemplate() {
    return `
        <div class="start-buttons">
            <button onclick="loadInstrctionsScreen()">Instructions</button>
            <button onclick="startTheGame()">Start Game</button>
            <button onclick="showImprint()">Imprint</button>
        </div>
    `
}

/**
 * Returns the HTML template for the instructions screen.
 * Displays an image of the controls and a game description.
 * @returns {string} HTML string of the instructions layout
 */
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

/**
 * Returns the HTML template for the game over screen.
 * Displays a close and restart button after the player loses.
 * @returns {string} HTML string of the game over layout
 */
function gameOverTemplate() {
    return `
        <div class="lost-game">
            <div class="close-button-container">
                <button class="close-button" onclick="loadStartMenu()">X</button>
            </div>
            <button class="restart-button" onclick="startTheGame()">Restart</button>
        </div>
    `
}

/**
 * Returns the HTML template for the "you win" screen.
 * Displays a close and restart button after the player wins the game.
 * @returns {string} HTML string of the win screen layout
 */
function youWinTemplate() {
    return `
        <div class="win-game">
            <div class="close-button-container">
                <button class="close-button" onclick="loadStartMenu()">X</button>
            </div>
            <button class="restart-button" onclick="startTheGame()">Restart</button>
        </div>
    `
}