import { BASE_API_URL } from '../helpers/variables.js';
import { printProducts } from '../helpers/functions.js';
import HttpClient from '../classes/HttpClient.js';

const productsContainer = document.querySelector('.products-container__content');

const productCardTemplate = document.querySelector('#product-card-template');

const search = document.querySelector('#search');

const PRODUCTS_API_URL = `${BASE_API_URL}/products`;

const productsClient = new HttpClient(PRODUCTS_API_URL);

let womanProducts = [];

productsClient.get()
              .then(products => {
                const filteredWomanProducts = products.filter(product => product.category === 'woman');

                womanProducts = printProducts(filteredWomanProducts, productsContainer, productCardTemplate);
              })
              .catch(err => {
                console.log(err);
              })



search.addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase().trim();

    let matchedItemsCount = 0;

   const shownItems = womanProducts.forEach(({product, element}) => {
     
        if(!product.name.toLowerCase().includes(searchQuery)){
            element.classList.add('hidden');
        } else{
           element.classList.remove('hidden');
           matchedItemsCount++;
        }
    })


    if(matchedItemsCount === 0){
        document.querySelector('.products-container__empty').classList.remove('hidden')
    } else{
        document.querySelector('.products-container__empty').classList.add('hidden')
    }
})    