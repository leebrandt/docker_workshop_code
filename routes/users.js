const express = require('express');
const router = express.Router();
const {Client} = require('pg');
const client = new Client({connectionString:process.env.DATABASE_URL});

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.connect();
  client.query('SELECT * FROM "Speakers"', (err, rsp) =>{
    if(err) throw new Error(err);
    res.status(200).send(rsp.rows);
    client.end();
  })
});

module.exports = router;
