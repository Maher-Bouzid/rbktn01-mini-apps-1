const cases = document.querySelectorAll(".playable")


class Game {
    constructor() {
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    };
    //calculate the score of the row
    checkRow(index) {
        let score = 0;
        for (var i = 0; i < 3; i++) {
            score += board[index][i];
        }
        return score;
    };

    //calculate the score of the column
    checkColumn(index) {
        let score = 0;
        for (var i = 0; i < 3; i++) {
            score += board[i][index];
        }
        return score;
    };

    //calculate the score of the diagonal
    checkDaiagonal(rowIndex, columnIndex) {
        let score = 0;

        while (rowIndex < 3) {
            score += board[rowIndex][columnIndex];
            rowIndex++;
            columnIndex++;
        }
        return score;
    };
}



//need to hundle the click event
//need to use forEach
cases.addEventListener("click", (e) => {
    console.log(e.target.id)
})