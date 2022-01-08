window.onload=()=>{
    if(!sessionStorage.user){
        location.replace('/login');
    }
}

const placeOrderBtn=document.querySelector('.place-order-btn');
placeOrderBtn.addEventListener('click',()=>{
    // console.log('click');
    let address =getAddress();
    
   if(address){ 
       console.log(localStorage.cart);
       fetch('/order',{
        method:'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            order: JSON.stringify(localStorage.cart),
            email: JSON.parse(sessionStorage.user).email,
            add: address,
        })
    }).then(res=> res.json()).then(data=>{
        // showAlert(data.alert,'success');
        if(data.alert=='your order is placed'){
            delete localStorage.cart;
            showAlert(data.alert,'success');
        }
        else{
            showAlert(data.alert);
        }
    })
}
})

const getAddress=()=>{
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pinecode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;

    if(!address.length ||!street.length ||!city.length ||!state.length ||!pinecode.length ||!landmark.length){
        showAlert('Fill all inputs first');
    }
    else{
        return { address,street,city,state,pinecode,landmark};
    }
}