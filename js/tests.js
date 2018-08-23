QUnit.test("hello test", (assert) => {
  assert.ok(1 == "1", "Passed!");
});

QUnit.module("initializing game");
QUnit.test("player has 5 credits", (assert) => {
  assert.equal(gameState.playerCash, 5, "should be 5");
});
QUnit.test("credit box displays 5 credits", (assert) => {
  assert.equal($(".credits").text(), 5, "should be 5");
});
QUnit.test("player has 4 actions", (assert) => {
  assert.equal(gameState.playerClicks, 4, "should be 4");
});
QUnit.test("action box displays 4 actions", (assert) => {
  assert.equal($(".clicks").text(), 4, "should be 4");
});
QUnit.test("it's the player's turn", (assert) => {
  assert.equal(gameState.playersTurn, true, "should be true");
});
QUnit.test("the player's score is 0", (assert) => {
  assert.equal(gameState.playerScore, 0, "should be 0");
});
QUnit.test("player's scorebox displays 0", (assert) => {
  assert.equal($("#playerscore").text(), 0, "should be 0");
});
QUnit.test("the bank's score is 0", (assert) => {
  assert.equal(gameState.corpScore, 0, "should be 0");
});
QUnit.test("bank's scorebox displays 0", (assert) => {
  assert.equal($("#corpscore").text(), 0, "should be 0");
});
QUnit.test("all banks have 0 trucks", (assert) => {
  assert.equal($(".bank").data().trucks, 0, "should be 0");
});

QUnit.module("setting up game board");
QUnit.test("there are at least 5 security measures", (assert) => {
  const result = $(".security").length > 4;
  assert.ok(result, "should be true");
});

QUnit.module("making a run");
QUnit.test("we spend an action", (assert) => {
  const actions = gameState.playerClicks;
  $(".run-arrow:first").click();
  assert.equal(gameState.playerClicks, actions - 1, "should be true");
});
