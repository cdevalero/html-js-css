const burger = document.querySelector('.nav--burger');
const banner = document.querySelector('.banner');

burger.addEventListener('click', () => {
    burger.classList.toggle('change');
    banner.classList.toggle('show');
});

