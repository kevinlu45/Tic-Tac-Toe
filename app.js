const gameBoard = (() => {
  //0=empty, 1=O, 4=X
  const board = [[0,0,0],
                 [0,0,0],
                 [0,0,0]];
  const turn = 1;
  const hasWinner = false;
  return {
    board,
    turn,
    hasWinner
  };
})();
const gameHandler = (() => {
  const sum = (A) => {
    let total = 0;
    for (let i = 0;i<A.length;i++){
      total += A[i];
    }
    return total;
  };
  const checkForWinner = (b) => {
    if (sum(b[0]) == 3 ||
        sum(b[1]) == 3 ||
        sum(b[2]) == 3 ||
        sum([b[0][0],b[1][0],b[2][0]]) == 3 ||
        sum([b[0][1],b[1][1],b[2][1]]) == 3 ||
        sum([b[0][2],b[1][2],b[2][2]]) == 3 ||
        sum([b[0][0],b[1][1],b[2][2]]) == 3 ||
        sum([b[0][2],b[1][1],b[2][0]]) == 3){
          return 1;
        }
    if (sum(b[0]) == 12 ||
        sum(b[1]) == 12 ||
        sum(b[2]) == 12 ||
        sum([b[0][0],b[1][0],b[2][0]]) == 12 ||
        sum([b[0][1],b[1][1],b[2][1]]) == 12 ||
        sum([b[0][2],b[1][2],b[2][2]]) == 12 ||
        sum([b[0][0],b[1][1],b[2][2]]) == 12 ||
        sum([b[0][2],b[1][1],b[2][0]]) == 12){
          return 4;
        }
    return 0;
  };
  const displayTurn = (board) => {
    if (board.hasWinner) { return; }
    const arrow1 = document.getElementById('pointer1');
    const arrow2 = document.getElementById('pointer2');
    if (board.turn == 1){
      arrow2.style.visibility = "hidden";
      arrow1.style.visibility = "visible";
    } else if (board.turn == 4){
      arrow1.style.visibility = "hidden";
      arrow2.style.visibility = "visible";
    }
  };
  const displayWinner = (winner) => {
    const arrow1 = document.getElementById('pointer1');
    const arrow2 = document.getElementById('pointer2');
    arrow1.style.visibility = "hidden";
    arrow2.style.visibility = "hidden";
    if (winner == 1){
      const winnerText1 = document.getElementById('winner1');
      winnerText1.innerText = "wins!";
    } else if (winner == 4){
      const winnerText2 = document.getElementById('winner2');
      winnerText2.innerText = "wins!";
    }
  };

  //Function to refresh board
  const updateBoard = (board) => {
    const gameBoard = document.querySelector('.board');
    let tiles = gameBoard.children;
    let tilecounter = 0
    for (let i=0;i<3;i++){
      for (let j=0;j<3;j++){
        if (board.board[i][j] == 0){
          tiles[tilecounter].innerText = '';
        } else if (board.board[i][j] == 1){
          tiles[tilecounter].innerText = 'O';
        } else {
          tiles[tilecounter].innerText = 'X';
        }
        tilecounter++;
      }
    }
    let winner = checkForWinner(board.board);
    if (winner == 1 || winner == 4){
      displayWinner(winner);
      board.hasWinner = true;
    }
    displayTurn(board);
  };
  const resetGame = (board) => {
    displayTurn(board);
    const gameBoard = document.querySelector('.board');
    board.turn = 1;
    board.hasWinner = false;
    const winnerText1 = document.getElementById('winner1');
    winnerText1.innerText = "";
    const winnerText2 = document.getElementById('winner2');
    winnerText2.innerText = "";
    if (gameBoard.children.length == 0){
      for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
          let tile = document.createElement('div');
          tile.classList.add('tile');
          tile.id = `${i},${j}`;
          tile.addEventListener('click',function(){
            if (board.board[this.id.split(',')[0]][this.id.split(',')[1]] == 0 && !board.hasWinner){
              board.board[this.id.split(',')[0]][this.id.split(',')[1]] = board.turn;
              if (board.turn == 1){
                board.turn = 4;
              } else {
                board.turn = 1;
              }
              updateBoard(board);
            }
          });
          gameBoard.appendChild(tile);
        }
      }
    } else {
      for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
          board.board[i][j] = 0;
        }
      }
      updateBoard(board);
    }
  }
  return {
    updateBoard,
    resetGame
  };
})();
const Player = () => {
  const score = 0;
  return {score};
};
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function(){gameHandler.resetGame(gameBoard);});
gameHandler.resetGame(gameBoard);
