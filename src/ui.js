const UI = (function () {
  const BOARDSIZE = 10;

  function drawBoard(board, player) {
    const playerBoard = player.gameBoard.getBoard();

    for (let row = 0; row < BOARDSIZE; row++) {
      for (let col = 0; col < BOARDSIZE; col++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("row", row);
        square.setAttribute("col", col);

        if (playerBoard[row][col] !== 0 && player.identifier !== "enemy") {
          square.classList.add(playerBoard[row][col]);
        }
        if (playerBoard[row][col] === -1) {
          square.classList.add("miss");
        }

        if (playerBoard[row][col] === 1) {
          square.classList.add("hit");
        }

        board.appendChild(square);
      }
    }
  }

  return { drawBoard };
})();

export default UI;
