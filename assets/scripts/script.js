document.addEventListener("DOMContentLoaded", init);

// General
const htmlBody = document.querySelector("body");
const googleSheetStatisticsData = "https://spreadsheets.google.com/feeds/list/1R0BkoIl4Vcl-yXYBqunSZIiw_rSZsDYjGRZHPcsBijQ/2/public/full?alt=json";
const googleSheetGameData = "https://spreadsheets.google.com/feeds/list/1R0BkoIl4Vcl-yXYBqunSZIiw_rSZsDYjGRZHPcsBijQ/3/public/full?alt=json";

// JSON Data
let statisticsData;
let gameData;


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

// Statistics section
const statTooltip = document.querySelector(".js-tooltip");
// TODO: Hent values dynamisk fra google sheet filen
const values = [];
const offset = [0];
const circumference = Math.PI * 100;
let total = 0;
// Her beregner vi summen af værdierne
//values.forEach(value => total += value);

// Herefter kan vi beregne forholdet
const forhold = circumference / total;


function init() {
    console.log('DOM loaded');

    initVideoPlayer();

    getData();
}

async function getData() {
    console.log('getData');

    const [statisticsResponse, gameResponse] = await Promise.all([
        fetch(googleSheetStatisticsData),
        fetch(googleSheetGameData)
    ]);

    const statisticsJSON = await statisticsResponse.json();
    const gameJSON = await gameResponse.json();

    statisticsData = statisticsJSON.feed.entry;

    gameData = gameJSON.feed.entry;

    //Initialize the game and our statistics chart section when our external data is loaded
    initGame();
    initStatistics();
}

function initStatistics() {
    console.log('initStatistics');

    let pieChartOneData = statisticsData;
    let pieChartOneValues = [];
    console.log(pieChartOneData);

    pieChartOneData.forEach(person => {

        if (person.gsx$prøvetafb.$t == "Ja") {
            let string = person.gsx$prøvetisituation.$t.split(", ");
            string.forEach(string => {
                if (string != "") {
                    pieChartOneValues.push(string);
                }
            });
        }
    });

    let test = {};

    pieChartOneValues.forEach(element => {
        test[element] = (test[element] || 0) + 1;
    });

    console.log(test);

    //    for (index = test.length; index < test.length; index++) {
    //        console.log(index);
    //    }
    //    test.forEach(number => total += number);


    animate();
}

function animate() {
    console.log('Animate');

    document.querySelectorAll(".c-pie-chart:first-child circle").forEach((circle, index) => {
        circle.style.strokeDasharray = `${values[index] * forhold} ${circumference}`;

        offset.push(values[index] + offset[index]);

        circle.style.strokeDashoffset = -offset[index] * forhold;

        circle.setAttribute("data-value", values[index]);
        circle.setAttribute("data-percent", values[index] / total * 100);

        circle.addEventListener("mouseover", e => showTooltip(e));
        circle.addEventListener("mouseout", hideTooltip);
    });
}

function showTooltip(element) {
    statTooltip.classList.remove("is-hidden");
    window.addEventListener("mousemove", moveToolTip);
    statTooltip.textContent = `${Number(element.target.dataset.percent).toFixed(2)}%`;
}

function hideTooltip() {
    statTooltip.classList.add("is-hidden");
    window.removeEventListener("mousemove", moveToolTip);
}

function moveToolTip(element) {
    statTooltip.style.top = `${element.clientY}px`;
    statTooltip.style.left = `${element.clientX}px`;
}


/*

    GAME

*/
function initGame() {
    console.log('initGame');

    // Listens for when the user clicks "start quiz" -> startsGame
    gameShowPopupButton.addEventListener("click", startGame);
}

function startGame() {
    console.log('startGame');

    gamePopup.classList.remove("is-hidden");

    // Removes the eventlistener, so the user only can click it when the game is closed again.
    gameShowPopupButton.removeEventListener("click", startGame);
}

function endGame() {
    console.log('endGame');

    // TODO: Reset everything

    gameShowPopupButton.addEventListener("click", startGame);
}



/*

    VIDEO PLAYER

*/
function initVideoPlayer() {
    console.log('initVideoPlayer');

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
