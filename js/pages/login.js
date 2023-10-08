import { BASE_API_URL } from '../helpers/variables.js';
import { redirect, getAuthUser } from '../helpers/functions.js';
import HttpClient from '../classes/HttpClient.js';

const isAuthUser = getAuthUser();

if(isAuthUser){
    redirect('/');
}

const loginForm = document.querySelector('.login-form');

const usernameOrEmailInput = document.querySelector('#username-or-email');
const passwordInput = document.querySelector('#password');

 const USERS_API_URL = `${BASE_API_URL}/users`;

 const usersClient = new HttpClient(USERS_API_URL);

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    usersClient.get()
               .then(users => {
                const usernameOrEmailValue = usernameOrEmailInput.value;

                const foundUser = users.find(user => user.email === usernameOrEmailValue
                                             || user.username === usernameOrEmailValue);
        
                if(!foundUser){
                    alert('Invalid credentials!');
                    return;
                }
        
                const passwordValue = passwordInput.value;
        
                const arePasswordEquals = passwordValue === foundUser.password;
        
        
                if(!arePasswordEquals){
                    alert('Invalid credentials!');
                    return;
                }
        
        
                localStorage.setItem('auth-user', JSON.stringify(foundUser));
        
                redirect('/');
               })

})