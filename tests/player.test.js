import Player from "../src/player";

describe("Player classs test suit", function () {
  test("Player object is createable", function () {
    const player = new Player();
    expect(player).toHaveProperty("gameBoard");
  });
});
