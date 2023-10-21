// Add players
const whitePiece = 1;
const BlackPiece = -1;
const BlankSquare = 0;
// Add board
let board = [
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
];
// add render the board
function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const classSelector = `.c${i}r${j}`;
            const square = document.querySelector(classSelector);
            if (board[i][j] === 1) {
                square.style.backgroundColor = 'white';
            } else if (board[i][j] === -1) {
                square.style.backgroundColor = 'black';
            }
        }
    }
}
// - access the board by using the div
// - check if a player is already occupying a board
//  -- If yes check which colour is it and make a piece a out of that colour and place it in that "square"
//   --- Then make it the next players turn
//  -- If no make it that the "square" is empty.
// Add The piece
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
