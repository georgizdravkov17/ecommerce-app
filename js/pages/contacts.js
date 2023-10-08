const contactsForm = document.querySelector('.contacts__form');

const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');

contactsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
    }

    const serviceID = 'service_ay2kras';

    const templateID = 'template_7qh3esc';

    emailjs.send(serviceID, templateID, data)
           .then(res => {
               firstNameInput.value = '';
               lastNameInput.value = '';
               emailInput.value = '';
               subjectInput.value = '';
               messageInput.value = '';
               alert('Successfully send email!');
           })

           .catch(err => {
            console.log(err);
           })

})