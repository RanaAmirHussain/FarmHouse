const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');

require("./db/conn");

const Register = require('./models/registers');
const { send } = require("process");
const { urlencoded } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

// console.log(path.join(__dirname, "../public"));



// app.get("/", (req, res) => {
//     res.send("Welcome to our login Form.....")
// });



app.get("/index", (req, res) => {
    res.render("index")
});


app.get('/', (req, res) => {
    res.render('register')
});


app.get('/login', (req, res) => {
    res.render('login')
});


app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password === confirmPassword) {
            const loginSchema = new Register({
                your_name: req.body.your_name,
                father_name: req.body.father_name,
                email: req.body.email,
                address: req.body.address,
                password: password,
                confirmPassword: confirmPassword
            })

            const registered = await loginSchema.save();
            res.status(201).render("login");

        } else {
            res.send("Both Passwords are not matching😡😡")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


app.post('/login', async (req, res) => {
    try {
        const user = req.body.user;
        const password = req.body.password;

        const user_email = await Register.findOne({email:user});
        if (user_email.password === password){
            res.status(201).render("index")
        } else{
            res.send("Please check the email id and password again!!!")
        }

    } catch (error) {
        res.status(400).send("Invalid EMAIL wala error..");
    }
});





app.listen(port, () => {
    console.log(`Server is running at ${port}`)
});


