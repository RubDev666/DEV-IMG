import { 
    validateForm, 
    validarNumeroPagina, 
    firstLoadScreen, 
    scrollImages,
    nextPage,
    prevPage,
    adjustColumns 
} from "./getImages.js";

import {
    formHeaderContainer,
    btnSearch,
    btnClose,
    formHeader,
    formMain,
    formPage,
    nextBtn,
    nextBtnMain,
    prevBtn
} from './querySelectors.js';

window.addEventListener('DOMContentLoaded', firstLoadScreen);
window.addEventListener('resize', adjustColumns);

window.addEventListener("scroll", () => {
    scrollImages();

    if (window.scrollY > 100) {
        formHeader.style.top = '0';
        formHeader.style.opacity = '1';
    } else {
        formHeader.style.opacity = '0';
        formHeader.style.top = '-100%';
    }
});

btnSearch.addEventListener('click', () => formHeaderContainer.style.top = '0%');
btnClose.addEventListener('click', () => formHeaderContainer.style.top = '-100%');

formHeader.addEventListener("submit", validateForm);
formMain.addEventListener("submit", validateForm);
formPage.addEventListener("submit", validarNumeroPagina);

nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);
nextBtnMain.addEventListener('click', nextPage);