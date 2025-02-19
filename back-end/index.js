const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = 3000;
import createUser from './Controllers/Admin/CreateUser';
import deleteUser from './Controllers/Admin/DeletUsar';
import loginUser from './Controllers/User/LoginUser';

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req,res) => {
    res.send('ola mundo');
});


app.get('/loginUser', (req,res,next) => {
    loginUser(req,res)
})

app.get('/admin/DeleteUser', (req,res,next) => {
    deleteUser(req,res)
})

app.get('/admin/FindUser', (req,res,next) => {
    requestUser(req,res)
})

app.get('/admin/FindAllUsers', (req,res,next) => {
    requestAllUser(req,res)
})

app.post('/admin/createAcount', (req,res) => {
    createUser(req,res)
})
app.listen(3000)