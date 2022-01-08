let user = JSON.parse(sessionStorage.user || null);
window.onload= () => {
    if(user){
        if(compareToken(user.authToken,user.email)){
            //setupProducts();
            fetchPlaceProductData()
        }
    }
    else{
        location.replace('/login');
    }
}
const fetchPlaceProductData=()=>{
    fetch('/get-products',{
        method: 'post',
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email:user.email,plOrder:'all'})
    }).then(res=>res.json()).then(data=>{
        //setPlaceProducts('cart',data);
        console.log(JSON.parse(JSON.parse(data[0].order)));
    }).catch(err=>{
     location.replace('/404');
       // console.log(err);
    });
}

const createPlaceSmallCards=(data)=>{
    return `
    <div class="sm-product">
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <div class="item-counter">
            <p class="item-count">${data.item}</p>
        </div>
        <p class="sm-price" data-price="${data.sellPrice}">Rs.${data.sellPrice * data.item}</p>
    </div>
    `;
}
let totalBill=0;
const setPlaceProducts=(name,data)=>{
    const element= document.querySelector(`.${name}`);
    console.log(element);
    if(data == null){
        element.innerHTML=`<img src="../images/empty-cart.png" class="empty-img" alt="">`;
    }
    else{
        for(let i=0;i<data.length; i++){
            element.innerHTML+= createSmallCards(data[i]);
            if(name=='cart'){
                totalBill+=Number(data[i].sellPrice * data[i].item);
            }
        }
        updateBill()
    }
    setupEvents(name);
}

