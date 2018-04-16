const express = require('express');
const router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString:process.env.DATABASE_URL});

/* GET users listing. */
router.get('/', function(req, res, next) {
  // get a client from the pool
  pool.connect().then(client => {
    // query db
    client.query('SELECT * FROM "Speakers"')
      .then(rsp => {
        // send back response
        res.status(200).send(rsp.rows);
      })
      .catch(err => {
        // send back error
        res.status(500).send(err);
      })
      .then(() => {
        // release client back to pool
        client.release();
      });
  });
});

module.exports = router;
