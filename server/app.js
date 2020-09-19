const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');





// routes
app.use('/', routes);


// Template Engine
app.set('view engine', 'pug');





app.listen(port, () => console.log(`Node App listening on Port ${port}`));