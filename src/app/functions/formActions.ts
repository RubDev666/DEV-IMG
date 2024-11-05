import {masonryCustom,pageData, fetchStatus} from "../utils/globalVariables.js";
import { fetchImg } from "../api/api.js";

export const validateForm = (e: SubmitEvent) => {
    e.preventDefault();

    if (!e.target) return;

    const { submitter } = e as SubmitEvent; //current button that executes the submit
    if (!submitter) return;

    const currentInput = document.querySelector('#input-' + submitter.dataset.set) as HTMLInputElement;

    if (currentInput.value === '') return;

    const numberInput = document.querySelector('#number-input') as HTMLInputElement;

    pageData.currentPage = 1;
    numberInput.value = '1';
    fetchStatus.search = currentInput.value;
    masonryCustom.initialIteration = 0;

    fetchImg();

    currentInput.value = '';
}

export const validatePageNumber = (e: SubmitEvent) => {
    e.preventDefault();

    const numberInput = document.querySelector('#number-input') as HTMLInputElement;
    const value: number = parseInt(numberInput.value);

    if (value < 1 || value > pageData.totalPages || value === pageData.currentPage || !value) return;

    pageData.currentPage = value;
    masonryCustom.initialIteration = 0;
    
    fetchImg();
}
