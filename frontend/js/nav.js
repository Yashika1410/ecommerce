const createNavFun=()=>{
    let nav=document.querySelector('.navbar');
    nav.innerHTML=`
    <div class="nav">
    <img src="../images/logo.png" class="company-logo" alt="">
    <div class="nav-items">
        <div class="search">
            <input type="text" class="search-box" placeholder="search brand, product">
            <button class="search-btn">search</button>
        </div>
        <a><img src="../images/user.png" id="user-img" alt="">
        <div class="login-logout-popup hide">
        <p class="acco-info">Log in as, name</p>
        <button class="btn" id="user-btn">Log out</button>
        </div>
        </a>
        <a href="/cart"><img src="../images/cart.png" alt=""></a>
    </div>
</div>
<ul class="links-container">
    <li class="link-items"><a href="#" class="link">Home</a></li>
    <li class="link-items"><a href="#" class="link">Accessories</a></li>
    <li class="link-items"><a href="#" class="link">Cloths</a></li>
</ul>`;
}
createNavFun();
const userImgBtn=document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');
const popuptxt = document.querySelector('.acco-info');
const actionBtn = document.querySelector('#user-btn');
userImgBtn.addEventListener('click',()=>{
    userPop.classList.toggle('hide');
})
window.onload=()=>{
    let user=JSON.parse(sessionStorage.user||null);
    if(user!=null){
        popuptxt.innerHTML=`Log in as,${user.name}`;
        actionBtn.innerHTML='Log out';
        actionBtn.addEventListener('click',()=>{
            sessionStorage.clear();
            location.reload();
        })
    }
    else{
        popuptxt.innerHTML=`Log in to place order`;
        actionBtn.innerHTML='Log In';
        actionBtn.addEventListener('click',()=>{
            location.href='/login';
        })
    }
}