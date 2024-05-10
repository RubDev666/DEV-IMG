import AOS from 'aos';
import 'aos/dist/aos.css'; 

const searchTitleContainer = document.querySelector('#search-title') as HTMLElement;
const searchTitle = document.querySelector('#search-title H2') as HTMLHeadingElement;

const resultsContainer = document.querySelector('#results-container') as HTMLElement;
const titleResults = document.querySelector('#results-container H3') as HTMLHeadingElement;

const mainCont = document.querySelector('MAIN') as HTMLElement;
/*
const column1 = document.querySelector('.column-1') as HTMLDivElement;
const column2 = document.querySelector('.column-2') as HTMLDivElement;
const column3 = document.querySelector('.column-3') as HTMLDivElement;
const column4 = document.querySelector('.column-4') as HTMLDivElement;*/
const galleryContainer = document.querySelector('#gallery-container') as HTMLDivElement;

const footerCont = document.querySelector('FOOTER') as HTMLElement;

const paginationCont = document.querySelector('#pagination') as HTMLElement;

const numberInput = document.querySelector('#number-input') as HTMLInputElement;

const totalPagesP =  document.querySelector('#number-page P') as HTMLElement;

const nextBtn = document.querySelector('#next') as HTMLButtonElement;
const prevBtn = document.querySelector('#prev') as HTMLButtonElement;

const nextMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;
const noMore = document.querySelector('.buttons-status-page P') as HTMLElement;

const totalResultsP = document.querySelector('#pagination .total-results') as HTMLElement;

let search: string = '';
const registrosPorPagina: number = 40;
let totalPages: number = 1;
let totalResults: number = 0;
let currentPage: number = 1;
let results: any = [];
let numColumns: number = 1;

const firstColor = '7, 15, 43'; //rgb(7, 15, 43) = #070F2B;

export function validarFormulario(event: SubmitEvent) {
    event.preventDefault();

    if (!event.target) return;

    const { submitter } = event as SubmitEvent;
    if (!submitter) return;

    const currentInput = document.querySelector('#input-' + submitter.dataset.set) as HTMLInputElement;

    if (currentInput.value === '') return;

    currentPage = 1;
    numberInput.value = '1';
    search = currentInput.value;

    getImages();

    currentInput.value = '';
}

export function validarNumeroPagina(event: SubmitEvent) {
    event.preventDefault();

    const value: number = parseInt(numberInput.value);

    if(value < 1 || value > totalPages || value === currentPage || !value) return;

    currentPage = value;

    getImages();
}

async function getImages() {
    const key = '31346272-ce2caa7e4bb876b68b29e6d55';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${registrosPorPagina}&page=${currentPage}`;

    try {
        const res = await fetch(url);
        const resultRes = await res.json();

        results = resultRes;
        totalResults = resultRes.totalHits;
        totalResultsP.textContent = `${totalResults.toString()} images found`;
        totalPages = getTotalPages();
        totalPagesP.textContent = '/' + totalPages.toString();

        console.log(totalPages);
        console.log(resultRes);

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

        galleryContainer.classList.remove('hidden');
    } catch (error) {
        console.log(error);
    }
}

//=========================================================== DOM ACTIONS ============================= 
function resultsSucces(resultsArg: any) {
    searchTitle.textContent = search;
    searchTitle.classList.add('uppercase', 'search-title');

    const ramdom: number = Math.floor(Math.random() * resultsArg.hits.length);

    searchTitleContainer.style.backgroundImage = `linear-gradient(60deg, rgba(${firstColor}, 1) 20%, rgba(${firstColor}, 0.1)), url('${resultsArg.hits[ramdom].largeImageURL}')`;

    resultsContainer.classList.remove('hidden');

    titleResults.textContent = `Showing images of "${search}"`;

    footerCont.classList.remove('no-results');

    paginationCont.classList.replace('hidden', 'flex');

    if(currentPage === totalPages) {
        noMore.classList.remove('hidden');
        nextMain.classList.add('hidden');
    } else {
        noMore.classList.add('hidden');
        nextMain.classList.remove('hidden');
    }
}

function notResults() {
    searchTitle.textContent = `There are no images related to "${search}"`;

    searchTitle.classList.remove('uppercase', 'search-title');

    searchTitleContainer.style.backgroundImage = 'none';

    resultsContainer.classList.add('hidden');

    titleResults.textContent = '';

    footerCont.classList.add('no-results');

    paginationCont.classList.replace('flex', 'hidden');

    nextMain.classList.add('hidden');
}

function showResults() {
    let count: number = 1;
    //const times = ['400', '500', '450'];

    cleanHtml(galleryContainer);
    /*cleanHtml(column1);
    column1.classList.add('hidden');

    cleanHtml(column2);
    column2.classList.add('hidden');

    cleanHtml(column3);
    column3.classList.add('hidden');

    cleanHtml(column4);
    column4.classList.add('hidden');*/

    if (results.length === 0) return;

    galleryContainer.classList.add('hidden');

    results.hits.forEach((result: any) => {
        //const ramdom = Math.floor(Math.random() * times.length);

        //const column = document.querySelector('.column-' + count.toString()) as HTMLDivElement;
        //column.classList.remove('hidden');

        const imgCont = document.createElement('DIV') as HTMLDivElement;
        imgCont.classList.add('w-full', 'mb-4', 'rounded-3xl', 'overflow-hidden', 'relative', 'img-container', 'bg-fourth', 'box');
        imgCont.setAttribute('data-aos', 'zoom-in-up');
        imgCont.setAttribute('data-aos-delay', '500');
        //imgCont.setAttribute('data-aos-duration', '500');

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

        galleryContainer.appendChild(imgCont);
        //column.appendChild(imgCont);

        if (count !== numColumns) {
            count = count + 1;
        } else {
            count = 1;
        }
    })
}

window.addEventListener('resize', () => {
    if (window.innerWidth < 640 && numColumns !== 1) {
        numColumns = 1;

        showResults();

        galleryContainer.classList.remove('hidden');
    }

    if ((window.innerWidth >= 640 && innerWidth < 1024) && numColumns !== 2) {
        numColumns = 2;

        showResults();

        galleryContainer.classList.remove('hidden');
    }

    if ((window.innerWidth >= 1024 && innerWidth < 1440) && numColumns !== 3) {
        numColumns = 3;

        showResults();

        galleryContainer.classList.remove('hidden');
    }

    if ((window.innerWidth > 1440) && numColumns !== 4) {
        numColumns = 4;

        showResults();

        galleryContainer.classList.remove('hidden');
    }
})

//identify screen size when loading site
function firstLoadScreen() {
    if (window.innerWidth < 640) numColumns = 1;
    if (window.innerWidth >= 640 && innerWidth < 1024) numColumns = 2;
    if (window.innerWidth >= 1024 && innerWidth < 1440) numColumns = 3;
    if (window.innerWidth > 1440) numColumns = 4;
}

firstLoadScreen();

function cleanHtml(selector: HTMLElement) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}

//============================================== PAGINATION ===========
const getTotalPages = (): number => Math.ceil(totalResults / registrosPorPagina);

nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);
nextMain.addEventListener('click', nextPage);

function nextPage() {
    if(currentPage === totalPages) return;

    currentPage = currentPage + 1;
    numberInput.value = currentPage.toString();

    getImages();
}

function prevPage() {
    if(currentPage === 1) return;

    currentPage = currentPage - 1;
    numberInput.value = currentPage.toString();

    getImages();
}

AOS.init({
    duration: 800,
    offset:150,
});