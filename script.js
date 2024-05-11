const container = document.querySelector("div.container");

const startScreen = document.querySelector("div.start-screen");
const startText = document.querySelector("div.start-screen h3.intro");
const startBtn = document.querySelector("div.start-screen #start");
const intro = document.querySelector("div.start-screen h3.intro");

const mainScreen = document.querySelector("div.main");
const operandA = document.querySelector("p.operation .operandA");
const operandB = document.querySelector("p.operation .operandB");
const counter = document.querySelector("div.main h1.counter");
const result = document.querySelector("div.main input");

const winnerScreen = document.querySelector("div.winner-screen");
const score = document.querySelector("div.winner-screen h2.score");

startBtn.addEventListener("mouseup", startGame);
result.addEventListener("keydown", updateOperands);

let scoreCount = 0;

function getRandomNumber (min, max) {
	return Math.floor(Math.random() * max) + min;
}

function getStartingOperands() {
	scoreCount = 0;
	operandA.textContent = getRandomNumber(1, 9);
	operandB.textContent = getRandomNumber(1, 9);
}

function getResult() {
	return parseInt(operandA.textContent) + parseInt(operandB.textContent);
}

function compareResults() {
	const currentResult = getResult();
	if (currentResult == result.value) return currentResult;
}

function updateOperands(e) {
	if (e.key !== "Enter") return;
	const correctInput = compareResults();

	if (correctInput) {
		scoreCount++;
		showWinnerScreen();
		operandA.textContent = correctInput;
		operandB.textContent = getRandomNumber(1, correctInput);
	} else result.value = "";
}

function hideWinnerScreen () {
	const id = setTimeout(() => {
		// should run after 2 seconds
		winnerScreen.style.display = "none";
		result.value = "";
		startCountdown();
	}, 1000);
}

function hideScreen (screen) {
	screen.style.display = "none";
}

function displayScreen (screen) {
	screen.style.display = "flex";
}

function startGame() {
	hideScreen(startScreen);
	displayScreen(mainScreen);
	getStartingOperands();
	startCountdown();
	result.focus();
}

function endGame() {
	updateGameEndInfo();
	displayScreen(startScreen);
	hideScreen(mainScreen);
	result.value = "";
}

function updateGameEndInfo() {
	intro.textContent = "Game done!";
	
	const scoreInfo = document.createElement("h3");
	scoreInfo.className = "scoreInfo";
	startScreen.insertBefore(scoreInfo, startBtn);
	scoreInfo.textContent = `You solved ${scoreCount} problem`;
	if (scoreCount > 1) scoreInfo.textContent += `s`;
	scoreInfo.textContent += "!";
}

function showWinnerScreen() {
	score.textContent = `That's ${scoreCount} in a row!`
	winnerScreen.style.display = "flex";
	hideWinnerScreen();
}

function startCountdown() {
	let count = 7;
	const timer = setInterval(() => {
	  	count--;
	  	counter.textContent = count;
	  	if (operandA.textContent === result.value) {
	  		clearInterval(timer);
	  		counter.textContent = "7";
	  	}
	  	else if (count === 0) {
	  		endGame();
	  		clearInterval(timer);
	  		counter.textContent = "7";
		}
	}, 1000);

}