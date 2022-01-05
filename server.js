let jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

let serviceAccount = require("./e-commerce-website-aacbf-firebase-adminsdk-948ag-34783d04b6.json");
const { use } = require('bcrypt/promises');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db=admin.firestore();

let staticPath = path.join(__dirname, "frontend");
const app = express();

app.use(express.static(staticPath));
app.use(express.json());
app.listen(3000, () => {
    console.log('listening on port 3000.......');
})
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})
app.post('/signup',(req,res)=>{
        let { name, email, password, number, tac, notification } = req.body;
        if (name.length < 3) {
            return res.json({ 'alert': 'name must be 3 letters long' });
        } else if (!email.length) {
            return res.json({ 'alert': 'enter your email' });
        }
        else if (ValidateEmail(email)) {
            res.json({'alert':'You have entered an invalid email address!'});
        }
        else if (password.length < 8) {
            return res.json({ 'alert': 'password should be 8 letters long' });
        } else if (!number.length) {
            return res.json({ 'alert': 'enter your phone number' });
        } else if (!Number(number) || number.length < 10) {
            return res.json({ 'alert': 'invalid number, please enter valid one' });
        } else if (!tac) {
            return res.json({ 'alert': 'you must agree to our terms and conditions' });
        }
    else{
        db.collection('users').doc(email).get().then(
        user=>{
            if (user.exists) {
                return res.json({ 'alert': 'email already exists' });
            } else {
                // encrypt the password using bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body)
                            .then(data => {
                                res.json({
                                    name: req.body.name,
                                    email: req.body.email,
                                    seller: req.body.seller,
                                })
                            })
                    })
                })
            }
        })
    }
})
app.get('/login',(req,res)=>{
    // console.log(process.env);
    res.sendFile(path.join(staticPath,"login.html"));
})
app.post('/login',(req,res)=>{
    let { email, password } = req.body;
    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all the inputs' });
    }
    else if (ValidateEmail(email)) {
        res.json({ 'alert': 'You have entered an invalid email address!' });
    }
    else{
        db.collection('users').doc(email).get().then(user=>{
            if(!user.exists){
                return res.json({'alert':'Email does not exists'});
            }
            else{
                bcrypt.compare(password,user.data().password,(err, result)=>{
                    if(result){
                        let data=user.data();
                        return res.json({
                            name: data.name,
                            email: data.email,
                            seller: data.seller,
                        })
                    }
                    else
                    return res.json({'alert':'Password incorrect'});
                })
            }
        })
    }
})
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})
function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
        return false;
    }
    else {
        return true;
    }
}
