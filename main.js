// Class Selector
const pieces = document.querySelector('.pieces');
// Add players
const whitePiece = 1;
const blackPiece = -1;
let boardState = 0;
let currentPlayer = null;
let squareColor = null;
let occupied = null;
// Add board
let board = [
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
];
// add render the board
function renderBoard() {
    // - access the board by using the div
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const classSelector = `.c${i}r${j}`;
            const square = document.querySelector(classSelector);
            const blackPieceSelector = `blackPiece-c${i}r${j}`;
            const whitePieceSelector = `whitePiece-c${i}r${j}`;

            // - check if a player is already occupying a board
            //  -- If yes check which colour is it and make a piece a out of that colour and place it in that "square"
            if (board[i] / 2 && board[i][j] / 2) {
                square.style.backgroundColor = 'black';
                squareColor = 'blackSquare';
            } else {
                square.style.backgroundColor = 'white';
                squareColor = 'whiteSquare';
            }
            // Add The piece
            if ((board[i][j] = blackPiece)) {
                player1 = document.querySelector(blackPieceSelector);
                occupied = player1;
            } else if ((board[i][j] = whitePiece)) {
                player2 = document.querySelector(whitePieceSelector);
                occupied = player2;
            } else {
                occupied = 'empty';
            }
        }
    }
}
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
