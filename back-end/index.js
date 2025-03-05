import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

import cookieParser from 'cookie-parser';
import verificarToken from './Middlewares/auth.js';

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/loginUser', async (req, res) => {
    try {
        const { default: loginUser } = await import('./Controllers/User/LoginUser.js');
        loginUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/admin/FindUser', verificarToken, async (req, res) => {
    try {
        const { default: requestUser } = await import('./Controllers/Admin/RequestUser.js');
        requestUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/admin/ResquerAllUsers',verificarToken, async (req,res) => {
    try {
        const { default: requestAllUser } = await import('./Controllers/Admin/ResquerAllUsers.js');
        requestAllUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

})
app.delete('/admin/DeleteUser',verificarToken, async (req, res) => {
    try {
        const { default: deleteUser } = await import('./Controllers/Admin/DeletUsar.js');
        deleteUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/admin/createAcount',verificarToken, async (req,res) => {
    try {
        const { default: createUser } = await import('./Controllers/Admin/CreateUser.js');
        createUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.put('/admin/updateUser',verificarToken, async (req,res) => {
    try {
        const { default: updateUser } = await import('./Controllers/Admin/EditUser.js');
        updateUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

/*
products
*/
app.post('/products/CreateProduct', async (req,res) => {
    try {
        const { default: createProduct } = await import('./Controllers/Products/CreateProducts.js');
        createProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.put('/products/EditProduct',async (req, res) => {
    try {
        const { default: updateProduct } = await import('./Controllers/Products/EditProducts.js');
        updateProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/products/RequestAllProducts',async (req,res) => {
    try {
        const { default: requestAllProduct } = await import('./Controllers/Products/RequestAllProducts.js');
        requestAllProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/products/RequestProduct',async (req,res) => {
    try {
        const { default: requestProducts } = await import('./Controllers/Products/RequestProduct.js');
        requestProducts(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.delete('/products/DeleteProduct',async (req,res) => {
    try {
        const { default: deleteProduct } = await import('./Controllers/Products/DeleteProducts.js');
        deleteProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

/*
Teams
*/
app.post('/admin/teams/AllTeams',verificarToken, async (req,res) => {
    try {
        const { default: getAllTeams } = await import('./Controllers/Admin/team/AllTems.js');
        getAllTeams(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/admin/teams/CreateTeam',verificarToken, async (req,res) => {
    try {
        const { default: createTeam } = await import('./Controllers/Admin/team/CreateTeam.js');
        createTeam(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/admin/teams/FindTeam',verificarToken, async (req,res) => {
    try {
        const { default: getTeamById } = await import('./Controllers/Admin/team/FindTeam.js');
        getTeamById(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})  
app.delete('/admin/teams/DeleteTeam',verificarToken, async (req,res) => {
    try {
        const { default: deleteTeam } = await import('./Controllers/Admin/team/DeleteTeam.js');
        deleteTeam(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.put('/admin/teams/EditTeam',verificarToken, async (req,res) => {
    try {
        const { default: updateTeam } = await import('./Controllers/Admin/team/EditTeam.js');
        updateTeam(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})


app.listen(port)