import { beforeAll, describe, expect, it, vi } from 'vitest';
import {HTMLDivElement, Window} from 'happy-dom';

import {showImages} from '../../../../src/app/functions/handle-images/showImages.js';
import { fetchStatus } from '../../../../src/app/utils/globalVariables.js';
import { cleanHtml } from '../../../../src/app/utils/cleaHtml.js';
import {showFirstImages} from '../../../../src/app/functions/handle-images/firstLoadImages.js';

const window = new Window();
const document = window.document;

vi.stubGlobal('document', document);

vi.mock('../../../../src/app/functions/handle-images/showImages.js', () => ({
    showImages: vi.fn()
}))

vi.mock('../../../../src/app/utils/cleaHtml.js', () => ({
    cleanHtml: vi.fn()
}))

vi.mock('../../../../src/app/utils/globalVariables.js', () => ({
    fetchStatus: {
        loadingData: false,
        results: [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5},
            {id: 6}
        ]
    },
    masonryCustom: {
        initialIteration: 0,
        columns: 3,
        firstLoadRows: 2
    }
}))

beforeAll(() => {
    document.body.innerHTML = `
        <div id="gallery" data-set="py-2 px-7" class="grid py-2 px-7 min-h-[400px]"></div>
    `;
})

describe('showFirstImages()', () => {
    it('cleanHtml() has been called with the argument "galleryContainer"', () => {
        const galleryContainer = document.querySelector('#gallery') as HTMLDivElement;

        showFirstImages();

        expect(cleanHtml).toHaveBeenCalledWith(galleryContainer);
    })

    it('showImages() has been called for each result', () => {
        const expectResult = 6;

        expect(fetchStatus.results.length).toBe(expectResult);
        expect(showImages).toHaveBeenCalledTimes(expectResult);
    })
})
