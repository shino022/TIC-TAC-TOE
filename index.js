const Dom = (function() {
  function getTable() {
    const cellList = document.querySelectorAll('.board div');
    const cellTable = [['','',''],['','',''],['','','']];
    for(let i = 0; i < 9; i++) {
      cellTable[Math.floor(i/3)][i%3] = cellList[i];
    }
    return cellTable;
  }
  function print(str) {
    const text = document.querySelector('.text');
    text.textContent = str;
  }
  const button = document.querySelector('button').addEventListener('click', setName);
  function setName(){
    const p1Name = document.querySelector('#player1').value;
    const p2Name = document.querySelector('#player2').value;

    player1.setName(p1Name);
    player2.setName(p2Name);
    console.log(player1.getName());

  }
  
  return {getTable, print};
})()

const GameBoard = (function() {
  let gameboard = [['','','']
                  ,['','','']
                  ,['','','']];
  let counter = 0;
  const cellTable = Dom.getTable();
  function _clickListener(e) {
    const cell = e.target;
    const row = parseInt(cell.classList[0][1]);
    const col = parseInt(cell.classList[1][1]);

    if(e.srcElement.innerText !== ''){
      return;
    }

    if(player1.checkTurn()){
      gameboard[row][col] = 'O';
      cell.textContent = 'O';
    } 
    else {
      gameboard[row][col] = 'X';
      cell.textContent = 'X';
    }
    
    counter++;
    if(counter === 9) {
      Dom.print('Draw');
      setTimeout(resetGame, 5000);
    }

    player1.toggleTurn();
    player2.toggleTurn();

    if(_checkThreeInARow(row, col)) {
      let winner;
      if(!player1.checkTurn()){
        winner = player1;
      }
      else {
        winner = player2;
      }
      Dom.print(`${winner.getName()} win!`);
      setTimeout(resetGame, 5000);
    }
    
  }

  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      cellTable[i][j].addEventListener('click', _clickListener);
    }
  }
  function _checkThreeInARow(row, col) {
    if(gameboard[row][0] === gameboard[row][1] &&
        gameboard[row][1] === gameboard[row][2]) {
      return true;
    }
    else if(gameboard[0][col] === gameboard[1][col] &&
            gameboard[1][col] === gameboard[2][col]) {
      return true;
    }
    if((row % 2 == 0 && col % 2 == 0) || row == 1 && col == 1) {
      if((gameboard[0][0] == gameboard[1][1] &&
          gameboard[1][1] == gameboard[2][2] &&
          gameboard[row][col] == gameboard[2][2]) ||
         (gameboard[0][2] == gameboard[1][1] &&
          gameboard[1][1] == gameboard[2][0] &&
          gameboard[row][col] == gameboard[2][0])) {
            return true;
          }
    }
    return false;
  }
  function resetGame() {
    gameboard = [['','','']
                    ,['','','']
                    ,['','','']];
    counter = 0;
    let table = Dom.getTable();
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        cellTable[i][j].textContent = "";
      }
    }
    Dom.print('');
  }
  function getGameBoard() {
    return gameboard;
  }
  return {getGameBoard};
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

function Player (name, turn){
  this.name = name;
  this.turn = turn;
  const checkTurn = () => this.turn;
  const toggleTurn = () => {
    this.turn = !this.turn;
  };
  function setName(name) {this.name = name};
  const getName = ()=> this.name;
  return {getName, setName, toggleTurn, checkTurn};
}
DisplayController.display(GameBoard.getGameBoard());
const player1 = new Player('Player1', true);
const player2 = new Player('Player2', false);