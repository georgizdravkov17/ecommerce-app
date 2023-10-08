import { BASE_API_URL } from '../helpers/variables.js';
import { getAuthUser, updateLocalStorageCollection, redirect } from '../helpers/functions.js';
import HttpClient from '../classes/HttpClient.js';

const authUser = getAuthUser();

if(!authUser){
   redirect('/login');
}

const cartProductsContainer = document.querySelector('.cart-products');

const cartPayment = document.querySelector('.cart-payment');

const cartProductTemplate = document.querySelector('#cart-product-template');

const cartProducts = getAuthUser().cartProducts;

  cartProducts.map(product => {
    const cartProductTemplateClone = cartProductTemplate.content.cloneNode(true);

    const cartProduct = cartProductTemplateClone.querySelector('.cart-product');

    cartProduct.querySelector('.cart-product__img').setAttribute('src', product.img);
    cartProduct.querySelector('.cart-product__img').setAttribute('alt', product.name);

    cartProduct.querySelector('.cart-product__remove').addEventListener('click', () => {

         const filteredProducts = cartProducts.filter(p => p.id !== product.id);

         let authUser = getAuthUser();

         authUser.cartProducts = filteredProducts;

         localStorage.setItem('auth-user', JSON.stringify(authUser));

         const USERS_API_URL = `${BASE_API_URL}/users`;

         const usersClient = new HttpClient(USERS_API_URL);

         usersClient
              .put(authUser, authUser.id)
              .then(_ => {
                alert('Succesfully removed item!');
              })
              .catch(err => {
               console.log(err);
              });
    })

    const quantityInput = cartProduct.querySelector('#quantity');

    cartProduct.querySelector('.cart-product__price-calculations').textContent = `${quantityInput.value} * ${product.price}`;


    cartProduct.querySelector('.cart-product__name').textContent = product.name;
    cartProduct.querySelector('.cart-product__price').textContent = product.price;



    cartProductsContainer.append(cartProduct);

    return {
        product,
        element: cartProduct
    }

})




