import { registerInputError } from '../Register';

describe("register", () => {
    test("validate register input username.length >= 3 password.length >= 6", () => {
      const username = "test";
      const password = "testtest";
      expect(registerInputError(username, password)).toBe(false);
    })
    test("validate register input return err message on no username", () => {
      const username = "";
      const password = "testtest";
      expect(registerInputError(username, password)).toBe("Missing username");
    })
    test("validate register input return err message on no password", () => {
      const username = "test";
      const password = "";
      expect(registerInputError(username, password)).toBe("Missing password");
    })
    test("validate register input return err message on username.length < 3", () => {
      const username = "te";
      const password = "testtest";
      expect(registerInputError(username, password)).toBe("Username should be longer than 3 characters");
    })
    test("validate register input return err message on username.password < 6", () => {
      const username = "test";
      const password = "test";
      expect(registerInputError(username, password)).toBe("Password should be longer than 6 characters");
    })
  });