export default class Ship {
  #hits;
  #length;
  #shipType;
  constructor(shipType, length) {
    this.#hits = 0;
    this.#length = length;
    this.#shipType = shipType;
  }

  getLength() {
    return this.#length;
  }

  getHits() {
    return this.#hits;
  }

  getShipType() {
    return this.#shipType;
  }

  hit() {
    this.#hits += 1;
  }

  isSunk() {
    return this.#hits === this.#length;
  }
}
