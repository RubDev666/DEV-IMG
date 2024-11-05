import { getColumns } from "./functions/handleResults.js";
import { closeModal } from "./functions/modal.js";
import { validateForm, validatePageNumber } from "./functions/formActions.js";
import { handlePage } from "./functions/pagination.js";
import { handleScrollImages } from "./functions/handle-images/handleScrollImages.js";

const btnSearch = document.querySelector('#btn-mobile-search') as HTMLButtonElement;
const btnClose = document.querySelector('#btn-mobile-close') as HTMLButtonElement;

const formHeader = document.querySelector('#form-header') as HTMLFormElement;
const formMain = document.querySelector('#form-main') as HTMLFormElement;

const formPage =  document.querySelector('#number-page') as HTMLFormElement;

const nextBtn = document.querySelector('#next') as HTMLButtonElement;
const nextBtnMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;
const prevBtn = document.querySelector('#prev') as HTMLButtonElement;

const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;

const dropdownTopBtn = document.querySelector('#dropdownTopButton') as HTMLButtonElement;
const dropdownTop = document.querySelector('#dropdownTop') as HTMLDivElement

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

btnSearch.addEventListener('click', () => {
    const formHeaderContainer = document.querySelector('#input-header-container') as HTMLFormElement;

    formHeaderContainer.classList.add('show')
});
btnClose.addEventListener('click', () => {
    const formHeaderContainer = document.querySelector('#input-header-container') as HTMLFormElement;

    formHeaderContainer.classList.remove('show')
});

formHeader.addEventListener("submit", validateForm);
formMain.addEventListener("submit", validateForm);
formPage.addEventListener("submit", validatePageNumber);

nextBtn.addEventListener('click', ()=> handlePage('next'));
prevBtn.addEventListener('click', ()=> handlePage('prev'));
nextBtnMain.addEventListener('click', ()=> handlePage('next'));

modalContainer.onclick = (e) => closeModal(e);

dropdownTopBtn.onclick = () => {
    dropdownTop.classList.toggle('flex');
    dropdownTop.classList.toggle('hidden');
}
