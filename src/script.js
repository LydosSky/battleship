import UI from "./ui.js";
import Player from "./player.js";

const Controller = (function () {
  const playerBoard = document.querySelector("#player-board");
  const enemyBoard = document.querySelector("#enemy-board");

  const player = new Player();
  const enemy = new Player();

  function clickHandler(event) {
    const row = event.target.getAttribute("row");
    const col = event.target.getAttribute("col");
    enemy.gameBoard.receiveAttack(row, col);
    enemyBoard.innerText = "";
    UI.drawBoard(enemyBoard, enemy);
  }

  function startGame() {
    enemyBoard.addEventListener("click", clickHandler);

    UI.drawBoard(playerBoard, player);
    UI.drawBoard(enemyBoard, enemy);
  }

  return { startGame };
})();

Controller.startGame();
