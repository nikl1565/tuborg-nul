document.addEventListener("DOMContentLoaded", init);

// Global
const htmlBody = document.querySelector("body");

// Game
const gamePopup = document.querySelector(".js-game-popup");
const gameChart = document.querySelector(".js-game-chart");
const gameHeading = document.querySelector(".js-game-heading");
const gameParagraph = document.querySelector(".js-game-paragraph");
const gameButton1 = document.querySelector(".js-game-button-1");
const gameButton2 = document.querySelector(".js-game-button-2");
const gameButton3 = document.querySelector(".js-game-button-3");
const gameButton4 = document.querySelector(".js-game-button-4");
const gameShowPopupButton = document.querySelector(".js-game-show-popup-button");
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




// Game
function initGame() {
    console.log('Initialize game');

    // Listens for when the user clicks "start quiz" -> startsGame
    gameShowPopupButton.addEventListener("click", startGame);
}

function startGame() {
    console.log('Start game');

    gamePopup.classList.remove("is-hidden");

    // Removes the eventlistener, so the user only can click it when the game is closed again.
    gameShowPopupButton.removeEventListener("click", startGame);
}

function endGame() {
    console.log('End game');

    // TODO: Reset everything

    gameShowPopupButton.addEventListener("click", startGame);
}




// Video player
function initVideoPlayer() {
    console.log('Initialize video player');

    videoPlayerVideo.volume = 0.5;

    videoPlayerButton.addEventListener("click", videoPlayerPlayPause);
}

function videoPlayerPlayPause() {

    if (videoPlayerVideo.paused) {
        console.log('Play video');
        videoPlayerVideo.play();
    } else {
        console.log('Pause video');
        videoPlayerVideo.pause();
    }
}
