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

jest.mock("../src/gameboard");

GameBoard.mockImplementation(() => ({
  board: BOARD,
  getBoard: jest.fn(() => BOARD),
}));

describe("Testing Gameboard functionality", function () {
  const gameBoard = new GameBoard();

  test("Gameboard object can be created", function () {
    expect(gameBoard.getBoard()[1]).toContain("battleship");
    expect(gameBoard.getBoard()[0]).toContain("carrier");
    expect(gameBoard.getBoard()[3]).toContain("destroyer");
    expect(gameBoard.getBoard()[7]).toContain("submarine");
    expect(gameBoard.getBoard()[6]).toContain("cruiser");
  });
});
