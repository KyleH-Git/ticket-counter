const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () =>
console.log(`Server listening on port ${port}`));

