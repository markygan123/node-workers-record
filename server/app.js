const express = require('express');
const app = express();
const port = process.env.PORT || 3000;





app.get('/', (req, res) => {
    return res.render('../assets/views/index.pug');
});

app.set('view engine', 'pug');





app.listen(port, () => console.log(`Node App listening on Port ${port}`));