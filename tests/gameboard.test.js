import GameBoard from "../src/gameboard";

describe("Testing Gameboard functionality", function () {
  let gameBoard;

  beforeEach(function () {
    gameBoard = new GameBoard();
  });

  test("Gameboard object can be created", function () {
    expect(gameBoard.getBoard().length).toEqual(10);
  });
});
