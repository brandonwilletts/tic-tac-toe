function gameboard() {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const addMarker = (x, y, marker) => board[x][y] = marker;
    const getBoard = () => board;
    


    return { addMarker, getBoard }
}

function gameController() {
    const board = gameboard();
    const players = [
        {
            id: "player1",
            wins: 0,
            marker: "X"
        },
        {
            id: "player2",
            wins: 0,
            marker: "O"
        }
    ];
    let activePlayer = players[0];
    let turns = 0;

    const getPlayers = function() {
        return players;
    }

    const switchActivePlayer = function() {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }
        
    const checkWinner = function() {
        const boardArray = board.getBoard();
        let result = false;

        let diagonalToCheckOne = [];
        let diagonalToCheckTwo = [];
        
        for (let i = 0; i < boardArray.length; i++) {
            let rowToCheck = boardArray[i];
            rowToCheck.every(item => item === activePlayer.marker) ? result = true : null;

            let columnToCheck = [];
            for (let j = 0; j < boardArray.length; j++) {
                columnToCheck[j] = boardArray[j][i];
            }
            columnToCheck.every(item => item === activePlayer.marker) ? result = true : null;

            diagonalToCheckOne[i] = boardArray[i][i];
            diagonalToCheckTwo[i] = boardArray[i][(boardArray.length - 1 - i)];
        }

        diagonalToCheckOne.every(item => item === activePlayer.marker) ? result = true : null;
        diagonalToCheckTwo.every(item => item === activePlayer.marker) ? result = true : null;

        return result
    }

    const playRound = function(row, col) {
        board.addMarker(row, col, activePlayer.marker);

        if (checkWinner()) {
            console.log(`${activePlayer.name} wins!`);
            activePlayer.wins++;
        } else if (!checkWinner() && turns === 9){
            console.log("Tie!");
        } 
        else {
            switchActivePlayer();
        }
        turns++;
    }

    const getActivePlayer = function() {
        return activePlayer
    }

    // const resetBoard = function() {
    //     for (let i = 0; i < board.length; i++){
    //         for (let j = 0; j < board[i].length; j++) {
    //             addMarker(i, j, "");
    //         }
    //     }
    // }
    
    return { 
        getPlayers, 
        getActivePlayer, 
        playRound,
        getBoard: board.getBoard,
        //resetBoard: board.resetBoard
     }

}

function screenController() {
    const game = gameController();
    const board = game.getBoard();
    const players = game.getPlayers();

    const boardContainer = document.querySelector(".board");
    boardContainer.addEventListener("click", boardClickHander);

    const getPlayerNames = function() {
        const form = document.querySelector("form");
        form.addEventListener("submit", event => {
            event.preventDefault();
            players[0].name = player1.value;
            players[1].name = player2.value;

            renderGameplay();
        });
    }

    const renderGameplay = function() {
        const formNames = document.querySelector("#form-names");
        formNames.style.cssText = "display: none;";

        const gameplay = document.querySelector("#gameplay");
        gameplay.style.cssText = "display: flex;";

        setDisplayText(`${game.getActivePlayer().name}'s turn`);
        renderScoreBoard();
        renderBoard();
    }

    const renderScoreBoard = function() {
        const player1Name = document.querySelector("#player1-name");
        player1Name.textContent = players[0].name;

        const player2Name = document.querySelector("#player2-name");
        player2Name.textContent = players[1].name;

        const player1Wins = document.querySelector("#player1-wins");
        player1Wins.textContent = `Wins: ${players[0].wins}`;

        const player2Wins = document.querySelector("#player2-wins");
        player2Wins.textContent = `Wins: ${players[1].wins}`;
    }

    const setDisplayText = function(text) {
        const display = document.querySelector(".display");
        display.textContent = text;
    }

    const renderBoard = function() {
        boardContainer.textContent = "";
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.column = j;
                square.dataset.row = i;
                square.textContent = board[i][j];
                boardContainer.appendChild(square);
            }
        }        
    }

    const updateBoard = function() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const square = document.querySelector(`[data-row="${i}"][data-column="${j}"]`)
                square.textContent = board[i][j];
            }
        } 
        setDisplayText(`${game.getActivePlayer().name}'s turn`);
        renderScoreBoard();
    }

    function boardClickHander (event) {
        const squareClicked = event.target;
        const rowClicked = squareClicked.dataset.row;
        const colClicked = squareClicked.dataset.column;

        if (rowClicked !== undefined && colClicked !== undefined && board[rowClicked][colClicked] === "") {
            game.playRound(rowClicked, colClicked);
            updateBoard();
        }
    }

    // const restartGameButton = document.querySelector("#restart");
    // restartGameButton.addEventListener("click", event => {
    //     //board.resetBoard();
    //     game.newGame();
    //     //updateBoard();
    //     console.table(board.getBoard());
    // })
        
    getPlayerNames();

}

screenController();