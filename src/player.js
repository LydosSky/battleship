import GameBoard from "./gameboard.js";

export default class Player {
  constructor(identifier) {
    this.identifier = identifier;
    this.gameBoard = new GameBoard();
  }
}
