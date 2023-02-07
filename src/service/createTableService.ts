const { pool } = require("./db/index");
import { Request, Response } from "express";
var db = require("db/db");

export const createContractsTableIfNotExists = async () => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS contracts(
  contractId SERIAL PRIMARY KEY,
  name VARCHAR(100)
  created_at DATE,
  expires_at DATE
)`,
    (err: Error, res: Response) => {
      if (err) {
        console.log("error creating contracts table", err);
      } else {
        console.log("contracts table created");
      }
    }
  );
};

export const createUsersTableIfNotExists = async () => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS users (
  Id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(100),
  role VARCHAR(100)
)`,
    (err: Error, res: Response) => {
      if (err) {
        console.log("error creating users table", err);
      } else {
        console.log("users table created");
      }
    }
  );
};

module.exports = {
  createContractsTableIfNotExists,
  createUsersTableIfNotExists,
};
