import { BASE_API_URL } from '../helpers/variables.js';
import { addRedirectEvent, printProducts } from '../helpers/functions.js';
import HttpClient from '../classes/HttpClient.js';

const womanBestSellersContainer = document.querySelector('.woman-best-sellers');
const manBestSellersContainer = document.querySelector('.man-best-sellers');

const productCardTemplate = document.querySelector('#product-card-template');

const manCategory = document.querySelector('.category-man');
const womanCategory = document.querySelector('.category-woman');

const womanSeeMoreButton = document.querySelector('.woman-see-more-button');
const manSeeMoreButton = document.querySelector('.man-see-more-button');

addRedirectEvent(womanSeeMoreButton, '/woman');
addRedirectEvent(manSeeMoreButton, '/man');

addRedirectEvent(manCategory, '/man');
addRedirectEvent(womanCategory, '/woman');

const PRODUCTS_API_URL = `${BASE_API_URL}/products`;

const productsClient = new HttpClient(PRODUCTS_API_URL);

productsClient.get()
               .then(products => {

                const womanBestSellers = products.filter(p => p.category === 'woman').sort((a, b) => a.orderedTimes - b.orderedTimes).slice(-3);
                const manBestSellers = products.filter(p => p.category === 'man').sort((a, b) => a.orderedTimes - b.orderedTimes).slice(-3);
        
                printProducts(womanBestSellers, womanBestSellersContainer, productCardTemplate);
                printProducts(manBestSellers, manBestSellersContainer, productCardTemplate);
               })
               .catch(err => {
                console.log(err);
               });

