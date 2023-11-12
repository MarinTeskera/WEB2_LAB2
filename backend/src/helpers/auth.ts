const db = require("../../db/index");

export const register = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("username and password required");
  }

  const query = `INSERT INTO account (username, password) VALUES ('${username}', '${password}')`;

  try {
    await db.query(query);
    return username;
  } catch (err) {
    console.log("error", err);
    throw new Error("username already exists");
  }
};

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("username and password required");
  }

  const query = `SELECT username FROM account WHERE username = ${username} AND password = ${password}`;

  try {
    const user = await db.query(query);
    return user[0];
  } catch {
    throw new Error("username or password incorrect");
  }
};
