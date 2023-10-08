import { getAuthUser, redirect, printProducts } from '../helpers/functions.js';
import { BASE_API_URL } from '../helpers/variables.js';
import HttpClient from '../classes/HttpClient.js';

const productCardTemplate = document.querySelector('#product-card-template');

const userSavedProductsContainer = document.querySelector('.user-saved');
const userFavoriteProductsContainer = document.querySelector('.user-favorites');

const userName = document.querySelector('.user__name');
const userUsername = document.querySelector('.user__username');
const userEmail = document.querySelector('.user__email');

const favoritesClearButton = document.querySelector('.favorites-clear-button');
const savedClearButton = document.querySelector('.saved-clear-button');

const favoritesProductsEmptyContainer = document.querySelector('.favorites-products-empty');
const savedProductsEmptyContainer = document.querySelector('.saved-products-empty');


const isAuthUser = getAuthUser();

if(!isAuthUser){
    redirect('/login');
}

const authUser = getAuthUser();

userName.textContent = `${authUser.firstName} ${authUser.lastName}`;
userUsername.textContent = `@${authUser.username}`;
userEmail.textContent = `${authUser.email}`;


// userFavoritesButton.addEventListener('click', () => {
//     const isHidden = userFavoritesSection.classList.contains('hidden');

//     if(!isHidden){
//         hideElement(userFavoritesSection);
//     } else{
//         showElement(userFavoritesSection);
//     }
// });

// userSavedButton.addEventListener('click', () => {
//      const isHidden = userSavedSection.classList.contains('hidden');

//      if(!isHidden){
//         hideElement(userSavedSection);
//      } else{
//         showElement(userSavedSection);
//      }
// });

const USERS_API_URL = `${BASE_API_URL}/users`;

const usersClient = new HttpClient(USERS_API_URL);

favoritesClearButton.addEventListener('click', () => {
   
       let authUser = getAuthUser();

       authUser.favoritesProducts = [];

       usersClient.put(authUser, authUser.id)
                  .then(_ => {
                      localStorage.setItem('auth-user', JSON.stringify(authUser));
                  }) 
                  .catch(err => {
                    console.log(err);
                  })
}) 

savedClearButton.addEventListener('click', () => {

    let authUser = getAuthUser();

    authUser.savedProducts = [];

    usersClient.put(authUser, authUser.id)
               .then(_ => {
                  localStorage.setItem('auth-user', JSON.stringify(authUser));
               })
               .catch(err => {
                console.log(err);
               })

})

let savedProducts = authUser.savedProducts;

if(savedProducts.length > 0){
    printProducts(savedProducts, userSavedProductsContainer, productCardTemplate);
    hideElement(savedProductsEmptyContainer)
} else{
    showElement(savedProductsEmptyContainer);
}

let favoritesProducts = authUser.favoritesProducts;

if(favoritesProducts.length > 0){
    printProducts(favoritesProducts, userFavoriteProductsContainer, productCardTemplate);
    hideElement(favoritesProductsEmptyContainer);
} else{
    showElement(favoritesProductsEmptyContainer);
}



function hideElement(element){
    element.classList.add('hidden');
}

function showElement(element){
    element.classList.remove('hidden');
}



