import { getAuthUser, redirect, guid } from '../helpers/functions.js';
import { BASE_API_URL } from '../helpers/variables.js';
import HttpClient from '../classes/HttpClient.js';

//Row template
const rowTemplate = document.querySelector('#row-template');

//Tables bodies...
const usersTableBody = document.querySelector('.users-table__body');
const productsTableBody = document.querySelector('.products-table__body');

// User form
const userForm = document.querySelector('.user-form');

//User inputs...
const userFirstNameInput = document.querySelector('#first-name');
const userLastNameInput = document.querySelector('#last-name');
const userUsernameInput = document.querySelector('#username');
const userEmailInput = document.querySelector('#email');
const userPasswordInput = document.querySelector('#password');
const userGenderSelect = document.querySelector('#gender');
const userRoleSelect = document.querySelector('#role');

//Product form ...
const productForm = document.querySelector('.product-form');

//Product inputs...
const productNameInput = document.querySelector('#name');
const productImageUrlInput = document.querySelector('#img-url');
const productPriceInput = document.querySelector('#price');
const productCategorySelect = document.querySelector('#category');
const productQuantityInput = document.querySelector('#quantity');

//Getting authenticated user from local storage...
const authUser = getAuthUser();

// Check if authenticated user exists
// If there is not an authenticated user -> redirect to login page
if(!authUser){
    redirect('/login');
}

// If there is authenticated user -> check if he is admin
// If he is not - redirect to home page...
if(!authUser.isAdmin){
    alert('You dont have permissions!');
    redirect('/');
}

const USERS_API_URL = `${BASE_API_URL}/users`;

const usersClient = new HttpClient(USERS_API_URL);

let users = [];

//Print users list in the users table...

usersClient.get()
           .then(data => {
               users = data.map(({ id, firstName, lastName, email, username, isAdmin, createdAt}) => {
                const rowTemplateClone = rowTemplate.content.cloneNode(true);

                const userRow = rowTemplateClone.querySelector('.user-row');
    
                setTextContentToElement(userRow, '.user-row__id', id);
                setTextContentToElement(userRow, '.user-row__first-name', firstName);
                setTextContentToElement(userRow, '.user-row__last-name', lastName);
                setTextContentToElement(userRow, '.user-row__email', email);
                setTextContentToElement(userRow, '.user-row__username', username);
                setTextContentToElement(userRow, '.user-row__administrator', isAdmin.toString());
                setTextContentToElement(userRow, '.user-row__created-at', createdAt);
    
                userRow.querySelector('.user-row__delete-button').addEventListener('click', () => { 
    
                    const adminOperationResponse = confirm(`Are you sure you want to delete user with ID: ${id}, name: ${firstName} ${lastName}?`);
                    
                    if(!adminOperationResponse){
                        return;
                    }
        
                    const deletedUser = users.find(u => u.user.id === id);
                    
                    deletedUser.element.classList.add('hidden');
        
                    usersClient.delete(id)
                            .then(_ => {
                                alert(`Succesfully deleted user with name ${firstName} ${lastName}`);
                            })
                });
    
                userRow.querySelector('.user-row__edit-button').addEventListener('click', () => {
    
                })
    
                usersTableBody.append(userRow);
    
                    return {
                        user: {
                            id,
                            firstName,
                            lastName,
                            email,
                            username,
                            isAdmin,
                            createdAt
                        },
                        element: userRow
                    }
               })
           })
           .catch(err => {
                console.log(err);
           })

 const PRODUCTS_API_URL = `${BASE_API_URL}/products`;

const productsClient = new HttpClient(PRODUCTS_API_URL);

let products = [];

// Print products list in the products table...

productsClient.get()
              .then(data => {
                products = data.map(({id, name, price, quantity, orderedTimes, category}) => {
                    const rowTemplateClone = rowTemplate.content.cloneNode(true);
        
                    const productRow = rowTemplateClone.querySelector('.product-row');
            
                    setTextContentToElement(productRow, '.product-row__id', id);
                    setTextContentToElement(productRow, '.product-row__name', name);
                    setTextContentToElement(productRow, '.product-row__price', price);
                    setTextContentToElement(productRow, '.product-row__quantity', quantity);
                    setTextContentToElement(productRow, '.product-row__category', category);
                    setTextContentToElement(productRow, '.product-row__ordered-times', orderedTimes);
             
                    productRow.querySelector('.product-row__delete-button').addEventListener('click', () => {
                        const adminOperationResponse = confirm(`Are u sure u want to delete product with ID: ${id} and name ${name}`);
            
                        if(!adminOperationResponse){
                            return;
                        }
        
                        const deletedProduct = products.find(p => p.product.id === id);

                              deletedProduct.element.classList.add('hidden');

                              productsClient.delete(id)
                                             .then(_ => {
                                                alert(`Succesfully deleted product - ${name}`);
                                             })
            
                        
                    });
            
                    productRow.querySelector('.product-row__edit-button').addEventListener('click', () => {
                        alert('Product edit button clicked!');
                    })
            
                    productsTableBody.append(productRow);
            
                    return {
                        product: {
                            id,
                            name,
                            category, 
                            orderedTimes,
                            price,
                            quantity
                        },
                        element: productRow
                    }
                })
             })
             .catch(err => {
                console.log(err);
             })


//Create user ...

userForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const usersList = users.map(({user}) => user);


    const isUsernameFound = usersList.find(user => user.username === userUsernameInput.value);

    if(isUsernameFound){
        alert('Username is already used!');
        return;
    }

    const isEmailFound = usersList.find(user => user.email === userEmailInput.value);

    if(isEmailFound){
        alert('Email is already user!');
        return;
    }

    const firstName = userFirstNameInput.value;
    const lastName = userLastNameInput.value;
    const username = userUsernameInput.value;
    const email = userEmailInput.value;
    const password = userPasswordInput.value;
    const gender = userGenderSelect.value;
    const isAdmin = userRoleSelect.value === 'administrator' ? true : false;

    const newUser = {
        id: guid(),
        firstName,
        lastName,
        username,
        email,
        password,
        gender,
        isAdmin,
        savedProducts: [],
        favoritesProducts: [],
        cartProducts: [],
        createdAt: new Date()
    }

    usersClient.post(newUser)
                .then(_ => {
                    alert('Successfully created user!');
                })
                .catch(err => {
                    console.log(err);
                });


})

//Create product...

productForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const productsList = products.map(({product}) => product);

    const isNameFound = productsList.find(product => product.name === productImageUrlInput.value);

    if(isNameFound){
        alert('Product name already exists!');
        return;
    }

    const name = productNameInput.value;
    const img = productImageUrlInput.value;
    const price = Number(productPriceInput.value);
    const category = productCategorySelect.value;
    const quantity = Number(productQuantityInput.value);

    const newProduct = {
        id: guid(),
        name,
        img,
        price,
        category,
        quantity,
        orderedTimes: 0
    }

    productsClient.post(newProduct)
                   .then(_ => {
                    alert('Succesfully created product!');
                   })
                   .catch(err => {
                    console.log(err);
                   })



})


// Helper function for seting content to element...
function setTextContentToElement(parentElement, childrenSelector, elementContent){
    parentElement.querySelector(childrenSelector).textContent = elementContent;
}     


