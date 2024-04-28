function gameboard() {
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const renderBoard = () => console.table(board);
    const addMarker = (x, y, marker) => board[y][x] = marker;
    const getBoard = () => board;

    return { renderBoard, addMarker, getBoard }
}

function gameController() {
    const board = gameboard();
    const players = [
        {
            id: "player1",
            marker: "X"
        },
        {
            id: "player2",
            marker: "O"
        }
    ];

    const getPlayers = function() {
        return players;
    }

    let activePlayer = players[0];
    let turns = 0;

    const playGame = function() {    
        console.log(`${players[0].name} versus ${players[1].name}! Let's go!`);
        board.renderBoard();
        playRound();
    }

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

    const playRound = function() {
        console.log(`${activePlayer.name}'s turn`)

        // let playerSelectionX = prompt("Enter X-coordinate (0-2)");
        // let playerSelectionY = prompt("Enter Y-coordinate (0-2)");
        
        board.addMarker(playerSelectionX, playerSelectionY, activePlayer.marker);
        board.renderBoard();
        turns++;
        
        if (checkWinner(activePlayer)) {
            console.log(`${activePlayer.name} wins!`)
        } else if (!checkWinner(activePlayer) && turns === 9){
            console.log("Tie!");
        } 
        else {
            switchActivePlayer();
            playRound();
        }
    }
    
    return { getPlayers, playGame }

}

function screenController() {
    const game = gameController();
    const players = game.getPlayers();

    const setPlayerNames = function() {
        const form = document.querySelector("form");
        form.addEventListener("submit", event => {
            event.preventDefault();
            players[0].name = player1.value;
            players[1].name = player2.value;
            console.log(`Player 1 is ${players[0].name}, Player 2 is ${players[1].name}`);
        })
    }

    setPlayerNames();

}

screenController();