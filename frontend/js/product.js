const productImages = document.querySelectorAll(".product-images img"); // selecting all image thumbs
const productImageSlide = document.querySelector(".image-slider"); // seclecting image slider element

let activeImageSlide = 0; // default slider image

productImages.forEach((item, i) => { // loopinh through each image thumb
    item.addEventListener('click', () => { // adding click event to each image thumbnail
        productImages[activeImageSlide].classList.remove('active'); // removing active class from current image thumb
        item.classList.add('active'); // adding active class to the current or clicked image thumb
        productImageSlide.style.backgroundImage = `url('${item.src}')`; // setting up image slider's background image
        activeImageSlide = i; // updating the image slider variable to track current thumb
    })
})
const sizeBtns = document.querySelectorAll('.size-radio-btn'); // selecting size buttons
let checkedBtn = 0; // current selected button
let size;
sizeBtns.forEach((item, i) => { // looping through each button
    item.addEventListener('click', () => { // adding click event to each 
        sizeBtns[checkedBtn].classList.remove('check'); // removing check class from the current button
        item.classList.add('check'); // adding check class to clicked button
        checkedBtn = i; // upading the variable
        size=item.innerHTML;
    })
})


const setFormsData=(data)=>{
    let title =document.querySelector('title');
    title.innerHTML+=data.name;
    productImages.forEach((img,i)=>{
        if(data.images[i]){
            img.src=data.images[i];
        }
        else{
            img.style.display='none';
        }
    })
    productImages[0].click();
    sizeBtns.forEach(item=>{
        if(!data.sizes.includes(item.innerHTML)){
            item.style.display='none';
        }
    });

    const name=document.querySelector('.product-brand');
    const shortDes=document.querySelector('.product-short-des');
    const des=document.querySelector('.des');
    const price=document.querySelector('.product-price');
    title.innerHTML+=name.innerHTML=data.name;
    shortDes.innerHTML=data.shortDes;
    des.innerHTML=data.des;
    price.innerHTML=`Rs. ${data.sellPrice}`;
    const wishlistBtn=document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click',()=>{
        wishlistBtn.innerHTML=add_product_to_cart_or_wishlist('wishlist',data);
    });
    const cartBtn=document.querySelector('.cart-btn');
    cartBtn.addEventListener('click',()=>{
        cartBtn.innerHTML=add_product_to_cart_or_wishlist('cart',data);
    })
}
const fetchProductData=()=>{
    fetch('/get-products',{
        method: 'post',
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({id: productId})
    }).then(res=>res.json()).then(data=>{
        setFormsData(data);
    }).catch(err=>{
     location.replace('/404');
       // console.log(err);
    });
}

let productId=null;
if(location.pathname!='/products'){
    productId=decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}