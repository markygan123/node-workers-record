const express = require('express');
const router = express.Router();
const DB = require('../database/connection');



router.get('/', (req, res) => {
    return res.render('../views/index.pug');
});

router.get('/newLog', (req, res) => {
    return res.render('../views/newLog.pug');
})



module.exports = router;