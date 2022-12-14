/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});

const prompt = require('prompt-sync')({ sigint: true });

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input

function markBoard(position, mark) {
    board[position] = mark.toUpperCase();
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log('\n' +
        ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' ---------\n' +
        ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' ---------\n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied

// parseInt(number); // it will convert the input to integer format
function isInt(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}


function validateMove(position) {
    
    // let position = parseInt(position);
    // if(position >= 1 && position <= 9){
    //     if(board[position] == ' '){
    //         return true;
    //     }
    // }
    // return false;

    return (isInt(position) && board[position] === ' ')
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    var i, j, markCount
    for (i = 0; i < winCombinations.length; i++) {
        markCount = 0;
        for (j = 0; j < winCombinations[i].length; j++) {
            if (board[winCombinations[i][j]] === player) {
                markCount++;
            }
            if (markCount === 3) {
                return true;
            }
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (var i = 1; i <= Object.keys(board).length; i++) {
        if (board[i] === ' ') {
            return false;
        }
    }
    return true;
}

function restartGame(){

    let restart = prompt("Do you want to restart the game ? Yes/No: ");
    while (restart){

        if(restart.toLowerCase() == 'yes'){

            board = {
                1: ' ', 2: ' ', 3: ' ',
                4: ' ', 5: ' ', 6: ' ',
                7: ' ', 8: ' ', 9: ' '
            };
            playTurn('X');
            break;

        }else if(restart.toLowerCase() == 'no'){
            console.log('Thanks for Playing, See you again !!!');
            break;
        }else{
            console.log('Ooops invalid input please try again!');
            restart = prompt("Do you want to restart the game ? Yes/No: ");

        }

    }
    
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let move = prompt(player + " 's turn, input: ");

    // prompt.start();


    // prompt.get(['position'], function (err, result) {

        if (validateMove(move) === true) {
            markBoard(move, player);
            printBoard();
            if (checkWin(player) === true) {
                console.log('Winner Winner!');
                // restart game
                restartGame();
                return;
            }
            if (checkFull() === true) {
                console.log('Tie Game');
                // restart game
                restartGame();
                return;
            }
            if (player === 'X') {
                playTurn('O');
            } else {
                playTurn('X');
            }
        } else {
            console.log('incorrect input please try again...');
            playTurn(player);
        }
    // });
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

//let winnerIdentified = false
let currentTurnPlayer = 'X'

//while (!winnerIdentified){
playTurn(currentTurnPlayer);

// feel free to add logic here if needed, e.g. announcing winner or tie



// Bonus Point: Implement the feature for the user to restart the game after a tie or game over