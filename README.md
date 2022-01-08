
<div align="center">

# Ecommerce
# Full Featured E-Commerce Website

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
### 3. Setup AWS S3 bucket
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
### Home page
<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/1.png?token=GHSAT0AAAAAABQHASXHED62UDTLUFBYLMBMYPCVUUQ"></p>

### Login Page

<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/2.png?token=GHSAT0AAAAAABQHASXGS5JCEWWWWVO64JEQYPCVWLQ"></p>

### Product Description Page

<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/4.png?token=GHSAT0AAAAAABQHASXGNYO36REVDAE6VYQ2YPCVXHQ"></p>

### Cart Page

<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/5.png?token=GHSAT0AAAAAABQHASXHSBIGRGFZMUGAFDH2YPCVYBQ"></p>

### Checkout Page

<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/7.png?token=GHSAT0AAAAAABQHASXHQIICBQVDAFEXGJ74YPCVZUA"></p>

### Oder Confirmation Mail

<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/8.png?token=GHSAT0AAAAAABQHASXHYUSXDHLTKMGASSB4YPCV2UQ"></p>

### Seller Page

<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/9.png?token=GHSAT0AAAAAABQHASXGWNRYYSGHXD5NE5YYYPCV3QA"></p>

### Add Product page

<p align="center"><img src="https://raw.githubusercontent.com/Yashika1410/ecommerce/master/project-images/10.png?token=GHSAT0AAAAAABQHASXHFTNBXUW43IL7YZ64YPCV4WA"></p>


## Video (https://youtu.be/ShxiWJ_Alk8)





