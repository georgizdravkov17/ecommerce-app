const popUp = document.querySelector('.pop-up');
const popUpCloseButton = document.querySelector('.pop-up__close-button');

window.onload = () => {
    setTimeout(() => {
         popUp.classList.remove('hidden');
    }, 5000)
}

popUpCloseButton.addEventListener('click', () => {
    popUp.classList.add('hidden');
})