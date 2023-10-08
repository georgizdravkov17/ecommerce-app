import { BASE_API_URL } from '../helpers/variables.js';
import { guid, getAuthUser, redirect } from '../helpers/functions.js';
import HttpClient from '../classes/HttpClient.js';

const isAuthUser = getAuthUser();

if(isAuthUser){
    redirect('/');
}

const registerForm = document.querySelector('.register-form');

const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const genderSelect = document.querySelector('#gender');
const termsChechbox = document.querySelector('#terms');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const areTermsAccepted = termsChechbox.checked;

    if(!areTermsAccepted){
        alert('All fields are required!');
        return;
    }

    const arePasswordEquals = passwordInput.value === confirmPasswordInput.value;

    if(!arePasswordEquals){
        alert('Passwords are not same!');
        return;
    }

    const USERS_API_URL = `${BASE_API_URL}/users`;

    const usersClient = new HttpClient(USERS_API_URL);

    usersClient.get()
               .then(users => {
                const isEmailFound = users.find(user => user.email === emailInput.value);

                if(isEmailFound){
                    alert('Email is already used!');
                    return;
                }
    
                const isUsernameFound = users.find(user => user.username === usernameInput.value);
    
                if(isUsernameFound){
                    alert('Username is already userd!');
                    return;
                }
    
               const firstName = firstNameInput.value.trim();
               const lastName = lastNameInput.value.trim();
               const username = usernameInput.value.trim();
               const email = emailInput.value.trim();
               const password = passwordInput.value;
               const gender = genderSelect.value;
    
               const newUser = {
                    id: guid(),
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    email,
                    gender,
                    savedProducts: [],
                    favoritesProducts: [],
                    cartProducts: [],
                    ordres: [],
                    isAdmin: false,
                    createdAt: new Date()
               }
    
              return usersClient.post(newUser)


            })
            .then(_ => {
                redirect('/login');
            })
            .catch(err => {
                console.log(err);
            });

    })