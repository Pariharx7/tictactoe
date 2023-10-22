const createPlayer = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    let board = [];
    for(i = 0; i < 9; i++){
        board.push('');
    }

    let playBoxes = document.querySelector('.play-boxes');
    board.forEach((item, index) => {
        const playBox = document.createElement('div');
        playBox.className = 'play-box';
        playBoxes.appendChild(playBox);
        // console.log("EXEUTES !!");
    }) 
    Array.from(playBoxes.children).forEach((playBox, index) => {
        playBox.addEventListener('click', () => {
            playBox.classList.add(game.activePlayer.marker);
            playBox.setAttribute('data', game.activePlayer.marker);
            board[index] = game.activePlayer.marker;
            playBox.style.pointerEvents = 'none';
            game.remnSpots -= 1;
            game.checkWinner();
            
            if(game.winnerDeclared == false){
                if(game.remnSpots > 0){
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if(game.remnSpots == 0){
                    game.declareTie();
                    console.log("Works :D");
                }
            }
        })
    })
    return{
        board
    };
})();


const game = (() => {
    const playerOne = createPlayer('Player 1', 'x-mark');
    const playerTwo = createPlayer('Player 2', 'zero-mark');

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remnSpots = 9;
    let subtext = document.querySelector('.subtext');
    let playerName = document.querySelector('.player-name');

    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function checkWinner() {
        winningAxes.forEach((item, index) => {
            if(gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker){
                console.log('Winner!');
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`
                this.winnerDeclared = true;
            }
        })
    }

    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
    }

    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
        console.log('nextPlayer() function ran');
        console.log('active player: ' + activePlayer.name );
    }

    function declareTie() {
        subtext.innerHTML = `<b>Game Tied!</b>`;
    }

    return{
        activePlayer,
        remnSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared
    };
})();