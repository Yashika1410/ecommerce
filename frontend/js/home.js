const setupSliderEffect=()=>{}
const productContainers = [...document.querySelectorAll('.product-container')];
const nextBtn = [...document.querySelectorAll('.next-btn')];
const preBtn = [...document.querySelectorAll('.prev-btn')];

productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nextBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
const getProducts=()=>{
    return fetch('/get-products',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({all: 'all'})
    }).then(res=>res.json()).then(data=>{
            return data;
        })
}
// const createProductSlider=(data,parent,title)=>{
//     let slideContainer=document.querySelector(`${parent}`);
//     console.log(slideContainer);
//     slideContainer.innerHTML+=`
//     <section class="product">
//         <h2 class="product-category">${title}</h2>
//         <button class="prev-btn"><img src="images/arrow.png" alt=""></button>
//         <button class="next-btn"><img src="images/arrow.png" alt=""></button>
//         ${createProductCards(data)}
//     </section>`;
//  // setupSliderEffect();
// }
const createProductCards =(data)=>{
    let middle='';
    for(let i=0; i<data.length; i++){
        if(data[i].id!=decodeURI(location.pathname.split('/').pop()))
        middle +=`
        <div class="product-card">
                <div class="product-image" onclick="location.href='/products/${data[i].id}'>
                    <img src="${data[i].images[0]}" class="product-thumb" alt="">
                </div>
                <div class="product-info" ">
                    <h2 class="product-brand">${data[i].name}</h2>
                    <p class="product-short-des">${data[i].shortDes}</p>
                    <span class="price">Rs. ${data[i].sellPrice}</span>
                </div>
            </div>
        `;
    }
   // console.log(middle);
    return middle;
}
// <button class="card-btn">add to whislist</button>
const add_product_to_cart_or_wishlist=(type, product)=>{
    let data=JSON.parse(localStorage.getItem(type));
    if(data==null){
        data=[];
    }
    product={
        item:1,
        name: product.name,
        sellPrice:product.sellPrice,
        size: size || null,
        shortDes: product.shortDes,
        image: product.images[0]
    }
    data.push(product);
   localStorage.setItem(type,JSON.stringify(data))
    return 'added'
}