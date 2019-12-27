/* *******************************      DOM Varibles Declaration       ************************************* */

const square = document.querySelectorAll(".playable");
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const container = document.querySelector('.game');
const info = document.querySelector('.info');
const player1_name = document.querySelector('#player1_name');
const player2_name = document.querySelector('#player2_name');
const player1_score = document.querySelector('#player1_score');
const player2_score = document.querySelector('#player2_score');

/* *******************************      Classes Declaration       ************************************* */

class Game {
    constructor() {
        this._board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        //to keep track of the player : false for the first player and true for the second
        this.currentPlayer = false;
        this.plays = 0;
    };

    //calculate the score of the row
    checkRow(index) {
        let current = this._board[index][0];
        for (var i = 1; i < 3; i++) {
            if (current !== this._board[index][i]) return false;
        }
        return current;
    };

    //calculate the score of the column
    checkColumn(index) {
        let current = this._board[0][index];
        for (var i = 1; i < 3; i++) {
            if (current !== this._board[i][index]) return false;
        }
        return current;
    };

    checkDiagonals(rowIndex, columnIndex) {
        //calculate the score of the first diagonal
        let checkFirstDiagonal = (rowIndex, columnIndex) => {
            let current = this._board[0][0];
            while (rowIndex < 3 && columnIndex < 3) {
                if (current !== this._board[rowIndex][columnIndex] || !this._board[rowIndex][columnIndex]) return false;
                rowIndex++;
                columnIndex++;
            }
            return current;
        };

        //check the second diagonal
        let checkSecondDiagonal = (rowIndex, columnIndex) => {
            let current = this._board[0][2];
            while (rowIndex < 3 && columnIndex < 3) {
                if (current !== this._board[rowIndex][columnIndex] || !this._board[rowIndex][columnIndex]) return false;
                rowIndex++;
                columnIndex--;
            }
            return current;
        };

        if (rowIndex === 1 && columnIndex === 1) {
            return checkFirstDiagonal(0, 0) || checkSecondDiagonal(0, 2);
        } else if (rowIndex === columnIndex) {
            return checkFirstDiagonal(0, 0);
        } else {
            return checkSecondDiagonal(0, 2)
        }
    };

    //check for the winner and return it
    checkWinner(rowIndex, columnIndex) {
        if (this.checkColumn(columnIndex)) {
            return this.checkColumn(columnIndex);
        } else if (this.checkRow(rowIndex)) {
            return this.checkRow(rowIndex);
        } else if (this.checkDiagonals(rowIndex, columnIndex)) {
            return this.checkDiagonals(rowIndex, columnIndex);
        } else if (this.plays === 9) {
            return 'draw'
        }
    };

    //place the piece and return if there is a winner
    place(rowIndex, columnIndex) {
        //check if the squaere is a valid place or not 
        if (rowIndex !== undefined) {
            //check the current player
            if (!this.currentPlayer) {
                //add the apropriete value in the board
                this._board[rowIndex][columnIndex] = "X";
            } else {
                this._board[rowIndex][columnIndex] = "O";
            }
            //increment the nbr of plays
            this.plays += 1;
            //return if there is a winner
            let winner = this.checkWinner(rowIndex, columnIndex);
            if (!winner) {
                //change the curent player
                this.currentPlayer = !this.currentPlayer;
            }
            return winner;
        }
    };

    //restart the game
    reset() {
        const images = document.querySelectorAll('img');
        this._board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.plays = 0;
        //remove all the images from the board
        images.forEach(elm => {
            elm.remove()
        })
    };
}

class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
    };

    updateScore() {
        this.wins += 1;
    };

    resetScore() {
        this.wins = 0;
    }
}


/* *******************************      Helper Functions Declaration       ************************************* */

const renderPlay = (currentPlayer, event) => {
    let img = document.createElement("IMG");
    if (currentPlayer) {
        img.src = "/Images/X.png";
    } else {
        img.src = "/Images/O.png";
    }
    event.target.appendChild(img)
}

function renderUpdatedScores(player1, player2) {
    player1_score.innerHTML = player1.wins;
    player2_score.innerHTML = player2.wins;
}

function displayWinner(result, player1, player2, play) {
    if (result) {
        if (result === "X") {
            player1.updateScore();
            renderUpdatedScores(player1, player2);
            alert(`${player1.name} won the Game`);
        } else if (result === "O") {
            player2.updateScore();
            renderUpdatedScores(player1, player2);
            alert(`${player2.name} won the Game`);
        } else {
            alert(`it's a draw`);
        }
        //reset the board
        play.reset();
    }
}

function renderNames(player1, player2) {
    const player1Name = document.querySelector('#player1').value || "Player 1";
    const player2Name = document.querySelector('#player2').value || "Player 2";
    //render the names of the players in the DOM
    player2_name.innerHTML = player2Name;
    player1_name.innerHTML = player1Name;
    //asign the respective names of the player in the class
    player1.name = player1Name;
    player2.name = player2Name;
}

/* *******************************      DOM Listening and rendering       ************************************* */


start.addEventListener('click', (e) => {

    container.classList.toggle('hide');
    info.style.display = 'none'

    /* ***********   Intentiate the players and the game    ************* */

    let play = new Game();
    let player1 = new Player();
    let player2 = new Player();
    renderNames(player1, player2)

    /* ***********   Start listening to the game    ************* */

    square.forEach(elm => {
        elm.addEventListener("click", (e) => {

            let rowIndex = parseInt(e.target.id[0]);
            let columnIndex = parseInt(e.target.id[1]);

            //place the piece and check for the result
            var result = play.place(rowIndex, columnIndex);
            //render the piece on the DOM
            renderPlay(play.currentPlayer, e);
            //check for winner or draw
            displayWinner(result, player1, player2, play);
        });
    });

    /* ***********   Restart the game    ************* */

    reset.addEventListener('click', (e) => {
        play.reset();
        play.currentPlayer = false;
        player1.resetScore();
        player2.resetScore();
        renderUpdatedScores(player1, player2);
    })
})

