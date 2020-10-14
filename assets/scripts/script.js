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
const statTooltipTitle = document.querySelector(".js-tooltip-title");
const statTooltipAmount = document.querySelector(".js-tooltip-amount");
const statTooltipPercentage = document.querySelector(".js-tooltip-percentage");

let pieCounter = 1;
// TODO: Hent values dynamisk fra google sheet filen
const pieValues0 = [
    {
        title: "Med en god ven/med gode venner",
        amount: 40
    },
    {
        title: "I en park",
        amount: 11
    },
    {
        title: "Til private sammenkomster",
        amount: 46
    },
    {
        title: "Til fest i byen",
        amount: 17
    },

];

const pieValues1 = [
    {
        title: "I kombination med alkoholiske øl, som et middel til at påvirke hvor fuld jeg bliver",
        amount: 22
    },
    {
        title: "Aftenen inden en vigtig aftale",
        amount: 36
    },
    {
        title: "Sidst på aftenen til en fest",
        amount: 31
    },
    {
        title: "Fordi det smager godt",
        amount: 29
    },
    {
        title: "På en hverdagsaften",
        amount: 44
    },
];

const pieValues2 = [
    {
        title: "I kombination med alkoholiske øl, som et middel til at påvirke hvor fuld jeg bliver",
        amount: 20
    },
    {
        title: "Aftenen inden en vigtig aftale",
        amount: 37
    },
    {
        title: "Sidst på aftenen til en fest",
        amount: 22
    },
    {
        title: "Fordi det smager godt",
        amount: 30
    },
    {
        title: "På en hverdagsaften",
        amount: 56
    },
];


const pieValues3 = [
    {
        title: "Det højner kvaliteten af samværet",
        amount: 23
    },
    {
        title: "Det styrker fællesskabet",
        amount: 13
    },
    {
        title: "Det bryder med opfattelsen om hvad en fest er",
        amount: 27
    },
    {
        title: "Det er  godt for samfundet generelt",
        amount: 36
    },
];

const allPieData = [
    pieValues0,
    pieValues1,
    pieValues2,
    pieValues3
];

console.log(`Pie data ${allPieData}`);

function init() {
    console.log('DOM loaded');

    document.querySelector(".js-beer-can").classList.add("a-bounce-in-down");

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

    allPieData.forEach(pieData => {
        animate(pieData);
    });
}

function animate(data) {
    console.log('Animate');

    let values = [];
    let titles = [];

    data.forEach(pie => {
        values.push(pie.amount);
        titles.push(pie.title);
    });

    console.log(values);
    const offset = [0];
    const circumference = Math.PI * 100;
    let total = 0;

    // Her beregner vi summen af værdierne
    values.forEach(value => total += value);

    // Herefter kan vi beregne forholdet
    const forhold = circumference / total;

    document.querySelectorAll(`.c-statistics__diagram:nth-child(${pieCounter}) circle`).forEach((circle, index) => {
        circle.style.strokeDasharray = `${values[index] * forhold} ${circumference}`;

        offset.push(values[index] + offset[index]);

        circle.style.strokeDashoffset = -offset[index] * forhold;

        circle.setAttribute("data-value", values[index]);
        circle.setAttribute("data-percent", values[index] / total * 100);
        circle.setAttribute("data-index", index);
        circle.setAttribute("data-title", titles[index]);

        let target = document.querySelector(`.c-statistics__diagram:nth-child(${pieCounter}) .c-statistics__pie-info-group`);

        target.innerHTML += `<p class="c-statistics__pie-info" data-index="${index}">${titles[index]} ${values[index]}</p>`;

        let lastChild = target.lastChild;

        target.lastChild.addEventListener("mouseover", e => showPieElement(lastChild));

        circle.addEventListener("mouseover", e => showTooltip(e));
        circle.addEventListener("mouseout", hideTooltip);
    });

    pieCounter++;
}

function showPieElement(lastChild) {
    console.log('Touchy touch!');
    console.log(lastChild);
    let index = lastChild.dataset.index;
    console.log(index);
    lastChild.removeEventListener("mouseover", e => showPieElement(lastChild));
    lastChild.addEventListener("mouseout", e => hidePieElement(lastChild));
    let target = lastChild.parentElement.parentElement.querySelector(`circle[data-index="${index}"]`);
    console.log(target);
    target.setAttribute("data-highligthed", "true");
}

function hidePieElement(lastChild) {
    console.log('Hidey hide!');
    lastChild.setAttribute("data-highlighted", "false");
}

function showTooltip(element) {
    statTooltip.classList.remove("is-hidden");
    window.addEventListener("mousemove", moveToolTip);
    statTooltipTitle.textContent = `${element.target.dataset.title}`;
    statTooltipPercentage.textContent = `${Number(element.target.dataset.percent).toFixed(2)}%`;
    statTooltipAmount.textContent = `${element.target.dataset.value} personer`;
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

    videoPlayerVideo.onpause = function () {
        videoPlayerOverlay.classList.remove('is-hidden');
    }

    videoPlayerButton.addEventListener("click", videoPlayerPlayPause);
}


function videoPlayerPlayPause() {

    if (videoPlayerVideo.paused) {
        console.log('Play video');
        videoPlayerVideo.play();
        videoPlayerOverlay.classList.add("is-hidden");
    } else {
        console.log('Pause video');
        videoPlayerVideo.pause();
    }
}
