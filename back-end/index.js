const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = 3000;
import createUser from './Controllers/Admin/CreateUser';
import deleteUser from './Controllers/Admin/DeletUsar';
import loginUser from './Controllers/User/LoginUser';
import cookieParser from 'cookie-parser';
import verificarToken from './middleware/auth';

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/loginUser', (req,res) => {
    loginUser(req,res)
})

app.post('/admin/FindUser/:id_collaborator', (req,res,next) => {
    verificarToken(req, res); 
    next()
    requestUser(req,res)
})

app.post('/admin/FindAllUsers', (req,res,next) => {
    requestAllUser(req,res)
})

app.post('/admin/createAcount', (req,res,next) => {
    createUser(req,res)
})

app.put('/admin/updateUser', (req,res,next) => {
    createUser(req,res)
})

app.delete('/admin/DeleteUser', (req,res,next) => {
    deleteUser(req,res)
})

app.listen(port)