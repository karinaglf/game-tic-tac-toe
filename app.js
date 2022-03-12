// Grab DOM Elements
// Define Game Elements and Controllers on Constructor
// Style Game Board
// Create Game Logic

//DOM Elements
const gameContainer = document.getElementById('game-container');
const board = document.getElementById('board');
const restartBtn = document.getElementById('restart-btn');
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

class Game {
	constructor(player1, player2) {
		this.player1 = { name: player1, symbol: 'x', score: 0 };
		this.player2 = { name: player2, symbol: 'o', score: 0 };
		this.boardGrid = ['', '', '', '', '', '', '', '', ''];
		this.turn = this.player1;
		this.isGameOver = false;
	}

    start() {
        this.isGameOver = false;
        this.boardGrid = ['', '', '', '', '', '', '', '', ''];        
        this.drawScore();
        this.drawGame();
	}

	// Draw Elements
	drawGame() {
        board.innerHTML = '';
		// Board
		this.boardGrid.forEach((element, index) => {
			const cell = document.createElement('div');
			cell.innerText = element;
			cell.setAttribute('class', 'cell');
			cell.setAttribute('data-id', index);
			cell.addEventListener('click', () => this.makePlay(index));
			board.appendChild(cell);
		});
	}

    drawScore() {
        // Score
		playerOneScore.innerHTML = `${this.player1.name}: <span>${this.player1.score}</span>`;
		playerTwoScore.innerHTML = `${this.player2.name}: <span>${this.player2.score}</span>`;  
    }

	// Logic

	gameOver() {
        this.isGameOver = true;
		const gameOverMessage = document.createElement('h2');
		gameOverMessage.innerHTML = `${this.turn.name} won the game!`;
		gameContainer.appendChild(gameOverMessage);
        this.turn.score = this.turn.score + 1;
	}

	makePlay(index) {
		if (!this.isGameOver) {
			//Prevent player from clicking on a selected cell
			if (this.boardGrid[index] !== '') return false;

			//Select cell
			this.boardGrid[index] = this.turn.symbol;
			// board.innerHTML = '';
			this.drawGame();
			this.checkResult(this.turn.symbol);

			//Change player
			this.turn = this.turn == this.player1 ? this.player2 : this.player1;
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
				this.gameOver();
				return i;
			}
			return;
		});
	}
}

const play = new Game('Karina', 'Adriano');
play.start();
restartBtn.addEventListener('click', () => play.start())