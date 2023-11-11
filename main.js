// Class Selector
gameBoard = document.querySelector('.board');
playerTurn = document.querySelector('.player-turn');
redPlayerPiece = document.querySelector('.red-player-piece');
bluePlayerPiece = document.querySelector('.blue-player-piece');

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
            // board and piece colour
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
        const validMove = validMoves.find(
            // check for valid Moves
            (element) => {
                return (
                    element.row === clickRow && element.column === clickColumn
                );
            }
        );
        console.log(validMove);
        if (!validMove) {
            console.log('cant do that');
            return;
        }

        // remove pieces after capture
        board[initialClick.row][initialClick.column] = 0;
        board[clickRow][clickColumn] = currentPlayer;
        if (validMove.capture) {
            board[validMove.capture.row][validMove.capture.column] = 0;
        }
        renderBoard();
        checkPieces(board);
        currentPlayer *= -1;
        // Html element
        if (currentPlayer === 1) {
            playerTurn.innerHTML = `Blue's Turn`;
            playerTurn.style.color = 'blue';
        } else if (currentPlayer === -1) {
            playerTurn.innerHTML = `Red's Turn`;
            playerTurn.style.color = 'red';
        }

        if (redPieceCounter === 0) {
            playerTurn.innerHTML = `Blue's The Winner Yeahhhh`;
            playerTurn.style.color = 'blue';
            console.log('Blue Piece Won');
        } else if (bluePieceCounter === 0) {
            playerTurn.innerHTML = `Red's The Winner Yeahhhh`;
            playerTurn.style.color = 'red';
            console.log('Red Piece Won');
        } else if (redPieceCounter !== 0 && bluePieceCounter !== 0) {
            console.log('still playing');
        }
        console.log(redPieceCounter);
        console.log(bluePieceCounter);
        // red piece counter
        redPlayerPiece.innerHTML = `${redPieceCounter} red piece left`;
        redPlayerPiece.style.color = 'red';

        // blue piece counter
        bluePlayerPiece.innerHTML = `${bluePieceCounter} blue piece left`;
        bluePlayerPiece.style.color = 'blue';

        playerMoving = false;
        initialClick = null;
        return;
    }

    validMoves = findValidMoves(clickRow, clickColumn);
    console.log(validMoves);

    // check the initial click
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

        // capturing for Red piece player

        for (let m of moves) {
            const piece = board[m.row] && board[m.row][m.column];
            if (piece === 0 && m.dir.startsWith('n')) {
                delete m.dir;
                availMoves.push(m);
            } else if (m.row && piece === 1) {
                let move;
                // capturing for North Eats
                if (m.dir === 'ne') {
                    move = { row: m.row - 1, column: m.column + 1 };
                    // capturing for North West
                } else if (m.dir === 'nw') {
                    move = { row: m.row - 1, column: m.column - 1 };
                    // Capturing backwards for South East
                } else if (m.dir === 'se') {
                    move = { row: m.row + 1, column: m.column + 1 };
                    // Capturing backwards for South West
                } else if (m.dir === 'sw') {
                    move = { row: m.row + 1, column: m.column - 1 };
                }
                // Capturing and deleting piece
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
        // capturing for Blue piece player
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

// Counting Piece
function checkPieces(board) {
    redPieceCounter = 0;
    bluePieceCounter = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === -1) {
                redPieceCounter++;
            } else if (board[i][j] === 1) {
                bluePieceCounter++;
            }
        }
    }
}
renderBoard();
