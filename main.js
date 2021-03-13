let phone = document.querySelector('.phone--contact');
let black = document.querySelector('.black');
let phoneNumberButton = document.querySelector('.button--card');
let phoneCard = document.querySelector('.phone--card');

let email = document.querySelector('.email--contact');
let emailNumberButton = document.querySelector('.button--card--email');
let emailCard = document.querySelector('.email--card');

phone.addEventListener('click', () => {
    phoneCard.style.display = 'flex'
    black.style.display = 'block'
    new ClipboardJS('.button--card');

});

black.addEventListener('click', () => {
    phoneCard.style.display = 'none'
    black.style.display = 'none'
});

phoneNumberButton.addEventListener('click', () => {
    phoneCard.style.display = 'none'
    black.style.display = 'none'
});

email.addEventListener('click', () => {
    emailCard.style.display = 'flex'
    black.style.display = 'block'
    new ClipboardJS('.button--card--email');

});

black.addEventListener('click', () => {
    emailCard.style.display = 'none'
    black.style.display = 'none'
});

emailNumberButton.addEventListener('click', () => {
    emailCard.style.display = 'none'
    black.style.display = 'none'
});
