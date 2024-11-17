import UI from "./ui.js";
import Player from "./player.js";

const Controller = (function () {
  const playerBoard = document.querySelector("#player-board");
  const enemyBoard = document.querySelector("#enemy-board");
  let player, enemy;

  function isGameEnded() {
    return enemy.gameBoard.isShipsSunk() || player.gameBoard.isShipsSunk();
  }

  function clickHandler(event) {
    const row = event.target.getAttribute("row");
    const col = event.target.getAttribute("col");
    enemyBoard.innerText = "";
    enemy.gameBoard.receiveAttack(row, col);
    UI.drawBoard(enemyBoard, enemy);
    enemyBoard.classList.add("disable-element");

    if (isGameEnded()) return;

    setTimeout(function () {
      computerTurn();
    }, 500);
  }

  function computerTurn() {
    let row = randomNum();
    let col = randomNum();
    let hitOrMiss = player.gameBoard.receiveAttack(row, col);

    while (!hitOrMiss) {
      row = randomNum();
      col = randomNum();
      hitOrMiss = player.gameBoard.receiveAttack(row, col);
    }
    playerBoard.innerText = "";
    UI.drawBoard(playerBoard, player);

    if (isGameEnded()) return;
    enemyBoard.classList.remove("disable-element");
  }

  function randomNum() {
    return Math.floor(Math.random() * 10);
  }

  function startGame() {
    player = new Player("player");
    enemy = new Player("enemy");

    enemyBoard.addEventListener("click", clickHandler);
    UI.drawBoard(playerBoard, player);
    UI.drawBoard(enemyBoard, enemy);
  }

  return { startGame };
})();

export default Controller;
