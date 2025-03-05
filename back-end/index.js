import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
import requestUser from './Controllers/Admin/RequestUser.js'
import requestAllUser from './Controllers/Admin/ResquerAllUsers.js';
import createUser from './Controllers/Admin/CreateUser.js';
import deleteUser from './Controllers/Admin/DeletUsar.js';
import updateUser from './Controllers/Admin/EditUser.js';


import createProduct from './Controllers/Products/CreateProducts.js';
import updateProduct from './Controllers/Products/EditProducts.js';
import requestAllProduct from './Controllers/Products/RequestAllProducts.js';
import requestProducts from './Controllers/Products/RequestProduct.js';
import deleteProduct from './Controllers/Products/DeleteProducts.js';

import getAllTeams from './Controllers/Admin/team/AllTems.js';
import getTeamById from './Controllers/Admin/team/FindTeam.js';
import createTeam from './Controllers/Admin/team/CreateTeam.js';
import deleteTeam from './Controllers/Admin/team/DeleteTeam.js';
import updateTeam from './Controllers/Admin/team/EditTeam.js';


import cookieParser from 'cookie-parser';
import verificarToken from './Middlewares/auth.js';

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/loginUser', async (req, res) => { // make the route handler async
    try {
        const { default: loginUser } = await import('./Controllers/User/LoginUser.js');
        loginUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/admin/FindUser',verificarToken, (req,res,) => {
    requestUser(req,res)
})

app.post('/admin/ResquerAllUsers',verificarToken,(req,res) => {
    requestAllUser(req,res)
})

app.delete('/admin/DeleteUser',verificarToken, (req, res) => {
    deleteUser(req, res)
});

app.post('/admin/createAcount',verificarToken, (req,res) => {
    createUser(req,res)
})
app.put('/admin/updateUser',verificarToken, (req,res) => {
    updateUser(req,res)
})
/*
products
*/

app.post('/products/CreateProduct', (req,res) => {
    createProduct(req,res)
})
app.put('/products/EditProduct', (req, res) => {
    updateProduct(req, res);
});
app.post('/products/RequestAllProducts', (req,res) => {
    requestAllProduct(req,res)
})
app.post('/products/RequestProduct', (req,res) => {
    requestProducts(req,res)
})
app.delete('/products/DeleteProduct', (req,res) => {
    deleteProduct(req,res)
})

/*
Teams
*/

app.post('/admin/teams/AllTeams',verificarToken, (req,res) => {
    getAllTeams(req,res)
})
app.post('/admin/teams/CreateTeam',verificarToken, (req,res) => {
    createTeam(req,res)
})
app.post('/admin/teams/FindTeam',verificarToken, (req,res) => {
    getTeamById(req,res)
})  
app.delete('/admin/teams/DeleteTeam',verificarToken, (req,res) => {
    deleteTeam(req,res)
})
app.put('/admin/teams/EditTeam',verificarToken, (req,res) => {
    updateTeam(req,res)
})


app.listen(port)