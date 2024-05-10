import { validarFormulario, validarNumeroPagina } from "./getImages.js";

const formHeaderContainer = document.querySelector('#input-header-container') as HTMLFormElement;
const btnSearch = document.querySelector('#btn-mobile-search') as HTMLButtonElement;
const btnClose = document.querySelector('#btn-mobile-close') as HTMLButtonElement;

const formHeader = document.querySelector('#form-header') as HTMLFormElement;
const formMain = document.querySelector('#form-main') as HTMLFormElement;

const formPage =  document.querySelector('#number-page') as HTMLFormElement;

//eventos botones para abrir o cerrar el input en el responsive
btnSearch.addEventListener('click', () => {
    formHeaderContainer.style.top = '0%';
});

btnClose.addEventListener('click', () => {
    formHeaderContainer.style.top = '-100%';
});

formHeader.addEventListener("submit", validarFormulario);
formMain.addEventListener("submit", validarFormulario);
formPage.addEventListener("submit", validarNumeroPagina);

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        formHeader.style.top = '0';
        formHeader.style.opacity = '1';
    } else {
        formHeader.style.opacity = '0';
        formHeader.style.top = '-100%';
    }
});
