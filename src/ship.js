export default class Ship {
  #hits;
  #length;
  constructor(length) {
    this.#hits = 0;
    this.#length = length;
  }

  getLength() {
    return this.#length;
  }

  hit() {
    this.#hits += 1;
  }

  getHits() {
    return this.#hits;
  }

  isSunk() {
    return this.#hits === this.#length;
  }
}
