const express = require('express');
const app = express();
const port = 3000

app.get('/', (req,res) => {
    res.send('ola mundo');
});


app.get('/', (req,res,next) => {

})
app.listen(3000)