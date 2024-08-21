import { 
    validateForm, 
    validatePageNumber, 
    handleScrollImages,
    getColumns,
    handlePage,
    closeModal
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
    modalContainer,
    dropdownTopBtn,
    dropdownTop
} from './querySelectors.js';

window.addEventListener('DOMContentLoaded', () => getColumns(true));

window.addEventListener('resize', () => {
    getColumns(false);

    handleScrollImages();

    handleInputHeader();
});

window.addEventListener("scroll", () => {
    handleScrollImages();

    handleInputHeader();
});

const handleInputHeader = () => {
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
}

btnSearch.addEventListener('click', () => formHeaderContainer.classList.add('show'));
btnClose.addEventListener('click', () => formHeaderContainer.classList.remove('show'));

formHeader.addEventListener("submit", validateForm);
formMain.addEventListener("submit", validateForm);
formPage.addEventListener("submit", validatePageNumber);

nextBtn.addEventListener('click', ()=> handlePage('next'));
prevBtn.addEventListener('click', ()=> handlePage('prev'));
nextBtnMain.addEventListener('click', ()=> handlePage('next'));

modalContainer.onclick = (e) => closeModal(e);
//modalContainer.addEventListener('click', (e) => console.log(e));

dropdownTopBtn.onclick = () => {
    dropdownTop.classList.toggle('flex');
    dropdownTop.classList.toggle('hidden');
}
