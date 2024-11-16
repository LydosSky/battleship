import Ship from "../src/ship";

describe("Testing ship functionality", function () {
  let carrier, battleship, cruiser, submarine, destroyer;

  beforeEach(function () {
    carrier = new Ship("carrier", 5);
    battleship = new Ship("battleship", 4);
    cruiser = new Ship("cruiser", 3);
    submarine = new Ship("submarine", 3);
    destroyer = new Ship("destroyer", 2);
  });

  test("You can create a ship with given length", function () {
    expect(carrier.getLength()).toBe(5);
    expect(battleship.getLength()).toBe(4);
    expect(cruiser.getLength()).toBe(3);
    expect(submarine.getLength()).toBe(3);
    expect(destroyer.getLength()).toBe(2);
  });

  test("You can get ships type", function () {
    expect(carrier.getShipType()).toEqual("carrier");
    expect(battleship.getShipType()).toEqual("battleship");
    expect(cruiser.getShipType()).toEqual("cruiser");
    expect(submarine.getShipType()).toEqual("submarine");
    expect(destroyer.getShipType()).toEqual("destroyer");
  });

  test("You can hit a ship and learn the number of hits on it.", function () {
    carrier.hit();
    cruiser.hit();
    cruiser.hit();
    expect(carrier.getHits()).toBe(1);
    expect(battleship.getHits()).toBe(0);
    expect(cruiser.getHits()).toBe(2);
  });

  test("You can check if a ship is sunk or not", function () {
    destroyer.hit();
    expect(destroyer.isSunk()).toBe(false);
    destroyer.hit();
    expect(destroyer.isSunk()).toBe(true);
  });
});
