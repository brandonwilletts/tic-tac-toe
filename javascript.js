function gameboard() {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    //const renderBoard = () => console.table(board);
    const addMarker = (x, y, marker) => board[x][y] = marker;
    const getBoard = () => board;

    //deleted renderBoard
    return { addMarker, getBoard }
}

function gameController() {
    const board = gameboard();
    
    // const getBoard = function() {
    //     return board.getBoard();
    // }

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

    const getPlayers = function() {
        return players;
    }

    let activePlayer = players[0];
    let turns = 0;

    //delete?
    // const playGame = function() {    
    //     console.log(`${players[0].name} versus ${players[1].name}! Let's go!`);
    //     board.renderBoard();
    //     playRound();
    // }

    const switchActivePlayer = function() {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }
    
    const checkWinner = function(player) {
        const boardArray = board.getBoard();
        let result = false;

        let diagonalToCheckOne = [];
        let diagonalToCheckTwo = [];
        
        for (let i = 0; i < boardArray.length; i++) {
            let rowToCheck = boardArray[i];
            rowToCheck.every(item => item === player.marker) ? result = true : null;

            let columnToCheck = [];
            for (let j = 0; j < boardArray.length; j++) {
                columnToCheck[j] = boardArray[j][i];
            }
            columnToCheck.every(item => item === player.marker) ? result = true : null;

            diagonalToCheckOne[i] = boardArray[i][i];
            for (let k = (boardArray[i].length - 1); k >= 0; k--){
                diagonalToCheckTwo[i] = boardArray[i][k];
            }
        }

        diagonalToCheckOne.every(item => item === player.marker) ? result = true : null;
        diagonalToCheckTwo.every(item => item === player.marker) ? result = true : null;

        return result
    }

    const playRound = function(row, column) {
        console.log(`${activePlayer.name}'s turn`)
        board.addMarker(row, column, activePlayer.marker);
        turns++;
        
        if (checkWinner(activePlayer)) {
            console.log(`${activePlayer.name} wins!`);
            activePlayer.wins++;
        } else if (!checkWinner(activePlayer) && turns === 9){
            console.log("Tie!");
        } 
        else {
            switchActivePlayer();
            playRound();
        }
    }
    
    return { 
        getPlayers, 
        //playGame, 
        activePlayer, 
        playRound }

}

function screenController() {
    const game = gameController();
    const board = gameboard();
    const players = game.getPlayers();
    const activePlayer = game.activePlayer;
    const getBoard = function() {
        return board.getBoard();
    }

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

        setDisplayText(`${activePlayer.name}'s turn`)
    }

    const setDisplayText = function(text) {
        const display = document.querySelector(".display");
        display.textContent = text;
    }

    const renderBoard = function() {
        const board = getBoard();
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
        const board = getBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const square = document.querySelector(`[data-row="${i}"][data-column="${j}"]`)
                square.textContent = board[i][j];
            }
        } 
    }

    function boardClickHander (event) {
        const squareClicked = event.target;
        if (squareClicked.dataset.row !== undefined && squareClicked.dataset.column !== undefined) {
            board.addMarker(squareClicked.dataset.row, squareClicked.dataset.column, activePlayer.marker);
        }
        updateBoard();
    }
        
    getPlayerNames();

    
    return { setDisplayText }

}

screenController();