let jwt = require("jsonwebtoken");
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

const aws = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();
const region = "ap-south-1";
const bucketName = "yashika-ecommerce-website";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
})
const s3 = new aws.S3();

async function generateUrl() {
    let date = new Date();
    let id = parseInt(Math.random() * 10000000000);

    const imageName = `${id}${date.getTime()}.jpg`;

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300, //300 ms
        ContentType: 'image/jpeg'
    })
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}

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

app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})
app.get('/add-product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})
app.post('/add-product', (req, res) => {
    let { name, shortDes, des, images, sizes,sellPrice, stock, tags, tac, email,draft,id } = req.body;

    // validation
        if(!draft){
        if (!name.length) {
            return res.json({ 'alert': 'enter product name' });
        } else if (shortDes.length > 100 || shortDes.length < 10) {
            return res.json({ 'alert': 'short description must be between 10 to 100 letters long' });
        } else if (!des.length) {
            return res.json({ 'alert': 'enter detail description about the product' });
        } else if (!images.length) { // image link array
            return res.json({ 'alert': 'upload atleast one product image' })
        } else if (!sizes.length) { // size array
            return res.json({ 'alert': 'select at least one size' });
        } else if (!sellPrice.length) {
            return res.json({ 'alert': 'you must add pricings' });
        } else if (stock < 20) {
            return res.json({ 'alert': 'you should have at least 20 items in stock' });
        } else if (!tags.length) {
            return res.json({ 'alert': 'enter few tags to help ranking your product in search' });
        } else if (!tac) {
            return res.json({ 'alert': 'you must agree to our terms and conditions' });
        }
        }

    // add product
    let docName = id==undefined?`${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`:id;
    db.collection('products').doc(docName).set(req.body)
    .then(data => {
        res.json({'product': name});
    })
    .catch(err => {
        return res.json({'alert': 'some error occurred. Try again'});
    })
})
app.get('/s3url', (req, res) => {
    generateUrl().then(url => res.json(url));
})

app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
    let {name, about, address, number, tac, legit, email}=req.body;
   
    if (!name.length || !address.length || !about.length || !number.length) {
        return res.json({ 'alert':'Fill all the inputs'});
    }
    else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'invalid number, please enter valid one' });
    }
    else if (!tac || !legit) {
        return res.json({ 'alert':'you must agree to our term and conditions'});
    } else{
        db.collection('sellers').doc(email).set(req.body).then(data=>{
            db.collection('users').doc(email).update({
                seller:true
            }).then(data=>{
                res.json(true);
            })
        })
    }
})

app.post('/get-products',(req,res) => {
    let {email,id}=req.body;
    let docRef = id ? db.collection('products').doc(id) :db.collection('products').where('email','==',email);
    docRef.get().then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr=[];
        if(id){
            //console.log(id,res.json(products.data));
            return res.json(products.data);
        }
        products.forEach(item=>{
            let data=item.data();
            data.id = item.id;
            productArr.push(data);
        })
        res.json(productArr);
    })
})
app.post('/delete-product',(req,res)=>{
    let {id} =req.body;
    console.log(id);
    db.collection('products').doc(id).delete().then(data =>{
        res.json('success');
    }).catch(err=>{
        res.json('err')
    })
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
