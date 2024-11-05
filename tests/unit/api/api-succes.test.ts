import { vi, it, expect, describe, afterAll, beforeAll } from "vitest";
import { HTMLElement, Window } from 'happy-dom';

import { fetchImg } from "../../../src/app/api/api.js";
import { pageData, fetchStatus } from "../../../src/app/utils/globalVariables.js";
import { notResults, resultsSucces } from "../../../src/app/functions/handleResults.js";
import { showFirstImages } from "../../../src/app/functions/handle-images/firstLoadImages.js";

const fetchResolve = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({
        hits: [{ id: 1, url: 'http://example.com/image1.jpg' }],
        totalHits: 1
    })
});

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

const consoleLogMock = vi.fn();
console.log = consoleLogMock;

vi.stubGlobal('window', window);
vi.stubGlobal('fetch', fetchResolve);

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

            <p class="text-fourth">/13</p>
        </form>

        <section id="pagination" class="w-full mb-4 hidden items-center justify-between py-4 px-7 font-medium">
            <p class="text-fourth lg:text-xl total-results">222</p>
        </section>
    `;
})

describe('"fetchImg()" succes Pixabay API', () => {
    afterAll(() => {
        vi.mocked(notResults).mockReset();
        vi.mocked(resultsSucces).mockReset();
        vi.mocked(showFirstImages).mockReset();
        scrollToSpy.mockReset();
        consoleLogMock.mockReset();
    })

    it('has been called without errors', async () => {
        await fetchImg();

        expect(fetchImg).toHaveBeenCalled();
        expect(fetchImg).not.toThrowError();
        expect(fetchResolve).not.toThrowError();
    })

    it('Global variables and DOM elements has been successfully changed', async () => {
        const totalResultsP = document.querySelector('#pagination .total-results') as HTMLElement;
        const totalPagesP = document.querySelector('#number-page P') as HTMLElement;

        await fetchImg();

        expect(fetchStatus.results).toStrictEqual([{ id: 1, url: 'http://example.com/image1.jpg' }]);
        expect(fetchStatus.totalResults).toBe(1);
        expect(totalResultsP.textContent).toBe('1 images found');
        expect(pageData.totalPages).toBe(1);
        expect(totalPagesP.textContent).toBe('/1');
    })

    it('"notResults()" has not been called', () => {
        expect(notResults).not.toHaveBeenCalled();
    })

    it('"resultSucces()" / "showFirstImages()" has been called successfully', () => {
        expect(resultsSucces).toHaveBeenCalled();
        expect(showFirstImages).toHaveBeenCalled();
    })

    it('"window.scrollTo" has been called successfully', async () => {
        expect(scrollToSpy).toHaveBeenCalled();
    })

    it('"console.log()" has not been called', () => {
        expect(consoleLogMock).not.toHaveBeenCalled();
    })
})

describe('"fetchImg()" succes Pixabay API but there are no results', () => {
    it('Global variables and DOM elements has not been successfully changed', async () => {
        fetchResolve.mockImplementationOnce(vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({
                hits: [],
                totalHits: 0
            })
        }))

        const totalResultsP = document.querySelector('#pagination .total-results') as HTMLElement;
        const totalPagesP = document.querySelector('#number-page P') as HTMLElement;

        await fetchImg();

        expect(fetchStatus.results).toStrictEqual([]);
        expect(fetchStatus.totalResults).toBe(0);
        expect(totalResultsP.textContent).toBe('0 images found');
        expect(pageData.totalPages).toBe(0);
        expect(totalPagesP.textContent).toBe('/0');
    })

    it('"notResults()" has been called successfully', async () => {
        expect(notResults).toHaveBeenCalled();
    })

    it('"resultSucces()" / "showFirstImages()" has not been called', async () => {
        expect(resultsSucces).not.toHaveBeenCalled();
        expect(showFirstImages).not.toHaveBeenCalled();
    })

    it('"window.scrollTo" has not been called', async () => {
        expect(scrollToSpy).not.toHaveBeenCalled();
    })

    it('"console.log()" has not been called', () => {
        expect(consoleLogMock).not.toHaveBeenCalled();
    })
});
