import {fetchStatus, pageData} from "../utils/globalVariables.js";
import { getTotalPages } from "../functions/pagination.js";
import { notResults, resultsSucces } from "../functions/handleResults.js";
import { showFirstImages } from "../functions/handle-images/firstLoadImages.js";

export const fetchImg = async () => {
    const key = '31346272-ce2caa7e4bb876b68b29e6d55';
    const url = `https://pixabay.com/api/?key=${key}&q=${fetchStatus.search}&per_page=${pageData.resultsPerPage}&page=${pageData.currentPage}`;

    try {
        const res = await fetch(url).then(res => res.json());

        const totalResultsP = document.querySelector('#pagination .total-results') as HTMLElement;
        const totalPagesP = document.querySelector('#number-page P') as HTMLElement;
        const mainCont = document.querySelector('MAIN') as HTMLElement;

        fetchStatus.results = res.hits;
        fetchStatus.totalResults = res.totalHits;
        totalResultsP.textContent = `${fetchStatus.totalResults.toString()} images found`;
        totalResultsP.textContent = `${fetchStatus.totalResults.toString()} images found`;
        getTotalPages();
        pageData.totalPages = getTotalPages();
        totalPagesP.textContent = '/' + pageData.totalPages.toString();

        if (res.totalHits === 0) return notResults();

        resultsSucces();

        showFirstImages();

        window.scrollTo({
            top: mainCont.clientHeight,
            left: 0,
            behavior: 'smooth',
        });
    } catch (error: any) {
        console.log(error.message);
    }
}
