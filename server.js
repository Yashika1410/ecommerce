const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
let staticPath = path.join(__dirname, "frontend");
const app = express();

app.use(express.static(staticPath));

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})