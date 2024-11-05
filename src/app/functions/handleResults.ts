import {fetchStatus, pageData, masonryCustom} from "../utils/globalVariables.js";
import { showFirstImages } from "./handle-images/firstLoadImages.js";

export const resultsSucces = () => {
    const searchTitleContainer = document.querySelector('#search-title') as HTMLElement;
    const searchTitle = document.querySelector('#search-title H2') as HTMLHeadingElement;
    const titleResults = document.querySelector('#results-container H3') as HTMLHeadingElement;
    const resultsContainer = document.querySelector('#results-container') as HTMLElement;

    const paginationCont = document.querySelector('#pagination') as HTMLElement;
    const noMore = document.querySelector('.buttons-status-page P') as HTMLElement;
    const nextBtnMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;

    const random: number = Math.floor(Math.random() * fetchStatus.results.length);

    searchTitleContainer.style.backgroundImage = `linear-gradient(60deg, rgba(7, 15, 43, 1) 20%, rgba(7, 15, 43, 0.1)), url('${fetchStatus.results[random].largeImageURL}')`;

    searchTitle.textContent = fetchStatus.search;
    searchTitle.classList.add('uppercase', 'search-title');

    titleResults.textContent = `Showing images of "${fetchStatus.search}"`;
    resultsContainer.classList.remove('hidden');

    paginationCont.classList.replace('hidden', 'flex');

    if (pageData.currentPage === pageData.totalPages) {
        noMore.classList.remove('hidden');
        nextBtnMain.classList.add('hidden');
    } else {
        noMore.classList.add('hidden');
        nextBtnMain.classList.remove('hidden');
    }
}

export const notResults = () => {
    const searchTitleContainer = document.querySelector('#search-title') as HTMLElement;
    const searchTitle = document.querySelector('#search-title H2') as HTMLHeadingElement;
    const titleResults = document.querySelector('#results-container H3') as HTMLHeadingElement;
    const resultsContainer = document.querySelector('#results-container') as HTMLElement;

    const paginationCont = document.querySelector('#pagination') as HTMLElement;
    const nextBtnMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;
    
    searchTitleContainer.style.backgroundImage = 'none';

    searchTitle.textContent = `There are no images related to "${fetchStatus.search}"`;
    searchTitle.classList.remove('uppercase', 'search-title');

    resultsContainer.classList.add('hidden');

    titleResults.textContent = '';

    paginationCont.classList.replace('flex', 'hidden');

    nextBtnMain.classList.add('hidden');
}

export const getColumns = (isFirstLoad: boolean) => {
    const currentWidth = window.innerWidth;
    const currentColmns = masonryCustom.columns;

    if(currentWidth < 768) masonryCustom.columns = 3;
    if(currentWidth >= 768 && currentWidth < 1280) masonryCustom.columns = 4;
    if(currentWidth >= 1280) masonryCustom.columns = 5;
    
    if(!isFirstLoad && currentColmns !== masonryCustom.columns) {
        masonryCustom.initialIteration = 0;
        masonryCustom.countColumns = 0;

        showFirstImages();
    }
}
