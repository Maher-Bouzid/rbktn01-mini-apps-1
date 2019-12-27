const cases = document.querySelectorAll(".playable")
let X = document.createElement("IMG");
X.src = "/Images/X.png";
class Game {
    constructor() {
        this._board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        //to keep track of the player : false for the first player and true for the second
        this.currentPlayer = false;
        //to see if the game started or not
        this.game = false;
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

    //calculate the score of the diagonal
    checkDaiagonal(rowIndex, columnIndex) {
        let score = 0;
        while (rowIndex < 3) {
            score += this._board[rowIndex][columnIndex];
            rowIndex++;
            columnIndex++;
        }
        return score;
    };

    //place the piece
    place(rowIndex, columnIndex) {
        this.game = true;
        if (!this.currentPlayer) {
            this._board[rowIndex][columnIndex] = "X";
        } else {
            this._board[rowIndex][columnIndex] = "O";
        }
        this.currentPlayer = !this.currentPlayer;
    };

    //check for the winner
    checkWinner(rowIndex, columnIndex) {
        if (this.checkColumn(columnIndex)) {
            console.log('column : ', this.checkColumn(columnIndex))
        } else if (this.checkRow(rowIndex)) {
            console.log('row : ', this.checkRow(rowIndex))
        }
    }
    //restart the game
    restart() {
        this._board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.currentPlayer = false;
    };
}



//need to hundle the click event
//need to use forEach
let play = new Game()
cases.forEach(elm => {
    elm.addEventListener("click", (e) => {
        // if(play.game){
        // }
        // appendChild(img)
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
        play.checkWinner(rowIndex, columnIndex)
        console.table(play._board)
    })
})