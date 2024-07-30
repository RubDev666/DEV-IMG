import {
    mainCont,
    searchTitleContainer,
    searchTitle,
    resultsContainer,
    titleResults,
    galleryContainer,
    paginationCont,
    numberInput,
    totalPagesP,
    nextBtnMain,
    noMore,
    totalResultsP
} from './querySelectors.js';

//========================= GLOBAL VARIABLES ===================
let search: string = '';
const resultsPerPage: number = 40;
let totalPages: number = 1;
let totalResults: number = 0;
let currentPage: number = 1;
let results: any = [];
let columns: number = 1;
const firstColor = '7, 15, 43'; //rgb(7, 15, 43) = #070F2B;

//==================================== FORM FUNCTIONS ===============
export function validateForm(e: SubmitEvent) {
    e.preventDefault();

    if (!e.target) return;

    const { submitter } = e as SubmitEvent; //current button that executes the submit
    if (!submitter) return;

    const currentInput = document.querySelector('#input-' + submitter.dataset.set) as HTMLInputElement;

    if (currentInput.value === '') return;

    currentPage = 1;
    numberInput.value = '1';
    search = currentInput.value;

    getImages();

    currentInput.value = '';
}

export function validarNumeroPagina(e: SubmitEvent) {
    e.preventDefault();

    const value: number = parseInt(numberInput.value);

    if (value < 1 || value > totalPages || value === currentPage || !value) return;

    currentPage = value;

    getImages();
}

async function getImages() {
    const key = '31346272-ce2caa7e4bb876b68b29e6d55';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${resultsPerPage}&page=${currentPage}`;

    try {
        const res = await fetch(url);
        const resultRes = await res.json();

        results = resultRes;
        totalResults = resultRes.totalHits;
        totalResultsP.textContent = `${totalResults.toString()} images found`;
        totalPages = getTotalPages();
        totalPagesP.textContent = '/' + totalPages.toString();

        if (resultRes.totalHits === 0) {
            notResults();

            return;
        }

        resultsSucces(resultRes);

        window.scrollTo({
            top: mainCont.clientHeight,
            left: 0,
            //behavior: 'smooth',
        });

        showResults();

        //galleryContainer.classList.remove('hidden');

        setTimeout(() => {
            galleryContainer.classList.remove('opacity-0');
            //galleryContainer.classList.replace('opacity-0', 'opacity-100');
        }, 1000)
    } catch (error) {
        console.log(error);
    }
}

//=========================================================== DOM ACTIONS ============================= 
function resultsSucces(resultsArg: any) {
    const random: number = Math.floor(Math.random() * resultsArg.hits.length);

    searchTitleContainer.style.backgroundImage = `linear-gradient(60deg, rgba(${firstColor}, 1) 20%, rgba(${firstColor}, 0.1)), url('${resultsArg.hits[random].largeImageURL}')`;

    searchTitle.textContent = search;
    searchTitle.classList.add('uppercase', 'search-title');

    titleResults.textContent = `Showing images of "${search}"`;
    resultsContainer.classList.remove('hidden');

    paginationCont.classList.replace('hidden', 'flex');

    if (currentPage === totalPages) {
        noMore.classList.remove('hidden');
        nextBtnMain.classList.add('hidden');
    } else {
        noMore.classList.add('hidden');
        nextBtnMain.classList.remove('hidden');
    }
}

function notResults() {
    searchTitleContainer.style.backgroundImage = 'none';

    searchTitle.textContent = `There are no images related to "${search}"`;
    searchTitle.classList.remove('uppercase', 'search-title');

    resultsContainer.classList.add('hidden');

    titleResults.textContent = '';

    paginationCont.classList.replace('flex', 'hidden');

    nextBtnMain.classList.add('hidden');
}

function showResults() {
    let count: number = 1;

    console.log('start')

    galleryContainer.classList.add('opacity-0');
    //galleryContainer.classList.add('hidden');

    cleanHtml(galleryContainer);

    //column1.classList.add('hidden');
    //column2.classList.add('hidden');
    //column4.classList.add('hidden');
    //column3.classList.add('hidden');

    //cleanHtml(column1);
    //cleanHtml(column2);
    //cleanHtml(column3);
    //cleanHtml(column4);

    if (results.length === 0) return;

    results.hits.forEach((result: any) => {
        //const column = document.querySelector('.column-' + count.toString()) as HTMLDivElement;
        //column.classList.remove('hidden');

        const imgCont = document.createElement('DIV') as HTMLDivElement;
        imgCont.classList.add('w-full', 'mb-4', 'rounded-lg', 'overflow-hidden', 'relative', 'img-container', 'bg-fourth', 'scroll');

        const overlayContent = document.createElement('DIV') as HTMLDivElement;
        overlayContent.classList.add('overlay-content');

        const overlayB = document.createElement('DIV') as HTMLDivElement;
        overlayB.classList.add('overlay-bottom');
        overlayB.innerHTML = `
            <div class="btns-container">
                <a target="_blank" href="${result.largeImageURL}" class="text-fourth text-medium pointer flex items-center justify-center mb-2">Full Size <span class="material-symbols-outlined text-fourth icon-download">download</span></a>

                <a target="_blank" href="${result.webformatURL}" class="text-fourth text-medium pointer flex items-center justify-center mb-2">Medium Size <span class="material-symbols-outlined text-fourth icon-download">download</span></a>

                <a target="_blank" href="${result.previewURL}" class="text-fourth text-medium pointer flex items-center justify-center mb-2">Small Size <span class="material-symbols-outlined text-fourth icon-download">download</span></a>
            </div>
        `;

        overlayContent.appendChild(overlayB);

        const imgEle = document.createElement('IMG') as HTMLImageElement;
        imgEle.src = result.webformatURL;
        imgEle.loading = 'lazy';
        imgEle.alt = `img-${search}`;
        imgEle.classList.add('w-full', 'h-full');

        imgCont.appendChild(imgEle);
        imgCont.appendChild(overlayContent);
        //column.appendChild(imgCont);

        galleryContainer.appendChild(imgCont);

        if (count !== columns) {
            count = count + 1;
        } else {
            count = 1;
        }

        console.log('loading');
    })

    //galleryContainer.classList.remove('hidden');

    console.log('finished');
}

function cleanHtml(selector: HTMLElement) {
    while(selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}

export function scrollImages() {
    const imgC = document.getElementsByClassName('scroll');

    if (imgC.length > 0) {
        for (let i = 0; i < imgC.length; i++) {
            const imgU = imgC[i].getBoundingClientRect();

            if (imgU.top < 500) {
                imgC[i].classList.add('active');
            } else {
                imgC[i].classList.remove('active');
            }
        }
    }
}

//============================================== PAGINATION ===========
const getTotalPages = (): number => Math.ceil(totalResults / resultsPerPage);

export function nextPage() {
    if (currentPage === totalPages) return;

    currentPage = currentPage + 1;
    numberInput.value = currentPage.toString();

    getImages();
}

export function prevPage() {
    if (currentPage === 1) return;

    currentPage = currentPage - 1;
    numberInput.value = currentPage.toString();

    getImages();
}
