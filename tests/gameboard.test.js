import GameBoard from "../src/gameboard";

describe("Testing Gameboard functionality", function () {
  let gameBoard;
  beforeEach(function () {
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

    expect(gameBoard.receiveAttack(0, 0)).toEqual(false);
    expect(gameBoard.getState().misses).toEqual([[0, 0]]);
    expect(gameBoard.getState().hits).toEqual({
      battleship: { row: 1, col: 1 },
    });

    const ship = gameBoard.getShips()["battleship"];
    expect(ship.isSunk()).toEqual(false);
    expect(ship.getHits()).toEqual(1);
  });

  test("Gameboard report whether or not all of the ships have been sunk", function () {
    // Sunk carrier
    gameBoard.receiveAttack(0, 5);
    gameBoard.receiveAttack(1, 5);
    gameBoard.receiveAttack(2, 5);
    gameBoard.receiveAttack(3, 5);
    gameBoard.receiveAttack(4, 5);

    // sunk battleship
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(1, 1);
    gameBoard.receiveAttack(1, 2);
    gameBoard.receiveAttack(1, 3);

    // sunk cruiser
    gameBoard.receiveAttack(4, 6);
    gameBoard.receiveAttack(5, 6);
    gameBoard.receiveAttack(6, 6);

    // sunk submarine
    gameBoard.receiveAttack(6, 8);
    gameBoard.receiveAttack(7, 8);
    gameBoard.receiveAttack(8, 8);

    expect(gameBoard.isShipsSunk()).toEqual(false);

    // sunk destroyer
    gameBoard.receiveAttack(3, 0);
    gameBoard.receiveAttack(4, 0);

    expect(gameBoard.isShipsSunk()).toEqual(true);
  });
});
