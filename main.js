// Class Selector
gameBoard = document.querySelector('.board');
playerTurn = document.querySelector('.player-turn');
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
  [ 0,  1,  0,  1,  0,  1,  0,  1],
  [ 0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0],
  [-1,  0, -1,  0, -1,  0, -1,  0],
  [ 0, -1,  0, -1,  0, -1,  0, -1],
  [-1,  0, -1,  0, -1,  0, -1,  0],
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
                square.style.backgroundColor = 'rgb(237, 104, 104)';
            } else if (board[i][j] === bluePiece) {
                square.style.backgroundColor = 'rgb(81, 81, 225)';
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
        console.log(validMove);
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
        if (clickRow === 7) {
            playerTurn.innerHTML = 'Blue is the winner';
            playerTurn.style.color = 'rgb(81, 81, 225)';
            return;
        }
        if (clickRow === 0) {
            playerTurn.innerHTML = 'Red is the winner';
            playerTurn.style.color = 'rgb(237, 104, 104)';
            return;
        }
        currentPlayer *= -1;
        if (currentPlayer === 1) {
            playerTurn.innerHTML = `Blue's Turn`;
            playerTurn.style.color = 'blue';
        } else if (currentPlayer === -1) {
            playerTurn.innerHTML = `Red's Turn`;
            playerTurn.style.color = 'red';
        }
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

function findValidMoves(row, column) {
    const availMoves = [];
    if (currentPlayer === -1) {
        const moves = [
            { row: row - 1, column: column + 1, dir: 'ne' },
            { row: row - 1, column: column - 1, dir: 'nw' },
            { row: row + 1, column: column + 1, dir: 'se' },
            { row: row + 1, column: column - 1, dir: 'sw' },
        ];

        for (let m of moves) {
            const piece = board[m.row] && board[m.row][m.column];
            if (piece === 0 && m.dir.startsWith('n')) {
                delete m.dir;
                availMoves.push(m);
            } else if (m.row && piece === 1) {
                let move;
                if (m.dir === 'ne') {
                    move = { row: m.row - 1, column: m.column + 1 };
                } else if (m.dir === 'nw') {
                    move = { row: m.row - 1, column: m.column - 1 };
                } else if (m.dir === 'se') {
                    move = { row: m.row + 1, column: m.column + 1 };
                } else if (m.dir === 'sw') {
                    move = { row: m.row + 1, column: m.column - 1 };
                }
                if (board[move.row][move.column] === 0) {
                    delete m.dir;
                    move.capture = m;
                    availMoves.push(move);
                }
            }
        }
    } else if (currentPlayer === 1) {
        const moves = [
            { row: row + 1, column: column - 1, dir: 'sw' },
            { row: row + 1, column: column + 1, dir: 'se' },
            { row: row - 1, column: column - 1, dir: 'nw' },
            { row: row - 1, column: column + 1, dir: 'ne' },
        ];

        for (let m of moves) {
            const piece = board[m.row] && board[m.row][m.column];
            if (piece === 0 && m.dir.startsWith('s')) {
                delete m.dir;
                availMoves.push(m);
            } else if (piece === -1) {
                let move;
                if (m.dir === 'nw') {
                    move = { row: m.row - 1, column: m.column - 1 };
                } else if (m.dir === 'ne') {
                    move = { row: m.row - 1, column: m.column + 1 };
                } else if (m.dir === 'sw') {
                    move = { row: m.row + 1, column: m.column - 1 };
                } else if (m.dir === 'se') {
                    move = { row: m.row + 1, column: m.column + 1 };
                }
                if (board[move.row][move.column] === 0) {
                    delete m.dir;
                    move.capture = m;
                    availMoves.push(move);
                }
            }
        }
    }
    return availMoves;
}

function checkPieces() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === -1) {
                redPieceCounter++;
            } else if (board[i][j] === 1) {
                bluePieceCounter++;
            }
            if (redPieceCounter === 0) {
                console.log('Blue Piece Won');
            } else if (bluePieceCounter === 0) {
                console.log('Red Piece Won');
            }
        }
    }
}
renderBoard();

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
