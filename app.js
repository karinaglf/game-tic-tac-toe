//DOM Elements
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const board = document.getElementById('board');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const message = document.getElementById('message');
const playerOneInput = document.getElementById('player1-name');
const playerTwoInput = document.getElementById('player2-name');
const playerOneScore = document.getElementById('player1-score');
const playerTwoScore = document.getElementById('player2-score');

//Global Variables
const winningSequences = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let game;

class Game {
	constructor(player1, player2) {
		this.player1 = { name: player1, symbol: 'x', score: 0 };
		this.player2 = { name: player2, symbol: 'o', score: 0 };
		this.boardGrid = [];
		this.turn = this.player1;
		this.isGameOver = false;
	}

	// Draw Elements

	drawScore() {
		playerOneScore.innerHTML = `${this.player1.name}: <span>${this.player1.score}</span>`;
		playerTwoScore.innerHTML = `${this.player2.name}: <span>${this.player2.score}</span>`;
	}

    updateMessages() {
        if(this.isGameOver) {
            message.innerText = `${this.turn.name} won the game!`;
        } else {
            message.innerText = `It's ${this.turn.name}'s turn`;
        }
    }

    drawGame() {
		board.innerHTML = '';
        this.updateMessages();
		// Board
		this.boardGrid.forEach((element, index) => {
			const cell = document.createElement('div');
			cell.innerText = element;
			cell.setAttribute('class', 'cell');
			cell.setAttribute('id', index);
			cell.addEventListener('click', () => this.makePlay(index));
			board.appendChild(cell);
		});
	}

	// Logic

    start() {
		//hide start screen
		startScreen.style.display = 'none';
		//show game screen
		gameContainer.style.display = 'flex';
		this.isGameOver = false;
		this.boardGrid = ['', '', '', '', '', '', '', '', ''];
		this.drawScore();
		this.drawGame();
	}

	restart() {
		this.isGameOver = false;
		this.boardGrid = ['', '', '', '', '', '', '', '', ''];
		this.drawScore();
		this.drawGame();
	}

	gameOver() {
        this.isGameOver = true;
		this.turn.score = this.turn.score + 1;
	}

	makePlay(index) {

		if (!this.isGameOver) {

			//Prevent player from clicking on a selected cell
			if (this.boardGrid[index] !== '') return false;

			//Select cell
			this.boardGrid[index] = this.turn.symbol;
			this.drawGame();
			this.checkResult(this.turn.symbol);


			//Change player
			this.turn = (this.turn == this.player1 ? this.player2 : this.player1);
		}
	}

	checkResult(symbol) {
		winningSequences.forEach((sequence, i) => {
			if (
				this.boardGrid[winningSequences[i][0]] == symbol &&
				this.boardGrid[winningSequences[i][1]] == symbol &&
				this.boardGrid[winningSequences[i][2]] == symbol
			) {
				console.log('Match:' + winningSequences[i]);
                message.innerText = `${this.turn.name} won the game!`;
				this.gameOver();
                this.addStyleToWinner(i)
                return i;
			}
			return;
		});
	}

    addStyleToWinner (sequence) {
        winningSequences[sequence].forEach((item) => {
            const winningCell = document.getElementById(item)
            winningCell.style.backgroundColor = '#5C404D';
        })
    }

}

// Event Listeners

restartBtn.addEventListener('click', () => game.restart());

startBtn.addEventListener('click', () => {

    if(!playerOneInput.value) playerOneInput.value = "Player1"
    if(!playerTwoInput.value) playerTwoInput.value = "Player2"

	game = new Game(playerOneInput.value, playerTwoInput.value);
	game.start();
});
