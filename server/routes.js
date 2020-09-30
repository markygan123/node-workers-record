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
                    title: 'Plant Workers Record',
                    h1: 'Plant Workers Record',
                    workers: result
                });
            }
        }
    );
});


router.get('/addRecord', (req, res) => {
    return res.render('addRecord', {
        title: 'Add New Worker',
        h1: 'Add New Worker'
    });
});

router.post('/addRecord', (req, res) => {
    const record = req.body;
    DB.query(`SELECT * FROM trades WHERE trade_id = ${record.trade}`, (error, results, fields) => {
        if (error) {
            console.log('Error: ');
            console.log(error);
        } else {
            const trade = results[0].trade_name;
            DB.query(`INSERT INTO workers (name, trade, phone_no)
                VALUES ('${record.name}', '${trade}', '${record.phone_no}')`, (error, results, fields) => {
                    if (error) {
                        console.log('Error: ');
                        console.log(error);
                        return res.redirect('/addRecord');
                    } else {
                        return res.redirect('/');
                    }
                });
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
                h1: 'Edit Worker Information',
                title: 'Edit Worker Information',
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
    DB.query(`SELECT * FROM trades WHERE trade_id = ${record.trade}`, (error, results, fields) => {
        if (error) {
            console.log('Error: ');
            console.log(error);
        } else {
            const trade = results[0].trade_name;
            DB.query(`UPDATE workers SET name = '${record.name}',
                trade = '${trade}',
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
                title: 'Delete Worker Record',
                h1: 'Delete Worker Record',
                id: req.params.id,
                name: result[0].name,
                trade: result[0].trade,
                phone_no: result[0].phone_no                
            });
        }
    });
});


router.get('/deleteRecord/:id/delete', (req, res) => {
    DB.query(`DELETE FROM workers WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            console.log('Error: ');
            console.log(error);
            return res.redirect(`/deleteRecord/${req.params.id}/delete`);
        } else {
            return res.render(`/`, {
                title: 'Delete Worker Record',
                h1: 'Delete Worker Record'
            });
        }
    });
});


router.post('/searchRecord/:searchVal', (req, res) => {
    const worker = req.body;
    DB.query(`SELECT * FROM workers WHERE name LIKE '%${worker.searchVal}%'
                 or trade LIKE '%${worker.searchVal}%' or phone_no LIKE '%${worker.searchVal}%'`, (error, result) => {
        if (error) {
            console.log('Error: ');
            console.log(error);
        } else {
            res.render('searchRecord', {
                title: 'Plant Workers Record',
                h1: 'Plant Workers Record',
                workers: result            
            });
        }
    })
});




module.exports = router;