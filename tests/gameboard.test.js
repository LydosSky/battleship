import GameBoard from "../src/gameboard";
const BOARD = [
  [0, 0, 0, 0, 0, "carrier", 0, 0, 0, 0],
  [
    "battleship",
    "battleship",
    "battleship",
    "battleship",
    0,
    "carrier",
    0,
    0,
    0,
    0,
  ],
  [0, 0, 0, 0, 0, "carrier", 0, 0, 0, 0],
  ["destroyer", 0, 0, 0, 0, "carrier", 0, 0, 0, 0],
  ["destroyer", 0, 0, 0, 0, "carrier", "cruiser", 0, 0, 0],
  [0, 0, 0, 0, 0, 0, "cruiser", 0, 0, 0],
  [0, 0, 0, 0, 0, 0, "cruiser", 0, "submarine", 0],
  [0, 0, 0, 0, 0, 0, 0, 0, "submarine", 0],
  [0, 0, 0, 0, 0, 0, 0, 0, "submarine", 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

describe("Testing Gameboard functionality", function () {
  let gameBoard;
  beforeAll(function () {
    gameBoard = new GameBoard();
    Object.defineProperty(gameBoard, "board", {
      value: BOARD,
      writeable: false,
    });
  });

  test("Gameboard object can be created", function () {
    expect(gameBoard.getBoard()[1]).toContain("battleship");
    expect(gameBoard.getBoard()[0]).toContain("carrier");
    expect(gameBoard.getBoard()[3]).toContain("destroyer");
    expect(gameBoard.getBoard()[7]).toContain("submarine");
    expect(gameBoard.getBoard()[6]).toContain("cruiser");
  });

  test("Gameboard receives attacks", function () {
    gameBoard.receiveAttack(1, 1);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.getState().misses).toEqual([[0, 0]]);
    expect(gameBoard.getState().hits).toEqual({
      battleship: { row: 1, col: 1 },
    });

    const ship = gameBoard.getShips()["battleship"];
    expect(ship.isSunk()).toEqual(false);
    expect(ship.getHits()).toEqual(1);
  });
});
