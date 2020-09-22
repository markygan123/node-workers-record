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
});


router.get('/editRecord/:id', (req, res) => {
    DB.query(`SELECT * from workers WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
        if (error) {
            console.log('Error: ');
            console.log(error);
            return res.redirect('/');
        } else {
            return res.render('editRecord', {
                id: req.params.id,
                name: result[0].name,
                trade: result[0].trade,
                phone_no: result[0].phone_no                
            });
        }
    });
});


router.post('/editRecord/:id', (req, res) => {
    const record = req.body;
    DB.query(`UPDATE workers SET name = '${record.name}',
                trade = '${record.trade}',
                phone_no = '${record.phone_no}'
                WHERE id = ${req.params.id}`, (error, result) => {
                    if (error) {
                        console.log('Error: ');
                        console.log(error);
                        return res.redirect('/editRecord/:id')
                    } else {
                        return res.redirect('/')
                    }
                });
});


router.get('/deleteRecord/:id', (req, res) => {
    DB.query(`SELECT * from workers WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
        if (error) {
            console.log('Error: ');
            console.log(error);
            return res.redirect('/');
        } else {
            return res.render('deleteRecord', {
                id: req.params.id,
                name: result[0].name,
                trade: result[0].trade,
                phone_no: result[0].phone_no                
            });
        }
    });
});


router.get('/deleteRecord/:id/delete', (req, res) => {
    const post = req.body;
    DB.query(`DELETE FROM workers WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            console.log('Error: ');
            console.log(error);
            return res.redirect(`/deleteRecord/${req.params.id}/delete`);
        } else {
            return res.redirect(`/`);
        }
    });
});


module.exports = router;