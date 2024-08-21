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
    totalResultsP,
    body,
    modalContainer,
    dropdownTop,
    imgModal,
    btnCloseModal
} from './querySelectors.js';

//========================= GLOBAL VARIABLES ===================
let columns: number = 0;
let countColumns: number = 0; //
const firstNumberRows: number = 2; //number of rows on first load of images

const imagesPerScroll = 1;

const resultsPerPage: number = 40;
let totalPages: number = 1;
let currentPage: number = 1;

let search: string = '';

let loadingData = false;

let initialIteration = 0;

let totalResults: number = 0;
let results: any = [];

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
    initialIteration = 0;

    fetchImg();

    currentInput.value = '';
}

export function validatePageNumber(e: SubmitEvent) {
    e.preventDefault();

    const value: number = parseInt(numberInput.value);

    if (value < 1 || value > totalPages || value === currentPage || !value) return;

    currentPage = value;
    initialIteration = 0;
    
    fetchImg();
}

async function fetchImg() {
    const key = '31346272-ce2caa7e4bb876b68b29e6d55';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${resultsPerPage}&page=${currentPage}`;

    try {
        const res = await fetch(url).then(res => res.json());

        results = res.hits;
        totalResults = res.totalHits;
        totalResultsP.textContent = `${totalResults.toString()} images found`;
        totalPages = getTotalPages();
        totalPagesP.textContent = '/' + totalPages.toString();

        if (res.totalHits === 0) return notResults();

        resultsSucces();

        showFirstImages();

        window.scrollTo({
            top: mainCont.clientHeight,
            left: 0,
            behavior: 'smooth',
        });
    } catch (error) {
        console.log(error);
    }
}
 
//=========================================================== DOM ACTIONS ============================= 
function resultsSucces() {
    const random: number = Math.floor(Math.random() * results.length);

    searchTitleContainer.style.backgroundImage = `linear-gradient(60deg, rgba(7, 15, 43, 1) 20%, rgba(7, 15, 43, 0.1)), url('${results[random].largeImageURL}')`;

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

export function showFirstImages() {
    let countIterator = 0;

    cleanGallery();

    loadingData = true;

    for(let i = initialIteration; i < results.length; i++) {
        //show images according to the number of columns on the screen, and then multiply by 2 to fill a little more images.
        if(countIterator === columns * firstNumberRows) {
            initialIteration = i;

            break;
        } else {
            countIterator++
        }

        showImages(i);
    }

    loadingData = false;
}

export function showScrollImages() {
    let countIterator = 0;

    loadingData = true;

    for(let i = initialIteration; i <= results.length; i++) {
        if(initialIteration === results.length) {
            initialIteration = results.length;
            loadingData = false;

            break;
        }

        //image limit for each scroll event
        if(countIterator === imagesPerScroll) {
            initialIteration = i;
            loadingData = false;

            break;
        } else {
            countIterator++
        }

        showImages(i);
    }

    loadingData = false;
}

export function showImages(i: number) {
    const result = results[i];

    let column = document.querySelector(`.column-${countColumns + 1}`) as HTMLDivElement;

    if(!column) {
        column = document.createElement('DIV') as HTMLDivElement;
        column.classList.add(`column-${countColumns + 1}`);
    }

    //const column = ALL_COLUMNS[countColumns];

    const imgCont = document.createElement('DIV') as HTMLDivElement;
    imgCont.classList.add('img-container', 'scroll', `${i < columns * firstNumberRows ? 'active' : undefined}`, 'cursor-pointer');

    imgCont.onclick = () => openModal(result);

    const overlayHoverGradient = document.createElement('DIV') as HTMLDivElement;
    overlayHoverGradient.classList.add('hover-gradient');

    const imgEle = document.createElement('IMG') as HTMLImageElement;
    imgEle.src = result.webformatURL;
    imgEle.loading = 'lazy';
    imgEle.alt = `img-${search}`;
    imgEle.classList.add('w-full', 'h-full');

    imgCont.appendChild(imgEle);
    imgCont.appendChild(overlayHoverGradient);
    column.appendChild(imgCont);

    if(galleryContainer.childNodes.length !== columns) galleryContainer.appendChild(column);

    if (countColumns === columns - 1) {
        countColumns = 0;
    } else {
        countColumns++;
    }
}

export function getColumns(isFirstLoad: boolean) {
    const currentWidth = window.innerWidth;
    const currentColmns = columns;

    if(currentWidth < 768) columns = 3;
    if(currentWidth >= 768 && currentWidth < 1280) columns = 4;
    if(currentWidth >= 1280) columns = 5;
    
    if(!isFirstLoad && currentColmns !== columns) {
        initialIteration = 0;
        countColumns = 0;

        showFirstImages();
    }
}

function cleanGallery() {
    cleanHtml(galleryContainer);
    
    for(let i = 1; i <= columns; i++) {
        const column = document.querySelector(`.column-${countColumns + 1}`) as HTMLDivElement;

        if(!column) break;

        cleanHtml(column);
    }
}

function cleanHtml(selector: HTMLElement) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}

export function handleScrollImages() {
    const imgC = document.getElementsByClassName('scroll');

    if (imgC.length > 0) {
        for (let i = 0; i < imgC.length; i++) {
            const imgU = imgC[i].getBoundingClientRect();

            if (imgU.top < 700) {
                imgC[i].classList.add('active');
            } else {
                imgC[i].classList.remove('active');
            }
        }
    }

    if(initialIteration !== results.length && !loadingData) {
        const scrollTop = window.scrollY;
        const containerHeight = galleryContainer.offsetHeight;
        const windowHeight = window.innerHeight;
    
        if (scrollTop + windowHeight >= containerHeight) showScrollImages();
    }
}

//============================================== PAGINATION ===========
const getTotalPages = () => Math.ceil(totalResults / resultsPerPage);

export function handlePage(typeChange: 'prev' | 'next') {
    if(typeChange === 'prev' && currentPage === 1) return;
    if(typeChange === 'next' && currentPage === totalPages) return;

    initialIteration = 0;

    if(typeChange === 'prev') currentPage--;
    if(typeChange === 'next') currentPage++;

    numberInput.value = currentPage.toString();

    fetchImg();
}

//================================= MODAL ==========
function openModal(imgData: any) {
    body[0].classList.add('modal-active');
    modalContainer.classList.replace('hidden', 'flex');

    imgModal.src = imgData.webformatURL;
    imgModal.alt = `img-${search}`;

    btnCloseModal.onclick = (e) => closeModal(e);

    dropdownTop.innerHTML = `
        <ul class="py-2">
            <li>
                <a target="_blank" href="${imgData.largeImageURL}" class="download-btns">
                    Full Size

                    <span class="material-symbols-outlined icon-download">download</span>
                </a>
             </li>
             <li>
                 <a target="_blank" href="${imgData.webformatURL}" class="download-btns">
                    Medium Size

                     <span class="material-symbols-outlined icon-download">download</span>
                </a>
            </li>
            <li>
                <a target="_blank" href="${imgData.previewURL}" class="download-btns">
                    Small Size

                    <span class="material-symbols-outlined icon-download">download</span>
                </a>
            </li>
        </ul>
    `
}

export function closeModal(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if(target.id.includes('modal-container') || target.id.includes('btn-close-modal') || target.classList.contains('close')) {
        body[0].classList.remove('modal-active');
        modalContainer.classList.replace('flex', 'hidden');
        imgModal.src = '';
        dropdownTop.classList.remove('flex');
        dropdownTop.classList.add('hidden');
    }
}
