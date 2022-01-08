
<div align="center">

# Ecommerce
# Full Featured E-Commerce Web Application

> Technology Used : CSS, JS, HTML, Node JS, Firebase & AWS
#
</div>
<!-- 
<p align="center"><img src="https://miro.medium.com/max/2800/1*l93HjLEwJ2LetGKqWPws5A.png"></p> -->




## Features

> Authentication

> Multiple image upload

> Wishlist

> Cart

> Checkout

> Order

> Category


> Brand

> Products setup

> Stock management

> Order Confirmation Mail 

> User role(Seller & User)



## Packages

> Express : https://www.npmjs.com/package/express

> Firebase-admin: https://www.npmjs.com/package/firebase-admin

> nodemon: https://www.npmjs.com/package/nodemon

> bcrypt :https://www.npmjs.com/package/bcrypt

> AWS-SDK: https://www.npmjs.com/package/aws-sdk

> nodemailer : https://www.npmjs.com/package/nodemailer

## Run Locally

### 1. Clone repo

```
$ git clone https://github.com/Yashika1410/ecommerce.git
$ cd ecommerce
```

### 2. Setup Firebase
 - goto https://firebase.google.com/
 - open console
 - create project name it ecommerce website 
 - then generate new private key from project settings
 - then paste that json file inside ecommerce & add name of that json file inside server.js file
 ```
 let serviceAccount = require("./firebase-jsonfilename.json"); 
 ```
### 3. Create AWS S3 bucket
- create S3 bucket 
- then copy its access & secret key 

### 4. Create .env file
- Create .env file in project folder
- Enter these lines to that:

```
AWS_ACCESS_KEY='key'
AWS_SECRET_KEY='key'
EMAIL='email@gmail.com'
PASSWORD='Email password'
```

### 5. Setup & start project

```
$ npm install
$ npm run start
```
## Project ScreenShot's
 
<!-- <p align="center"><img src=""></p> -->
