import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {HTMLDivElement, HTMLImageElement, Window} from 'happy-dom';

import {fetchStatus, masonryCustom} from '../../../../src/app/utils/globalVariables.js';
import {openModal} from '../../../../src/app/functions/modal.js';
import {showImages} from '../../../../src/app/functions/handle-images/showImages.js';

const window = new Window();
const document = window.document;

vi.stubGlobal('document', document);

vi.mock('../../../../src/app/utils/globalVariables.js', () => ({
    fetchStatus: {
        search: 'any-search',
        results: [
            {
                id: 1,
                webformatURL: 'url-img-1'
            },
            {
                id: 2,
                webformatURL: 'url-img-2'
            },
            {
                id: 3,
                webformatURL: 'url-img-3'
            },
        ]
    },
    masonryCustom: {
        columns: 3,
        countColumns: 0
    }
}))

describe('showImages()', () => {
    const idImage = 2;

    it('verify that "column" exists', () => {
        document.body.innerHTML = `
        <div id="gallery" data-set="py-2 px-7" class="grid py-2 px-7 min-h-[400px]">
            <div class="column-1"></div>
            <div class="column-2"></div>
            <div class="column-3"></div>
        </div>
        `;

        let column = document.querySelector(`.column-1`) as HTMLDivElement;

        showImages(idImage);

        expect(column).not.toBeNull();
    })

    it('if(!column) = true / create the column', () => {
        document.body.innerHTML = `
        <div id="gallery" data-set="py-2 px-7" class="grid py-2 px-7 min-h-[400px]">
        </div>
        `;

        masonryCustom.countColumns = 0;

        showImages(idImage);

        const col1 = document.querySelector('.column-1') as HTMLDivElement;

        expect(col1).not.toBeNull();
    })

    it('"imgCont" has been successfully created', () => {
        document.body.innerHTML = `
        <div id="gallery" data-set="py-2 px-7" class="grid py-2 px-7 min-h-[400px]">
            <div class="column-1"></div>
            <div class="column-2"></div>
            <div class="column-3"></div>
        </div>
        `;

        showImages(idImage);

        const overlayHoverGradient = document.querySelector('.hover-gradient') as HTMLDivElement;

        expect(overlayHoverGradient).not.toBeNull();
    })

    it('"imgEle" has been successfully created', () => {
        const imgEle = document.querySelector('IMG') as HTMLImageElement;

        const srcExpect = fetchStatus.results[idImage].webformatURL;

        expect(imgEle).not.toBeNull();
        expect(imgEle.src).toBe(srcExpect);
    })
})
