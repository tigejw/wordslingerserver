const checkExists: Function = require("../../db/seeds/utils.ts");

describe("checkExists", () => {
  test("should return rejected promise with 404 status + msg when searching for a user that doesnt exist", () => {
    return expect(
      checkExists("users", "user_id", 3141592)
    ).rejects.toMatchObject({ status: 404, msg: "Not found!" });
  });
  test("should resolve if user exists", () => {
    return expect(checkExists("users", "user_id", 3)).resolves.toMatch(
      "It's alive!"
    );
  });
  test("should return rejected promise with 404 status + msg when searching for a username that doesnt exist", () => {
    return expect(
      checkExists("users", "username", "tjw")
    ).rejects.toMatchObject({ status: 404, msg: "Not found!" });
  });
  test("should resolve if word exists", () => {
    return expect(checkExists("words", "english", "ask")).resolves.toMatch(
      "It's alive!"
    );
  });
  test("should return rejected promise when searching for game that doesnt exist", () => {
    return expect(
      checkExists("games", "game_id", 31415926)
    ).rejects.toMatchObject({ status: 404, msg: "Not found!" });
  });
  test("should resolve if game exists", () => {
    return expect(checkExists("games", "game_id", 1)).resolves.toMatch(
      "It's alive!"
    );
  });
});
