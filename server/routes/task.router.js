const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post("/", (req, res) => {
  const queryString = `INSERT INTO "tasks" ("item", "quantity", "notes") VALUES ($1, $2, $3);`;

  pool
    .query(queryString, [req.body.cat])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  const queryString = `SELECT * FROM "tasks" ORDER BY "id" ASC`;

  pool
    .query(queryString)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  let newComplete = true;

  if (req.body.complete == "true") {
    newComplete = false;
  } else {
    newComplete = true;
  }

  const queryString = `UPDATE "tasks" SET "complete"=$1 WHERE id=$2;`;

  pool
    .query(queryString, [newComplete, req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  const queryString = `DELETE FROM "tasks" WHERE id=$1;`;

  pool
    .query(queryString, [req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;
