const mysql = require('mysql');

const DB = mysql.createPool({
    connectionLimit: 50,
    host: "us-cdbr-east-02.cleardb.com",
    user: "bace86d7ac1ae2",
    password: "154e5b26",
    database: "heroku_38b2e39592d1c61",
    multipleStatements: true
});

DB.getConnection((error, tempConnect) => {
    if (!error) {
        console.log('Database connection successful');

        // migration of tables
        tempConnect.query('SELECT 1 FROM workers LIMIT 1', (error, results, fields) => {
            if (error) {
                // if table workers doesn't exists, create table workers
                console.log('Create table workers');
                tempConnect.query(`
                    CREATE TABLE workers(
                        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(60) NOT NULL,
                        trade VARCHAR(30) NOT NULL,
                        phone_no VARCHAR(20) NOT NULL
                    )
                `, (error, results, fields) => {
                    if (error) {
                        console.log('ERROR WITH CREATING TABLE');
                        console.log(error);
                    } else {
                        console.log('Successfully created table');
                    }
                });
            } else {
                console.log('Table workers already exists');
            }
        });       
    } else {
        console.log('Database connection failed: ');
        console.log(error);
        tempConnect.release();
    }
});


module.exports = DB;