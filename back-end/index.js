import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generalLimiter, generalLimiterProducts, generalLimiterAdmin } from './Middlewares/LimitedAcess.js'
import verificarTokenAdmin from './Middlewares/authAdmin.js';
import verificarTokenUser from './Middlewares/authUser.js';
import verifyIP from './Middlewares/verifyIpAdress.js'
import compression from 'compression';


import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;
const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5173'],
    credentials: true,
};

app.use(cookieParser());
app.use(compression())
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/loginUser', generalLimiter , async (req, res) => {
    try {
        const { default: loginUser } = await import('./Controllers/User/LoginUser.js');
        loginUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/verifyToken', generalLimiter , async (req, res) => {
    try {
        const { default: VerifyToken } = await import('./Controllers/User/VerifyToken.js');
        VerifyToken(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/admin/FindUser',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req, res) => {
    try {
        const { default: requestUser } = await import('./Controllers/Admin/RequestUser.js');
        requestUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/admin/ResquerAllUsers',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: requestAllUser } = await import('./Controllers/Admin/ResquerAllUsers.js');
        requestAllUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

})
app.delete('/admin/DeleteUser',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req, res) => {
    try {
        const { default: deleteUser } = await import('./Controllers/Admin/DeletUsar.js');
        deleteUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/admin/createAcount',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: createUser } = await import('./Controllers/Admin/CreateUser.js');
        createUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.put('/admin/updateUser',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: updateUser } = await import('./Controllers/Admin/EditUser.js');
        updateUser(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

/*products*/
app.post('/products/CreateProduct',generalLimiterProducts, verificarTokenUser, verifyIP, async (req,res) => {
    try {
        const { default: createProduct } = await import('./Controllers/Products/CreateProducts.js');
        createProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.put('/products/EditProduct',/*generalLimiterProducts, verificarTokenUser, verifyIP,*/ async (req, res) => {
    try {
        const { default: updateProduct } = await import('./Controllers/Products/EditProducts.js');
        updateProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/products/RequestAllProducts',/*generalLimiterProducts, verificarTokenUser, verifyIP,*/ async (req,res) => {
    try {
        const { default: requestAllProduct } = await import('./Controllers/Products/RequestAllProducts.js');
        requestAllProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/products/RequestProduct',generalLimiterProducts, /*verificarTokenUser, verifyIP,*/ async (req,res) => {
    try {
        const { default: requestProducts } = await import('./Controllers/Products/RequestProduct.js');
        requestProducts(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.delete('/products/DeleteProduct',generalLimiterProducts, verificarTokenUser, verifyIP, async (req,res) => {
    try {
        const { default: deleteProduct } = await import('./Controllers/Products/DeleteProducts.js');
        deleteProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

/*Teams*/
app.post('/admin/teams/AllTeams',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: getAllTeams } = await import('./Controllers/Admin/team/AllTems.js');
        getAllTeams(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/admin/teams/CreateTeam',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: createTeam } = await import('./Controllers/Admin/team/CreateTeam.js');
        createTeam(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/admin/teams/FindTeam',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: getTeamById } = await import('./Controllers/Admin/team/FindTeam.js');
        getTeamById(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})  
app.delete('/admin/teams/DeleteTeam',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: deleteTeam } = await import('./Controllers/Admin/team/DeleteTeam.js');
        deleteTeam(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.put('/admin/teams/EditTeam',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: updateTeam } = await import('./Controllers/Admin/team/EditTeam.js');
        updateTeam(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

/*Customers*/
app.post('/CreateCustomer',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: createCustomer } = await import('./Controllers/Customers/CreateCustomer.js');
        createCustomer(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/AllCustomers',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: AllCustomers } = await import('./Controllers/Customers/AllCustomer.js');
        AllCustomers(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/FindCustomer',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: FindCustomer } = await import('./Controllers/Customers/FindCustomer.js');
        FindCustomer(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/FreezeCustomer',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: freezeCustomer } = await import('./Controllers/Customers/FreezeCustomer.js');
        freezeCustomer(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.put('/EditCustomer',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: updateProduct } = await import('./Controllers/Customers/EditCustomer.js');
        updateProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
app.delete('/DeleteCustomer',generalLimiterAdmin, verificarTokenAdmin, verifyIP, async (req,res) => {
    try {
        const { default: deleteProduct } = await import('./Controllers/Customers/DeleteCustomer.js');
        deleteProduct(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port)