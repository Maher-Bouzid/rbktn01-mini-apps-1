const cases = document.querySelectorAll(".playable")

class Game {
    constructor() {
        this._board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        //to keep track of the player : false for the first player and true for the second
        this.currentPlayer = false;
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
        function checkFirstDiagonal(rowIndex, columnIndex) {
            let current = this._board[rowIndex][columnIndex];
            while (rowIndex < 3) {
                rowIndex++;
                columnIndex++;
                if (current !== this._board[rowIndex][columnIndex]) return false;
            }
            return current;
        };

        //check the second diagonal
        function checkSecondDiagonal(rowIndex, columnIndex) {
            let current = this._board[rowIndex][columnIndex];
            while (rowIndex < 3) {
                rowIndex++;
                columnIndex--;
                if (current !== this._board[rowIndex][columnIndex]) return false;
            }
            return current;
        };

        if (rowIndex === 1 && columnIndex === 1) {
            return checkFirstDiagonal(rowIndex, columnIndex) || checkSecondDiagonal(rowIndex, columnIndex);
        } else if (rowIndex === columnIndex) {
            return checkFirstDiagonal(rowIndex, columnIndex);
        } else {
            return checkSecondDiagonal(rowIndex, columnIndex)
        }

    }


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
            return this.checkColumn(columnIndex);
        } else if (this.checkRow(rowIndex)) {
            return this.checkRow(rowIndex);
        }
        console.log(`diagonal ${rowIndex}${columnIndex}`, this.checkDiagonals(rowIndex, columnIndex))
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
        console.log(play.checkWinner(rowIndex, columnIndex))
        console.table(play._board)
    })
})