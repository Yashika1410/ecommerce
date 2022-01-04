const createNavFun=()=>{
    let nav=document.querySelector('.navbar');
    nav.innerHTML=`
    <div class="nav">
    <img src="images/logo.png" class="company-logo" alt="">
    <div class="nav-items">
        <div class="search">
            <input type="text" class="search-box" placeholder="search brand, product">
            <button class="search-btn">search</button>
        </div>
        <a href="#"><img src="images/user.png" alt=""></a>
        <a href="#"><img src="images/cart.png" alt=""></a>
    </div>
</div>
<ul class="links-container">
    <li class="link-items"><a href="#" class="link">Home</a></li>
    <li class="link-items"><a href="#" class="link">Accessories</a></li>
    <li class="link-items"><a href="#" class="link">Cloths</a></li>
</ul>`;
}
createNavFun();