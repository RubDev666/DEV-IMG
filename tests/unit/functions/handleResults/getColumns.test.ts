import {describe, expect, it, vi} from 'vitest';

import {getColumns} from '../../../../src/app/functions/handleResults.js';
import { showFirstImages } from '../../../../src/app/functions/handle-images/firstLoadImages.js';
import { masonryCustom } from '../../../../src/app/utils/globalVariables.js';

vi.mock('../../../../src/app/functions/handle-images/firstLoadImages.js', () => ({
    showFirstImages: vi.fn()
}))

describe('getColumns(isFirstLoad: boolean) - isFirstLoad = true', () => {
    it('if(currentWidth < 768) masonryCustom.columns = 3', () => {
        vi.stubGlobal('window', {innerWidth: 480});

        const columnsExpect = 3;

        getColumns(true);

        expect(masonryCustom.columns).toBe(columnsExpect);
    })

    it('if(currentWidth >= 768 && currentWidth < 1280) masonryCustom.columns = 4', () => {
        vi.stubGlobal('window', {innerWidth: 1000});

        const columnsExpect = 4;

        getColumns(true);

        expect(masonryCustom.columns).toBe(columnsExpect);
    })

    it('if(currentWidth >= 1280) masonryCustom.columns = 5', () => {
        vi.stubGlobal('window', {innerWidth: 1400});

        const columnsExpect = 5;

        getColumns(true);

        expect(masonryCustom.columns).toBe(columnsExpect);
    })

    it('"showFirstImages()" has not been called', () => {
        expect(showFirstImages).not.toBeCalled();
    })
})

describe('getColumns(isFirstLoad: boolean) - isFirstLoad = false', () => {
    it('call "showFirstImages" if (currentColmns !== masonryCustom.columns) is true', () => {
        vi.stubGlobal('window', {innerWidth: 480});

        masonryCustom.columns = 4;

        getColumns(false);

        expect(showFirstImages).toHaveBeenCalled();

        vi.resetAllMocks();
    })

    it('dont call "showFirstImages" if (currentColmns !== masonryCustom.columns) is false', () => {
        vi.stubGlobal('window', {innerWidth: 480});

        masonryCustom.columns = 3;

        getColumns(false);

        expect(showFirstImages).not.toHaveBeenCalled();
    })
})
