let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login');
        }
    } else {
        location.replace('/login');
    }
}

const sellingPrice = document.querySelector('#sell-price');
let uploadImages=document.querySelectorAll('.fileupload');
let imagePaths=[];

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];
        let imageUrl;

        if (file.type.includes('image')) {
            // means user uploaded an image
            fetch('/s3url').then(res => res.json())
                .then(url => {
                    fetch(url, {
                        method: 'PUT',
                        headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
                        body: file
                    }).then(res => {
                        imageUrl = url.split("?")[0];
                        imagePaths[index] = imageUrl;
                        let label = document.querySelector(`label[for=${fileupload.id}]`);
                        label.style.backgroundImage = `url(${imageUrl})`;
                        let productImage = document.querySelector('.product-image');
                        productImage.style.backgroundImage = `url(${imageUrl})`;
                    })
                })
        } else {
            showAlert('upload image only');
        }
    })
})

const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

let sizes = []; 

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');

const storeSizes = () => {
    sizes = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item => {
        if (item.checked) {
            sizes.push(item.value);
        }
    })
}

const validateForm = () => {
    if (!productName.value.length) {
        return showAlert('enter product name');
    } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
        return showAlert('short description must be between 10 to 100 letters long');
    } else if (!des.value.length) {
        return showAlert('enter detail description about the product');
    } else if (!imagePaths.length) { // image link array
        return showAlert('upload atleast one product image')
    } else if (!sizes.length) { // size array
        return showAlert('select at least one size');
    } else if (!sellingPrice.value.length) {
        return showAlert('you must add pricings');
    } else if (stock.value < 20) {
        return showAlert('you should have at least 20 items in stock');
    } else if (!tags.value.length) {
        return showAlert('enter few tags to help ranking your product in search');
    } else if (!tac.checked) {
        return showAlert('you must agree to our terms and conditions');
    }
    return true;
}
const productData = () => {
    return data = {
        name: productName.value,
        shortDes: shortLine.value,
        des: des.value,
        images: imagePaths,
        sizes: sizes,
        sellPrice: sellingPrice.value,
        stock: stock.value,
        tags: tags.value,
        tac: tac.checked,
        email: user.email
    }
}
addProductBtn.addEventListener('click', () => {
    storeSizes();
    if (validateForm()) { 
        loader.style.display = 'block';
        let data = productData();
        if(productId){
            data.id=productId;
        }
        sendData('/add-product', data);
    }
})

saveDraft.addEventListener('click', ()=>{
    storeSizes();
    if(!productName.value.length){
        showAlert('enter product name');
    }
    else{
        let data=productData();
        data.draft=true;
        if(productId){
            data.id=productId;
        }
        sendData('/add-product', data);
    }
})
const setFormsData=(data)=>{
    productName.value=data.name;
    console.log(data.shortLine);
    shortLine.value=data.shortDes;
    des.value=data.des;
    sellingPrice.value=data.sellPrice;
    stock.value=data.stock;
    tags.value=data.tags;

    imagePaths=data.images;
    imagePaths.forEach((url, i)=>{
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`);
        label.style.backgroundImage = `url(${url})`;
        let productImage = document.querySelector('.product-image');
        productImage.style.backgroundImage = `url(${url})`;
    });
    sizes=data.sizes;
    let sizeCheckBox =document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item=>{
        if(sizes.includes(item.value)){
            item.setAttribute('checked','');
        }
    });
}
const fetchProductData = () =>{
    fetch('/get-products',{
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({email: user.email, id: productId})
    }).then(res=>res.json()).then(data => {setFormsData(data)});
    
}
let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
        fetchProductData();
}
