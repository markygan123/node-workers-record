const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./routes');



// use body-parser for POST request data 
app.use(bodyParser.urlencoded({ extended: true }));



// routes
app.use('/', routes);


// catch 404 
app.use((req, res, next) => {
    res.status(404).render('404', {
        title: '404 Error'
    });
});


// Template Engine
app.set('view engine', 'pug');





app.listen(port, () => console.log(`Node App listening on Port ${port}`));