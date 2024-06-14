const logo = document.querySelector('#header-hermes-logo');
const input_field = document.querySelector('#header-search-field');
const search_icon = document.querySelector('#header-search-icon');
const scrW = screen.width;

input_field.addEventListener('focus', () => {
    input_field.style.width = '100%';
    if (scrW < 768) {
        input_field.style.transition = 'width .2s ease-out'
        input_field.style.height = 36 / 13 + 'rem';
        input_field.style.border = '1px solid #000';
        input_field.style.paddingLeft = 5 / 13 + 'rem'
        search_icon.style.display = 'none';

    }
    else {

    }
    logo.style.display = 'none'
})



input_field.addEventListener('blur', () => {
    if (scrW < 768) {
        search_icon.style.display = 'block'
        input_field.style.width = 1 / 13 + 'rem'
        input_field.style.height = 1 / 13 + 'rem'
        input_field.style.border = 'none'
    }
    else {
        input_field.style.width = 140 / 13 + 'rem'
    }
    logo.style.display = 'block';
})
search_icon.addEventListener('click', () => {
    input_field.focus();
})





