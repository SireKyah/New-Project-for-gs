// Class Selector
gameBoard = document.querySelector('.board');
// Add players
const redPiece = 1;
const bluePiece = -1;
let boardState = 0;
let currentPlayer = redPiece;
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
gameBoard.addEventListener('click', (event) => {
    const clickColumn = event.target.className[1];
    const clickRow = event.target.className[3];
    const pieceColour = board[clickColumn][clickRow];
    console.log(playerMoving);
    if (playerMoving) {
        board[initialClick.column][initialClick.row] = 0;
        board[clickColumn][clickRow] = currentPlayer;
        console.log(clickColumn, clickRow);
        renderBoard();
        currentPlayer *= -1;
        playerMoving = false;
        initialClick = null;
    }
    if (currentPlayer === pieceColour) {
        console.log('You can move');
        playerMoving = true;
        initialClick = { row: clickRow, column: clickColumn };
    } else if (pieceColour === 0) {
        console.log("There's No Piece");
    } else if (currentPlayer !== pieceColour) {
        console.log('Wrong Colour Mate');
    }
    console.log(board[clickColumn][clickRow]);
});
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
