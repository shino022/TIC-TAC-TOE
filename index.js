const GameBoard = (function() {
  let gameboard = [['O','X','O']
                  ,['X','O','O']
                  ,['O','X','X']];
  return {gameboard};
})()



const displayController = (function() {
  const cellList = document.querySelectorAll('.board div');
  const cellTable = [['','',''],['','',''],['','','']];

  for(let i = 0; i < 9; i++) {
    cellTable[Math.floor(i/3)][i%3] = cellList[i];
  }

  function display(gameboard) {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        cellTable[i][j].textContent = gameboard[i][j];
      }
    }
    
  }
  return {display};
})();

displayController.display(GameBoard.gameboard);

const Player = (name) => {
  const getName = () => name;
  return {getName}
}

