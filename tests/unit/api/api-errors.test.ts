import { vi, it, expect, describe, beforeAll } from "vitest";
import { HTMLElement, Window } from 'happy-dom';

import { fetchImg } from "../../../src/app/api/api.js";
import { pageData, fetchStatus } from "../../../src/app/utils/globalVariables.js";
import { notResults, resultsSucces } from "../../../src/app/functions/handleResults.js";
import { showFirstImages } from "../../../src/app/functions/handle-images/firstLoadImages.js";

const fetchReject = vi.fn().mockRejectedValue(new Error('pixabay error'));

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

const consoleLogMock = vi.fn();
console.log = consoleLogMock;

vi.stubGlobal('window', window);
vi.stubGlobal('fetch', fetchReject);

vi.mock('../../../src/app/api/api.js', {spy: true});
vi.mock('../../../src/app/functions/pagination.js', { spy: true });
vi.mock('../../../src/app/utils/globalVariables.js', {spy: true});

vi.mock('../../../src/app/functions/handle-images/firstLoadImages.js', () => ({
    showFirstImages: vi.fn(),    
}))

vi.mock('../../../src/app/functions/handleResults.js', () => ({
    notResults: vi.fn(),
    resultsSucces: vi.fn()
}));

const scrollToSpy = vi.spyOn(window, 'scrollTo');

beforeAll(() => {
    document.body.innerHTML = `
        <main></main>

        <form id="number-page" class="pages-container flex mx-2 font-medium lg:text-lg">
            <input type="number" id="number-input" value="1" class="w-7 mr-3 text-center outline-none">

            <p class="text-fourth"></p>
        </form>

        <section id="pagination" class="w-full mb-4 hidden items-center justify-between py-4 px-7 font-medium">
            <p class="text-fourth lg:text-xl total-results"></p>
        </section>
    `;
})

describe('"fetchImg()" error Pixabay API', () => {
    it('has been called with errors', async () => {
        await fetchImg();

        expect(fetchImg).toHaveBeenCalled();
        expect(fetchReject).rejects.toThrowError('pixabay error');
    })

    it('Global variables and DOM elements has not been changed', async () => {
        const totalResultsP = document.querySelector('#pagination .total-results') as HTMLElement;
        const totalPagesP = document.querySelector('#number-page P') as HTMLElement;

        await fetchImg();

        expect(fetchStatus.results).toStrictEqual([]);
        expect(fetchStatus.totalResults).toBe(0);
        expect(totalResultsP.textContent).toBe('');
        expect(pageData.totalPages).toBe(1);
        expect(totalPagesP.textContent).toBe('');
    })

    it('"notResults()" has not been called', () => {
        expect(notResults).not.toHaveBeenCalled();
    })

    it('"resultSucces()" / "showFirstImages()" has not been called', () => {
        expect(resultsSucces).not.toHaveBeenCalled();
        expect(showFirstImages).not.toHaveBeenCalled();
    })

    it('"window.scrollTo" has not been called', () => {
        expect(scrollToSpy).not.toHaveBeenCalled();
    })

    it('"console.log()" has been called successfully', () => {
        expect(consoleLogMock).toHaveBeenCalled();
    })
})
