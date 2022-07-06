const GameBoard = (function() {
  const cellList = document.querySelectorAll('.board div');
  
  let gameboard = [['O','X','O']
                  ,['X','O','O']
                  ,['O','X','X']];
  function getGameBoard() {
    return gameboard;
  }
  return {getGameBoard};
})()

const Dom = (function() {
  function getTable() {
    const cellList = document.querySelectorAll('.board div');
    const cellTable = [['','',''],['','',''],['','','']];
    for(let i = 0; i < 9; i++) {
      cellTable[Math.floor(i/3)][i%3] = cellList[i];
    }
    return cellTable;
  }
  return {getTable};
})()


const DisplayController = (function() {
  function display(gameboard) {
    cellTable = Dom.getTable();
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        cellTable[i][j].textContent = gameboard[i][j];
      }
    }
    
  }
  return {display};
})();

DisplayController.display(GameBoard.getGameBoard());

const Player = (name) => {
  const getName = () => name;
  return {getName};
}

const player1 = Player('Kim');
const player2 = Player('Lee');




