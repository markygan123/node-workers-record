const express = require('express');
const router = express.Router();
const DB = require('../database/connection');



router.get('/', (req, res) => {
    DB.query(
        `SELECT * FROM workers`, (error, result) => {
            if (error) {
                console.log('Error: ');
                console.log(error);
                return res.redirect('/')
            } else {
                return res.render('index', {
                    workers: result
                });
            }
        }
    );
    // return res.render('../views/index.pug');
});

router.get('/newRecord', (req, res) => {
    return res.render('../views/newRecord.pug');
});

router.post('/newRecord', (req, res) => {
    const record = req.body;
    DB.query(`INSERT INTO workers (name, trade, phone_no)
                VALUES ('${record.name}', '${record.trade}', '${record.phone_no}')`, (error, results, fields) => {
                    if (error) {
                        console.log('Error: ');
                        console.log(error);
                        return res.redirect('/newRecord');
                    } else {
                        return res.redirect('/');
                    }
                });
    // DB.query(console.log(record));
});



module.exports = router;