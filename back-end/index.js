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


import createProduct from './Controllers/Products/CreateProducts.js';
import updateProduct from './Controllers/Products/EditProducts.js';
import requestAllProduct from './Controllers/Products/RequestAllProducts.js';
import requestProducts from './Controllers/Products/RequestProduct.js';
import deleteProduct from './Controllers/Products/DeleteProducts.js';
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
products
*/

app.post('/products/CreateProduct', (req,res,next) => {
    createProduct(req,res)
})
app.put('/products/EditProduct', (req,res,next) => {
    updateProduct(req,res)
})
app.post('/products/RequestAllProducts', (req,res,next) => {
    requestAllProduct(req,res)
})
app.post('/products/RequestProduct', (req,res,next) => {
    requestProducts(req,res)
})
app.delete('/products/DeleteProduct', (req,res,next) => {
    deleteProduct(req,res)
})


app.listen(port)