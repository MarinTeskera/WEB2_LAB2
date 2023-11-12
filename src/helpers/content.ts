const db = require("../../db/index");

export const createContent = async (username: string, value: string) => {
  const query = `INSERT INTO content (username, value) VALUES ($1, $2)`;

  console.log(query, username, value);

  try {
    return await db.query(query, [username, value]);
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const unsafeCreateContent = async (username: string, value: string) => {
  const query = `INSERT INTO content (username, value) VALUES ('${username}', '${value}')`;

  try {
    return await db.query(query);
  } catch {
    throw new Error("Something went wrong");
  }
};

export const getContent = async (username: string, name: string) => {
  const query = `SELECT value FROM content WHERE username = $1 AND name LIKE $2`;

  try {
    return await db.query(query, [username, name]);
  } catch {
    throw new Error("Something went wrong");
  }
};

export const unsafeGetContent = async (username: string, name: string) => {
  const query = `SELECT value FROM content WHERE username = '${username}' AND name LIKE '${name}'`;

  try {
    return await db.query(query);
  } catch {
    throw new Error("Something went wrong");
  }
};
