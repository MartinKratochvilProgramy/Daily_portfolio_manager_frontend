import React from 'react';
import { loginInputError } from '../Login';

describe("login", () => {
  test("validate login input", () => {
    const username = "test";
    const password = "test";
    expect(loginInputError(username, password)).toBe(false);
  });

  test("validate login input return err message on no username", () => {
    const username = "";
    const password = "test";
    expect(loginInputError(username, password)).toBe("Missing username");
  });

  test("validate login input return err message on no password", () => {
    const username = "test";
    const password = "";
    expect(loginInputError(username, password)).toBe("Missing password");
  });

});