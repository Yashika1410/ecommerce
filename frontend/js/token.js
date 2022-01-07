let char = `_${'`'}{|}~123abcde.fmnopqlABCDE@FJKLMNOPQRSTUVWXYZ456789stuvwxyz0!#$%&ijkrgh'*+-/=?^`;

const generateToken = (key) => {
    let token = '';
    for (let i = 0; i < key.length; i++) {
        let index = char.indexOf(key[i]) || char.length / 2;
        let randomIndex = Math.floor(Math.random() * index);
        console.log(randomIndex < char.length);
      
        token += char[randomIndex] + char[index - randomIndex];
    }
    return token;
}
const compareToken = (token, key) => {
    let string = '';
    for (let i = 0; i < token.length; i = i + 2) {
        let index1 = char.indexOf(token[i]);
        let index2 = char.indexOf(token[i + 1]);
        string += char[index1 + index2];
    }
    console.log(string);
    if (string === key) {
        return true;
    }
    return false;
}
const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
    return false;
}
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then(response => {
            processData(response);
        })
}
const processData = (data) => {
   // console.log(data);
    loader.style.display = null;
    if (data.alert) {
        showAlert(data.alert);
    } else if (data.name) {
        // create authToken
        data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace('/');
    }
    else if(data==true){
        let user=JSON.parse(sessionStorage.user);
        user.seller=true;
        sessionStorage.user=JSON.stringify(user);
        location.reload();
    }
    else if (data.product) {
        location.href = '/seller';
    }
}
