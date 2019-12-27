const cases = document.querySelectorAll(".playable");
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const container = document.querySelector('.game');
const info = document.querySelector('.info')



class Game {
    constructor() {
        this._board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        //to keep track of the player : false for the first player and true for the second
        this.currentPlayer = "player1";
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
    }

    //place the piece
    place(rowIndex, columnIndex) {
        if (!this.currentPlayer) {
            this._board[rowIndex][columnIndex] = "X";
        } else {
            this._board[rowIndex][columnIndex] = "O";
        }
        this.plays += 1;
        this.currentPlayer = !this.currentPlayer;
    };

    //check for the winner
    checkWinner(rowIndex, columnIndex) {
        if (this.checkColumn(columnIndex)) {
            this.currentPlayer = !this.currentPlayer;
            return this.checkColumn(columnIndex);
        } else if (this.checkRow(rowIndex)) {
            this.currentPlayer = !this.currentPlayer;
            return this.checkRow(rowIndex);
        } else if (this.checkDiagonals(rowIndex, columnIndex)) {
            this.currentPlayer = !this.currentPlayer;
            return this.checkDiagonals(rowIndex, columnIndex);
        } else if (this.plays === 9) {
            return 'draw'
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




start.addEventListener('click', (e) => {
    container.classList.toggle('hide');
    info.classList.toggle('hide')
    let play = new Game();


    const player1Name = document.querySelector('#player1').value;
    const player2Name = document.querySelector('#player2').value;
    let player1 = new Player(player1Name);
    let player2 = new Player(player2Name);

    cases.forEach(elm => {
        elm.addEventListener("click", (e) => {


            let img = document.createElement("IMG");
            if (!play.currentPlayer) {
                img.src = "/Images/X.png";
            } else {
                img.src = "/Images/O.png";
            }
            e.target.appendChild(img)
            let rowIndex = parseInt(e.target.id[0])
            let columnIndex = parseInt(e.target.id[1])
            play.place(rowIndex, columnIndex)
            if (play.checkWinner(rowIndex, columnIndex)) {
                if (play.checkWinner(rowIndex, columnIndex) === "X") {
                    player1.updateScore();
                    alert(`${player1.name} won the Game`);
                } else if (play.checkWinner(rowIndex, columnIndex) === "O") {
                    player2.updateScore();
                    alert(`${player2.name} won the Game`);
                } else {
                    alert(`it's a draw`);
                }
                play.reset();
            }
        });
    });


    reset.addEventListener('click', (e) => {
        play.reset();
        player1.resetScore();
        player2.resetScore();
    })

})