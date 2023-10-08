import { addRedirectEvent, getAuthUser, logout  } from '../helpers/functions.js';

const headerLogo = document.querySelector('.header__logo');

const headerNav = document.querySelector('.header__nav');
const navCloseButton = document.querySelector('.header__nav-close-button');

const headerMenuButton = document.querySelector('.header__menu-button');
const headerCartButton = document.querySelector('.header__cart-button');
const headerProfileButton = document.querySelector('.header__profile-button');
const headerRegisterButton = document.querySelector('.header__register-button');
const headerLoginButton = document.querySelector('.header__login-button');
const headerLogoutButton = document.querySelector('.header__logout-button');

const headerNavDashboardLink = document.querySelector('.header__nav-list-dashboard-link');

const authUser = getAuthUser();

if(!authUser){
    headerLogoutButton.classList.add('hidden');
} else{
    headerRegisterButton.classList.add('hidden');
    headerLoginButton.classList.add('hidden');
}

if(authUser && authUser.isAdmin){
    headerNavDashboardLink.classList.remove('hidden');
}

addRedirectEvent(headerLogo, '/index');
addRedirectEvent(headerCartButton, '/cart');
addRedirectEvent(headerProfileButton, '/profile');
addRedirectEvent(headerLoginButton, '/login');
addRedirectEvent(headerRegisterButton, '/register');

headerLogoutButton.addEventListener('click', () => {
    logout();
})

headerMenuButton.addEventListener('click', () => {
    headerNav.classList.remove('hidden');
})

navCloseButton.addEventListener('click', () => {
    headerNav.classList.add('hidden');
})