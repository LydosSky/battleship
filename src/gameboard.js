import Ship from "./ship.js";

export default class GameBoard {
  #boardSize = 10;
  #state;
  #ships;
  constructor() {
    this.board = new Array(this.#boardSize);
    for (let i = 0; i < this.#boardSize; i++) {
      this.board[i] = new Array(this.#boardSize).fill(0);
    }

    this.#ships = {
      carrier: new Ship("carrier", 5),
      battleship: new Ship("battleship", 4),
      cruiser: new Ship("cruiser", 3),
      submarine: new Ship("submarine", 3),
      destroyer: new Ship("destroyer", 2),
    };

    this.#state = {
      hits: {},
      misses: [],
      sunked: {},
    };

    this.#placeShips();
  }

  getBoard() {
    return this.board;
  }

  getShips() {
    return this.#ships;
  }

  getState() {
    return this.#state;
  }

  /**
   * Checks whether of not all of the ships sunked
   * @returns {boolean}
   */
  isShipsSunk() {
    return Object.values(this.#ships).reduce(
      (prev, curr) => prev && curr.isSunk(),
      true,
    );
  }

  /**
   * Receives attack done by player
   * and registers it as hit or miss
   * also signals the hit ship
   * @param {number} row
   * @param {number} col
   * @returns {boolean} turn if hit or mis false if it is already hit or missed
   * It changes the board according to miss or hit
   * if it is miss 0 replaced with -1
   * if it is hit  0 replaced with 1
   */
  receiveAttack(row, col) {
    if (
      row >= this.#boardSize ||
      row < 0 ||
      col >= this.#boardSize ||
      col < 0 ||
      this.board[row][col] === 1 ||
      this.board[row][col] === -1
    )
      return false;

    if (this.board[row][col] === 0) {
      this.#state.misses.push([row, col]);
      this.board[row][col] = -1;
    } else {
      const shipType = this.board[row][col];
      this.#state.hits[shipType] = { row, col };
      this.#ships[shipType].hit();
      this.board[row][col] = 1;
    }

    return true;
  }

  // Places every ship that is created
  #placeShips() {
    for (let ship in this.#ships) {
      let placed = false;
      while (!placed) {
        let row = this.#randomCoord();
        let col = this.#randomCoord();
        let direction = this.#randomCoord() > 4 ? "horizontal" : "vertical";
        if (this.#checkBoundary(ship, row, col, direction)) {
          this.#placeShip(ship, row, col, direction);
          placed = true;
        }
      }
    }
  }

  // Places given ship into its position according
  // to direction and starting position by row and col
  #placeShip(ship, row, col, direction) {
    let shipLength = this.#getShipLength(ship);
    let shipType = this.#getShipType(ship);
    if (direction === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        this.board[row][col + i] = shipType;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        this.board[row + i][col] = shipType;
      }
    }
  }

  #randomCoord() {
    return Math.floor(Math.random() * this.#boardSize);
  }

  // checks a ship can placed horizontally or vertically
  #checkBoundary(ship, row, col, direction) {
    let shipLength = this.#getShipLength(ship);
    if (direction === "horizontal") {
      if (col + shipLength >= this.#boardSize) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (this.board[row][col + i] != 0) return false;
      }
    } else if (direction === "vertical") {
      if (row + shipLength >= this.#boardSize) {
        return false;
      }

      for (let i = 0; i < shipLength; i++) {
        if (this.board[row + i][col] != 0) return false;
      }
    }

    return true;
  }

  #getShipLength(ship) {
    return this.#ships[ship].getLength();
  }

  #getShipType(ship) {
    return this.#ships[ship].getShipType();
  }
}
