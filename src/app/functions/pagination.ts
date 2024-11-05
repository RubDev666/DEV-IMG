import {pageData, fetchStatus, masonryCustom} from "../utils/globalVariables.js";
import { fetchImg } from "../api/api.js";

export const getTotalPages = (): number => {
    const fetchTotal = fetchStatus.totalResults;

    if(typeof fetchTotal === 'number' || !isNaN(parseInt(fetchTotal))) {
        return Math.ceil(fetchTotal / pageData.resultsPerPage);
    } else {
        return 0;
    }
}

export const handlePage = (typeChange: 'prev' | 'next') => {
    const numberInput = document.querySelector('#number-input') as HTMLInputElement;
    
    if(typeChange === 'prev' && pageData.currentPage === 1) return;
    if(typeChange === 'next' && pageData.currentPage === pageData.totalPages) return;

    masonryCustom.initialIteration = 0;

    if(typeChange === 'prev') pageData.currentPage--;
    if(typeChange === 'next') pageData.currentPage++;

    numberInput.value = pageData.currentPage.toString();

    fetchImg();
}
