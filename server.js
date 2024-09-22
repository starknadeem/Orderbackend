const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

//Files imports
const connectDB = require('./dbConnection');
const RouteManager = require('./Routes/RouteManager')
const User = require('./model/UserModel');


//Dotenv config
dotenv.config({ path: './.env' });

//connection to DB
connectDB().then((isConnected) => {
    if (isConnected) {
        startServer();
    }
    else{
        console.log('Connect Falid With DB');
    }
})

function startServer()
{
    const PORT = process.env.PORT || 8001;

    //MiddleWares
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //config
    app.use('/api/admin/product/uploads', express.static('./uploads'));
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    //Routes
    // app.use('/api/admin/product', RouteManager);
    // app.get('/signup', (req, res) => {
    //     res.render('signup', { error: null });
    // });



    // app.get('/signup', (req, res) => {
    //     res.render('signup', { error: null });
    // });

    // app.post('/signup', async (req, res) => {
    //     const { businessName, websiteUrl, country, city, fullName, phone, email, password, confirmPassword } = req.body;
    //     if (password !== confirmPassword) {
    //         return res.render('signup', { error: 'Passwords do not match' });
    //     }
    //     try {
    //         const hashedPassword = await bcrypt.hash(password, 10);
    //         const newUser = new User({
    //             businessName,
    //             websiteUrl,
    //             country,
    //             city,
    //             fullName,
    //             phone,
    //             email,
    //             password: hashedPassword
    //         });
    //         await newUser.save();
    //         res.redirect('/login');
    //     } catch (error) {
    //         res.render('signup', { error: 'Email already in use' });
    //     }
    // });

    // app.get('/login', (req, res) => {
    //     res.render('login', { error: null });
    // });

    // app.post('/login', async (req, res) => {
    //     const { email, password } = req.body;
    //     try {
    //         const user = await User.findOne({ email });
    //         if (!user) {
    //             return res.render('login', { error: 'Invalid email or password' });
    //         }
    //         const isMatch = await bcrypt.compare(password, user.password);
    //         if (!isMatch) {
    //             return res.render('login', { error: 'Invalid email or password' });
    //         }
    //         req.session.user = user;
    //         res.redirect('/api/admin/product');
    //     } catch (error) {
    //         res.render('login', { error: 'Something went wrong, please try again' });
    //     }
    // });

    // app.use('/api/admin/product', (req, res, next) => {
    //     if (!req.session.user) {
    //         return res.redirect('/login');
    //     }
    //     next();
    // });

    app.use('/api/admin/product', RouteManager);

    app.get('/', (req, res) => {
        res.send("WORKING");
    })


    app.listen(PORT || 8001, () => {
        console.log(`Server started at http://127.0.0.1:${PORT}`);
        
    })
}