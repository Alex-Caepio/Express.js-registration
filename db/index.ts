// const { Pool } = require("pg");
// import pg from "pg";
// // var db = require("db/db");

// // const pool = new Pool({
// //   //user: "",
// //   host: "127.0.0.1",
// //   database: "testdb",
// //   //password: "",
// //   port: 27017,
// // });

// // module.exports = {
// //   pool,
// // };

// const conStringPri = "mongodb://127.0.0.1:27017/testdb";
// const Client = pg.Client;
// const client = new Client({ connectionString: conStringPri });
// client.connect();

// console.log("Connected to database");

// // client.query(`CREATE DATABASE ${dataBaseName}`)
// //   .then(() => client.end());

// import { Request, Response } from "express";

// export const createContractsTableIfNotExists = async () => {
//   client
//     .query(
//       `CREATE TABLE IF NOT EXISTS contracts(
//   contractId SERIAL PRIMARY KEY,
//   name VARCHAR(100)
//   created_at DATE,
//   expires_at DATE
// )`
//     )
//     .then(() => client.end());
// };

// export const createUsersTableIfNotExists = async () => {
//   client
//     .query(
//       `CREATE TABLE IF NOT EXISTS users (
//   Id SERIAL PRIMARY KEY,
//   email VARCHAR(100),
//   password VARCHAR(100),
//   role VARCHAR(100)
// )`
//     )
//     .then(() => client.end());
// };

// module.exports = {
//   createContractsTableIfNotExists,
//   createUsersTableIfNotExists,
// };
