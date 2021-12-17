const gameBoard = (() => {
  //0=empty, 1=O, 2=X
  const board = [[0,0,0],
                 [1,1,1],
                 [2,2,2]];
  return {
    board
  };
})();
const gameHandler = (() => {
  //Function to refresh board
  const updateBoard = (board) => {
    const gameBoard = document.querySelector('.board');
    let tiles = gameBoard.children;
    let tilecounter = 0
    for (let i=0;i<3;i++){
      for (let j=0;j<3;j++){
        if (board[i][j] == 0){
          tiles[tilecounter].innerText = '';
        } else if (board[i][j] == 1){
          tiles[tilecounter].innerText = 'O';
        } else {
          tiles[tilecounter].innerText = 'X';
        }
        tilecounter++;
      }
    }
  };
  const resetGame = (board) => {
    const gameBoard = document.querySelector('.board');
    if (gameBoard.children.length == 0){
      for (let i=0;i<9;i++){
        let tile = document.createElement('div');
        tile.id = 'tile';
        gameBoard.appendChild(tile);
      }
    } else {
      for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
          board[i][j] == 0;
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
gameHandler.resetGame(gameBoard.board);
