import { describe, expect, it, vi, beforeEach, beforeAll } from 'vitest';
import { pageData } from '../../../src/app/utils/globalVariables.js';

import { Window } from 'happy-dom';

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

vi.mock('../../../src/app/utils/querySelectors', () => ({
    numberInput: { value: '' }
}));

beforeEach(() => {
    vi.resetModules();
});

describe('getTotalPages()', () => {
    const mockTotalPages = async (total: any) => {
        vi.doMock('../../../src/app/utils/globalVariables.js', () => ({
            fetchStatus: { totalResults: total },
            pageData
        }));
        
        const { getTotalPages } = await import('../../../src/app/functions/pagination.js');
    
        return getTotalPages;
    }    

    it('returns a number / returns 13 if "totalResults" is 500', async () => {
        const getTotal = await mockTotalPages(500);

        const result = getTotal();

        expect(result).toBeTypeOf('number');
        expect(result).toBe(13);
    });

    it('returns a number if "totalResults" is a numeric string / returns 3 if "totalResults" is 100', async () => {
        const getTotal = await mockTotalPages('100');

        const result = getTotal();

        expect(result).toBeTypeOf('number');
        expect(result).toBe(3);
    });

    it('returns 0 if "totalResults" is 0', async () => {
        const getTotal = await mockTotalPages(0);

        const result = getTotal();

        expect(result).toBe(0)
    });

    it('returns 0 if "totalResults" is empty object', async () => {
        const getTotal = await mockTotalPages({});

        const result = getTotal();

        expect(result).toBe(0);
    });

    it('returns 0 if "totalResults" is a text string', async () => {
        const getTotal = await mockTotalPages('a3da3');

        const result = getTotal();

        expect(result).toBe(0);
    });
});

describe('handlePage()', () => {
    beforeAll(() => {
        document.body.innerHTML = `
            <input type="number" id="number-input" value="1" class="w-7 mr-3 text-center outline-none">
        `;
    })

    const mockHandlePage = async (page: number) => {
        vi.doMock('../../../src/app/utils/globalVariables', () => ({
            pageData: {currentPage: page, totalPages: 10},
            masonryCustom: {initialIteration: 0}
        }));

        vi.doMock('../../../src/app/api/api.js', { spy: true });

        const { handlePage } = await import('../../../src/app/functions/pagination.js');
        const { fetchImg } = await import('../../../src/app/api/api.js');
    
        return {
            fetchImg,
            handlePage
        }
    }

    it('("next") Call "fetchImg()" while "currentPage" is not equal to "totalPages"', async () => {
        const currentPageMock = 1;

        const {handlePage, fetchImg} = await mockHandlePage(currentPageMock);
        handlePage('next');

        expect(fetchImg).toHaveBeenCalled();
    });

    it('("prev") Call "fetchImg()" while "currentPage" is not equal to 1', async () => {
        const currentPageMock = 2;
        
        const {handlePage, fetchImg} = await mockHandlePage(currentPageMock);
        handlePage('prev');

        expect(fetchImg).toHaveBeenCalled();
    });

    it('("next") Do not call "fetchImg()" if "currentPage" is equal to "totalPages"', async () => {
        const currentPageMock = 10;
        
        vi.doMock('../../../src/app/functions/pagination.js', {spy: true});

        const {handlePage, fetchImg} = await mockHandlePage(currentPageMock);
        handlePage('next');

        expect(handlePage).toHaveBeenCalledWith('next');
        expect(fetchImg).not.toHaveBeenCalled();
    });

    it('("prev") Do not call "fetchImg()" if "currentPage" is 1', async () => {
        const currentPageMock = 1;

        vi.doMock('./pagination.js', {spy: true});

        const {handlePage, fetchImg} = await mockHandlePage(currentPageMock);
        handlePage('prev');

        expect(handlePage).toHaveBeenCalledWith('prev');
        expect(fetchImg).not.toHaveBeenCalled();
    });
});
