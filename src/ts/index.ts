import { 
    validateForm, 
    validatePageNumber, 
    handleScrollImages,
    getColumns,
    handlePage
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
    prevBtn,
} from './querySelectors.js';

window.addEventListener('DOMContentLoaded', () => getColumns(true));

window.addEventListener('resize', () => {
    getColumns(false);

    handleScrollImages();

    if(window.innerWidth < 480) {
        formHeader.style.top = '0';
        formHeader.style.opacity = '1';

        return;
    } else if(window.innerWidth >= 480 && window.scrollY <= 100) {
        formHeader.style.opacity = '0';
        formHeader.style.top = '-100%';
    }
});

window.addEventListener("scroll", () => {
    handleScrollImages();

    if(window.innerWidth < 480) {
        formHeader.style.top = '0';
        formHeader.style.opacity = '1';

        return;
    } else if(window.innerWidth >= 480 && window.scrollY <= 100) {
        formHeader.style.opacity = '0';
        formHeader.style.top = '-100%';
    }

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
formPage.addEventListener("submit", validatePageNumber);

nextBtn.addEventListener('click', ()=> handlePage('next'));
prevBtn.addEventListener('click', ()=> handlePage('prev'));
nextBtnMain.addEventListener('click', ()=> handlePage('next'));