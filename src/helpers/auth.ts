const db = require("../../db/index");

export const register = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("username and password required");
  }

  const query = `INSERT INTO account (username, password) VALUES ($1, $2)`;

  try {
    await db.query(query, [username, password]);
    return { username: username };
  } catch (err) {
    throw new Error("username already exists");
  }
};

export const unsafeRegister = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("username and password required");
  }

  const query = `INSERT INTO account (username, password) VALUES ('${username}', '${password}')`;

  try {
    await db.query(query);
    return { username: username };
  } catch (err) {
    throw new Error("username already exists");
  }
};

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("username and password required");
  }

  const query = `SELECT username FROM account WHERE username = $1 AND password = $2`;

  try {
    const user = await db.query(query, [username, password]);

    if (user.rows.length === 0) {
      throw new Error("username or password incorrect");
    }

    return user.rows[0];
  } catch (error) {
    throw new Error("username or password incorrect");
  }
};

export const unsafeLogin = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("username and password required");
  }

  const query = `SELECT username FROM account WHERE username = '${username}' AND password = '${password}'`;

  try {
    const user = await db.query(query);

    if (user.rows.length === 0) {
      throw new Error("username or password incorrect");
    }

    return user.rows[0];
  } catch (error) {
    throw new Error("username or password incorrect");
  }
};
