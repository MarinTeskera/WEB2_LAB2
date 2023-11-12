const db = require("../../db/index");

export const register = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("username and password required");
  }

  const query = `INSERT INTO users (username, password) VALUES (${username}, ${password}) RETURNING *`;

  return db.query(query);
};
