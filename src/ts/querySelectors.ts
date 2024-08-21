export const body = document.getElementsByTagName('BODY') as HTMLCollectionOf<HTMLBodyElement>;

//================================ HEADER =========================
export const formHeaderContainer = document.querySelector('#input-header-container') as HTMLFormElement;
export const btnSearch = document.querySelector('#btn-mobile-search') as HTMLButtonElement;
export const btnClose = document.querySelector('#btn-mobile-close') as HTMLButtonElement;

export const formHeader = document.querySelector('#form-header') as HTMLFormElement;

//================================== MAIN ==========================
export const mainCont = document.querySelector('MAIN') as HTMLElement;
export const formMain = document.querySelector('#form-main') as HTMLFormElement;

//=========================== TITLE SEARCH ================
export const searchTitleContainer = document.querySelector('#search-title') as HTMLElement;
export const searchTitle = document.querySelector('#search-title H2') as HTMLHeadingElement;

export const resultsContainer = document.querySelector('#results-container') as HTMLElement;
export const titleResults = document.querySelector('#results-container H3') as HTMLHeadingElement;

//=========================== GALLERY ==================
export const galleryContainer = document.querySelector('#gallery') as HTMLDivElement;

//============================ PAGINATION =====================
export const paginationCont = document.querySelector('#pagination') as HTMLElement;
export const numberInput = document.querySelector('#number-input') as HTMLInputElement;
export const totalPagesP = document.querySelector('#number-page P') as HTMLElement;

export const nextBtn = document.querySelector('#next') as HTMLButtonElement;
export const prevBtn = document.querySelector('#prev') as HTMLButtonElement;

export const nextBtnMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;
export const noMore = document.querySelector('.buttons-status-page P') as HTMLElement;

export const totalResultsP = document.querySelector('#pagination .total-results') as HTMLElement;

export const formPage =  document.querySelector('#number-page') as HTMLFormElement;

//======================= MODAL ==================
export const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;
export const dropdownTopBtn = document.querySelector('#dropdownTopButton') as HTMLButtonElement;
export const dropdownTop = document.querySelector('#dropdownTop') as HTMLDivElement;
export const imgModal = document.querySelector('#img-modal') as HTMLImageElement;
export const btnCloseModal = document.querySelector('#btn-close-modal') as HTMLBRElement;