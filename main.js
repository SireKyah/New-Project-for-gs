// Class Selector
gameBoard = document.querySelector('.board');
// Add players
const redPiece = -1;
const bluePiece = 1;
let boardState = 0;
let currentPlayer = redPiece;
let squareColor = null;
let occupied = null;
// Add board
// prettier-ignore
let board = [
  [ 0,  1,  0,  1,  0,  1,  0,  1],
  [ 1,  0,  1,  0,  1,  0,  1,  0],
  [ 0,  1,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  1,  0,  1,  0,  1,  0],
  [ 0,  0,  0, -1,  0, -1,  0,  0],
  [-1,  0,  0,  0,  0,  0,  1,  0],
  [ 0, -1,  0, -1,  0, -1,  0, -1],
  [-1,  0, -1,  0,  0,  0, -1,  0],
];
// add render the board
function renderBoard() {
    // - access the board by using the div
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const classSelector = `.c${i}r${j}`;
            const square = document.querySelector(classSelector);
            // - check if a player is already occupying a board
            //  -- If yes check which colour is it and make a piece a out of that colour and place it in that "square"
            if ((i + j) % 2 === 0) {
                square.style.backgroundColor = 'black';
                squareColor = 'blackSquare';
            } else {
                square.style.backgroundColor = 'white';
                squareColor = 'whiteSquare';
            }
            if (board[i][j] === redPiece) {
                square.style.backgroundColor = 'red';
            } else if (board[i][j] === bluePiece) {
                square.style.backgroundColor = 'blue';
            }
        }
    }
}
let playerMoving = false;
let initialClick = null;
let validMoves = [];
gameBoard.addEventListener('click', (event) => {
    const clickRow = Number(event.target.className[1]);
    const clickColumn = Number(event.target.className[3]);
    const pieceColour = board[clickRow][clickColumn];

    if (playerMoving) {
        // clickRow clickColumn are valid
        // based on validMoves
        // find the object inside validMoves with clickRow and clickColumn
        const validMove = validMoves.find((element) => {
            return element.row === clickRow && element.column === clickColumn;
        });
        if (!validMove) {
            console.log('cant do that');
            return;
        }
        board[initialClick.row][initialClick.column] = 0;
        board[clickRow][clickColumn] = currentPlayer;
        if (validMove.capture) {
            board[validMove.capture.row][validMove.capture.column] = 0;
        }
        renderBoard();
        currentPlayer *= -1;
        playerMoving = false;
        initialClick = null;
        return;
    }

    validMoves = findValidMoves(clickRow, clickColumn);
    console.log(validMoves);
    if (currentPlayer === pieceColour && validMoves.length) {
        console.log('You can move');
        playerMoving = true;
        initialClick = { row: clickRow, column: clickColumn };
    } else if (pieceColour === 0) {
        console.log("There's No Piece");
    } else if (currentPlayer !== pieceColour) {
        console.log('Wrong Colour Mate');
    } else {
        console.log('no valid moves');
    }
});

renderBoard();

function findValidMoves(row, column) {
    const availMoves = [];
    if (currentPlayer === -1) {
        const move1 = [row - 1, column + 1];
        const move2 = [row - 1, column - 1];

        // checks available move for the Red piece
        if (board[move1[0]][move1[1]] === 0) {
            availMoves.push({ row: move1[0], column: move1[1] });
            // checks if the available move is the opposite colour
        } else if (board[move1[0]][move1[1]] === 1) {
            // checks if the available moves behind the enemy piece is empty
            if (board[move1[0] - 1][move1[1] + 1] === 0) {
                // capture the piece
                availMoves.push({
                    row: move1[0] - 1,
                    column: move1[1] + 1,
                    capture: { row: move1[0], column: move1[1] },
                });
            }
        }

        if (board[move2[0]][move2[1]] === 0) {
            availMoves.push({ row: move2[0], column: move2[1] });
        } else if (board[move2[0]][move2[1]] === 1) {
            if (board[move2[0] - 1][move2[1] - 1] === 0) {
                availMoves.push({
                    row: move2[0] - 1,
                    column: move2[1] - 1,
                    capture: { row: move2[0], column: move2[1] },
                });
            }
        }
    } else if (currentPlayer === 1) {
        const move1 = [row + 1, column + 1];
        const move2 = [row + 1, column - 1];

        if (board[move1[0]][move1[1]] === 0) {
            availMoves.push({ row: move1[0], column: move1[1] });
        } else if (board[move1[0]][move1[1]] === -1) {
            if (board[move1[0] + 1][move1[1] + 1] === 0) {
                availMoves.push({
                    row: move1[0] + 1,
                    column: move1[1] + 1,
                    capture: { row: move1[0], column: move2[1] },
                });
            }
        }
        if (board[move2[0]][move2[1]] === 0) {
            availMoves.push({ row: move2[0], column: move2[1] });
        } else if (board[move2[0]][move2[1]] === -1) {
            if (board[move2[0] + 1][move2[1] - 1] === 0) {
                availMoves.push({
                    row: move2[0] + 1,
                    column: move2[1] - 1,
                    capture: { row: move2[0], column: move2[1] },
                });
            }
        }
    }
    return availMoves;
}

// for taking piecess
// -- see if current piece can go behind the other piece
// -- if yes, take the current position of the currentPiece and move it behind the taken piece.
// -- remove the taken piece and make it the next player turn

// Add The piece
//   --- Then make it the next players turn
//  -- If no make it that the "square" is empty.
// - Move the pieces
//  -- Move the pieces and delete the previous piece
//  -- if pieces can eat a different colour pieces, move the new pieces behind the eaten pieces and remove the other pieces to the board and also the previous pieces.
//   --- if pieces can eat more than one enemy pieces, eat all the enemy pieces and leave the piece that ate the enemy pieces behind the last enemy piece.
// - Only make the pieces move sideways
// - Only make the pieces move forward
// - Only make a pieces that reaches the end of the board have the ability to move backwards
// - Check winner
// -- Make the player without any pieces lose and vice versa
// --- Display a Which player won
// ---- Add a restart a button after a winner is selected.
// Add The Reset botton
// - when the reset botton is pressed, make the board back to its original places
