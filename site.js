const data= [
    {
        id : 0,
        img : '/images1/dish-1.png',
        name : 'hamburger "200 g"',
        price : 19,
        save : 25,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 1,
        img : '/images1/dish-2.png',
        name : 'Shnetsel "12"',
        price : 18,
        save : 50,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 2,
        img : '/images1/dish-3.png',
        name : 'Sheken',
        price : 17,
        save : 30,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 3,
        img : '/images1/dish-4.png',
        name : 'pizza Nabole',
        price : 31,
        save : 31,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 4,
        img : '/images1/about-img.png',
        name : 'Fish',
        price : 14,
        save : 15,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 5,
        img : '/images1/dish-6.png',
        name : 'KFC Sheken',
        price : 12,
        save : 25,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 6,
        img : '/images1/menu-1.jpg',
        name : 'Pizza visva',
        price : 11,
        save : 20,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 7,
        img : '/images1/menu-2.jpg',
        name : 'hamburger "150 g"',
        price : 15,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 8,
        img : '/images1/menu-6.jpg',
        name : 'ice cream',
        price : 10,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 9,
        img : '/images1/menu-7.jpg',
        name : 'juice',
        price : 14,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 10,
        img : '/images1/menu-8.jpg',
        name : 'ice cream',
        price : 11,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 11,
        img : '/images1/menu-9.jpg',
        name : 'juice',
        price : 11,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 12,
        img : '/images1/home-img-1.png',
        name : 'indomie',
        price : 11,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 13,
        img : '/images1/home-img-2.png',
        name : 'Sheken',
        price : 11,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 14,
        img : '/images1/home-img-3.png',
        name : 'Pizza Hot',
        price : 13,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 15,
        img : '/images1/menu-3.jpg',
        name : 'Shom and zatar',
        price : 11,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 16,
        img : '/images1/dish-5.png',
        name : 'chocolate ice cream 1 ',
        price : 15,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 17,
        img : '/images1/menu-4.jpg',
        name : 'chocolate ice cream 2 ',
        price : 9,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 18,
        img : '/images1/menu-5.jpg',
        name : 'chocolate ice cream 3 ',
        price : 8,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
    {
        id : 19,
        img : '/images1/menu-4.jpg',
        name : 'chocolate ice cream 4',
        price : 9,
        save : 10,
        delievery : 'In 30 - 40 Min',
        itemInCart: false
    },
];

let cartList=[]; //array to store cart lists

var i;
var detail =document.getElementsByClassName('card-item');
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('buy')
back.addEventListener('click',refreshPage)
var addToCarts = document.querySelectorAll('#add-to-cart')
var cart = document.getElementById('cart');

// click event to display cart page
cart.addEventListener('click',displayCart)

var carts = document.getElementById('carts');

//click events to add items to cart from details page
carts.addEventListener('click',()=>addToCart(getId))

var home = document.getElementById('logo');

//click event to hide cart page and return to home page
home.addEventListener('click',hideCart);

//events on dynamically created element to remove items from list
document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        var itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


//click event to display details page
for(i=0;i<data.length;i++){
    detail[i].addEventListener('click',handleDetail)
}

var getId;

//click events to add items to cart from home page cart icon
addToCarts.forEach(val=>val.addEventListener('click',()=>addToCart(val.parentNode.id)));

// details function
function handleDetail(e){
    detailsPage.style.display = 'block'
    getId= this.parentNode.id;
    detailsImg.src= data[getId].img;
    detailTitle.innerHTML=   data[getId].name;
    detailPrice.innerHTML= 'Price : $ ' +data[getId].price;
    youSave.innerHTML= 'You save : ($ ' + data[getId].save + ')';
}

// add item to the cart
function addToCart(id) {
    if(!data[id].itemInCart){
        cartList= [...cartList,data[id]];
        addItem()
        
        alert('item added to your cart')

    }
    else{
        alert('your item is already there')
    }
    data[id].itemInCart= true
}

//back to main page
function refreshPage(){
    detailsPage.style.display = 'none'
}

// hide your cart page
function hideCart(){
    document.getElementById('main').style.display= "block";
    document.getElementById('cart-container').style.display= "none";
}

//display your cart page
function displayCart(){
    document.getElementById('main').style.display= "none";
    document.getElementById('details-page').style.display= "none";
    document.getElementById('cart-container').style.display= "block";
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
    else{
        document.getElementById('empty-cart').style.display= "none";
        document.getElementById('cart-with-items').style.display= "block";
        
    }
}

var totalAmount;
var totalItems;
var totalSaving;

//add item to the cart
function addItem(){
    totalAmount=0;
    totalItems = 0;
    totalSaving=0
    var clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        console.log(clrNode.childNodes)
        cartList.map((cart)=>
        {
            var cartCont = document.getElementById('item-body');
            totalAmount = totalAmount + cart.price;
            totalSaving = totalSaving + cart.save;
            totalItems = totalItems + 1;

            var tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            var listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            var listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)

            var listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            var listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            var listTrash = document.createElement('i');
            listTrash.setAttribute('class','fa fa-trash ');
            listTrash.setAttribute('id','remove');
            tempCart.appendChild(listTrash);

            cartCont.appendChild(tempCart)
            
        })
        document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
        document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
        document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalSaving;
        document.getElementById('total').style.display= "block";
}

//remove item from the cart
function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=>list.id!=itemId);
    addItem()
    if(cartList.length==0){
        document.getElementById('cart-with-items').style.display= "none";
        document.getElementById('empty-cart').style.display= "block";
    }
}



function Buy(){
    alert('ALL IS DANE . THANK YOU !!!')
}


