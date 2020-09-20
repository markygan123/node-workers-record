const mysql = require('mysql');

const DB = mysql.createPool({
    host: "us-cdbr-east-02.cleardb.com",
    user: "bace86d7ac1ae2",
    password: "154e5b26",
    database: "heroku_38b2e39592d1c61",
    multipleStatements: true
});

DB.connect(error => {
    if (!error) {
        console.log('Database connection successful');
    } else {
        console.log('Database connection failed: ');
        console.log(error);
    }
});



module.exports = DB;