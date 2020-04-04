const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
  database: "weekend-to-do-list",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMills: 30000,
});

pool.on("connect", () => {
  console.log("Pool connected");
});

pool.on("error", (err) => {
  console.log(`Pool error: ${err}`);
});

module.exports = pool;
