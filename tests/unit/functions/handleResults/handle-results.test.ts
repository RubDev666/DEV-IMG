import {beforeAll, describe, expect, it, vi} from 'vitest';
import { HTMLButtonElement, HTMLElement, HTMLHeadingElement, Window } from 'happy-dom';
import { fetchStatus, pageData } from '../../../../src/app/utils/globalVariables.js';
import {notResults, resultsSucces} from '.././../../../src/app/functions/handleResults.js';

const window = new Window();
const document = window.document;

vi.stubGlobal('document', document);

beforeAll(() => {
    document.body.innerHTML = `
        <section id="search-title" class="py-10 lg:py-14 px-6 overflow-hidden relative mb-8 bg-no-repeat">
            <h2 class="font-bold m-0 text-2xl leading-tight sm:text-3xl text-fourth text-center">Do a search to show results
            </h2>
        </section>

        <section id="results-container" class="hidden w-full mb-4">
            <h3 class="text-fourth ml-7 mb-4 text-xl lg:text-2xl font-medium"></h3>

            <div id="gallery" data-set="py-2 px-7" class="grid py-2 px-7 min-h-[400px]"></div>
        </section>

        <section id="pagination" class="w-full mb-4 hidden items-center justify-between py-4 px-7 font-medium">
            <div class="buttons-status-page hidden lg:block">
                <button class="hidden logo-font btn-main">Next page</button>

                <p class="logo-font text-white uppercase tracking-widest text-lg lg:text-2xl hidden">No more images</p>
            </div>            
        </section>
    `;

    fetchStatus.search = 'some-search';
    fetchStatus.results = [
        {
            largeImageURL: 'http://www.pixabay.com/image-1'
        },
        {
            largeImageURL: 'http://www.pixabay.com/image-2'
        },
        {
            largeImageURL: 'http://www.pixabay.com/image-3'
        },
        {
            largeImageURL: 'http://www.pixabay.com/image-4'
        },
    ]
})

describe('resultSuccess()', () => {
    it('"searchTitle" / textContent was successfully added / the "uppercase" and "search-title" classes was successfully added', () => {
        const searchTitle = document.querySelector('#search-title H2') as HTMLHeadingElement;

        resultsSucces();

        expect(searchTitle.textContent).toBe('some-search');
        expect(searchTitle.classList.contains('uppercase')).toBe(true);
        expect(searchTitle.classList.contains('search-title')).toBe(true);
    })

    it('"titleResults" / the textContent was successfully added', () => {
        const titleResults = document.querySelector('#results-container H3') as HTMLHeadingElement;

        const expectContent = `Showing images of "${fetchStatus.search}"`;

        expect(titleResults.textContent).toBe(expectContent);
    })

    it('"resultsContainer" / the "hidden" class has been removed', () => {
        const resultsContainer = document.querySelector('#results-container') as HTMLElement;

        expect(resultsContainer.classList.contains('hidden')).toBe(false);
    })

    it('"paginationCont" / the "hidden" class has been replaced by "flex"', () => {
        const paginationCont = document.querySelector('#pagination') as HTMLElement;

        expect(paginationCont.classList.contains('hidden')).toBe(false);
        expect(paginationCont.classList.contains('flex')).toBe(true);
    })
})

describe('"resultSuccess()" / if (pageData.currentPage === pageData.totalPages)', () => {
    it('true / the "hidden" class has been removed from "noMore" / the "hidden" class has been added to "nextBtnMain"', () => {
        const noMore = document.querySelector('.buttons-status-page P') as HTMLElement;
        const nextBtnMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;

        pageData.currentPage = 1;
        pageData.totalPages = 1;

        resultsSucces();

        expect(noMore.classList.contains('hidden')).toBe(false);
        expect(nextBtnMain.classList.contains('hidden')).toBe(true);
    })

    it('false / the "hidden" class has been added to "noMore" / the "hidden" class has been removed from "nextBtnMain"', () => {
        const noMore = document.querySelector('.buttons-status-page P') as HTMLElement;
        const nextBtnMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;

        pageData.currentPage = 1;
        pageData.totalPages = 2;

        resultsSucces();

        expect(noMore.classList.contains('hidden')).toBe(true);
        expect(nextBtnMain.classList.contains('hidden')).toBe(false);
    })
})

describe('notResults()', () => {
    beforeAll(() => {
        notResults();
    })

    it('serchTitle / the text content has been successfully added / the "uppercase" and "search-title" classes has been successfully removed', () => {
        const searchTitle = document.querySelector('#search-title H2') as HTMLHeadingElement;

        const textContentExpect = 'There are no images related to "some-search"';

        //notResults();

        expect(searchTitle.textContent).toBe(textContentExpect);
        expect(searchTitle.classList.contains('uppercase')).toBe(false);
        expect(searchTitle.classList.contains('search-title')).toBe(false);
    })

    it('resultsContainer / the "hidden" class has been successfuly added', () => {
        const resultsContainer = document.querySelector('#results-container') as HTMLElement;
        
        expect(resultsContainer.classList.contains('hidden')).toBe(true);
    })

    it('titleResults / the textContent must be a empty string', () => {
        const titleResults = document.querySelector('#results-container H3') as HTMLHeadingElement;

        expect(titleResults.textContent).toBe('');
    })

    it('paginationCont / the "flex" class has been replaced by "hidden"',() => {
        const paginationCont = document.querySelector('#pagination') as HTMLElement;

        expect(paginationCont.classList.contains('flex')).toBe(false);
        expect(paginationCont.classList.contains('hidden')).toBe(true);
    })

    it('nextBtnMain / the "hidden" class has been successfuly added', () => {
        const nextBtnMain = document.querySelector('.buttons-status-page BUTTON') as HTMLButtonElement;

        expect(nextBtnMain.classList.contains('hidden')).toBe(true);
    })
})
