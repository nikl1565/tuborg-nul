document.addEventListener("DOMContentLoaded", init);

// Game
const gamePopup = document.querySelector(".js-game-popup");
const gameChart = document.querySelector(".js-game-chart");
const gameHeading = document.querySelector(".js-game-heading");
const gameParagraph = document.querySelector(".js-game-paragraph");
const gameButton1 = document.querySelector(".js-game-button-1");
const gameButton2 = document.querySelector(".js-game-button-2");
const gameButton3 = document.querySelector(".js-game-button-3");
const gameButton4 = document.querySelector(".js-game-button-4");
const gameCtaButton = document.querySelector(".js-game-show-popup-button");
const gameStartButton = document.querySelector(".js-game-start-button");
const gameStopbutton = document.querySelector(".js-game-back-button");

// Video player
const videoPlayerButton = document.querySelector(".js-video-player-button");
const videoPlayerVideo = document.querySelector(".js-video-player-video");
const videoPlayerOverlay = document.querySelector(".js-video-player-overlay");

function init() {
    console.log('DOM loaded');

    initGame();

    initVideoPlayer();
}





function initGame() {
    console.log('Initialize game');

    startGame();
}

function startGame() {
    console.log('Start game');
}

function endGame() {
    console.log('End game');
}





function initVideoPlayer() {
    console.log('Initialize video player');
}
