import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
import loginUser from './Controllers/User/LoginUser.js';
import requestUser from './Controllers/Admin/RequestUser.js'
import requestAllUser from './Controllers/Admin/ResquerAllUsers.js';
import createUser from './Controllers/Admin/createUser.js';
import deleteUser from './Controllers/Admin/DeletUsar.js';
import updateUser from './Controllers/Admin/EditUser.js';
//import cookieParser from 'cookie-parser';
//import verificarToken from './Middlewares/auth.js';

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/loginUser', (req,res) => {
    loginUser(req,res)
})

app.post('/admin/FindUser/:id_collaborator', (req,res,next) => {
    //verificarToken(req, res); 
    //next()
    requestUser(req,res)
})

app.post('/admin/ResquerAllUsers', (req,res,next) => {
    requestAllUser(req,res)
})

app.delete('/admin/DeleteUser', (req,res,next) => {
    deleteUser(req,res)
})

app.post('/admin/createAcount', (req,res,next) => {
    createUser(req,res)
})
app.put('/admin/updateUser', (req,res,next) => {
    updateUser(req,res)
})
/*


*/

app.listen(port)