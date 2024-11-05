import {it, describe, beforeAll, expect} from 'vitest';
import {userEvent} from '@vitest/browser/context';

import { fetchStatus } from '../../../src/app/utils/globalVariables.js';
import { openModal } from '../../../src/app/functions/modal.js';

beforeAll(() => {
    document.body.innerHTML = `
        <div id="img-modal-container" class="w-auto img-modal-size bg-third hidden">
            <img id="img-modal" src="" alt="" class="img-modal-size" loading="lazy">

            <button id="btn-close-modal">x</button>
        </div>

        <div id="dropdownTop" class="absolute bottom-[110%] xl:bottom-[auto] xl:top-[110%] p-2 z-10 hidden xl:flex bg-second rounded-lg shadow text-white"></div>

        <div id="modal-container" class="hidden"></div>
    `;

    fetchStatus.search = 'some-search';
})

describe('"openModal()"', () =>{    
    const imgDataFetch = {
        webformatURL: 'web-img',
        largeImageURL: 'large-img',
        previewURL: 'prev-img'
    }

    it('"imgModal" The correct data was added', () => {
        const imgModal = document.querySelector('#img-modal') as HTMLImageElement;

        openModal(imgDataFetch);

        expect(imgModal.src).not.toBe('');
        expect(imgModal.alt).toBe(`img-${fetchStatus.search}`);
    })

    it('"btnCloseModal.onclick" should be a function', () => {
        const btnCloseModal = document.querySelector('#btn-close-modal') as HTMLBRElement;

        expect(btnCloseModal.onclick).toBeTypeOf('function');
    })

    it('"dropdownTop" the correct data was added', () => {
        const dropdownTop = document.querySelector('#dropdownTop') as HTMLDivElement;

        expect(dropdownTop.innerHTML).not.toBe('');
        expect(dropdownTop.children.length).toBe(1);
    })

    it('Added "modal-active" class to "body"', () => {
        const body = document.querySelector('body') as HTMLBodyElement;

        expect(body.classList.contains('modal-active')).toBe(true);
    })

    it('Added "flex" class to "modalContainer"', () => {
        const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;

        expect(modalContainer.classList.contains('flex')).toBe(true);
    })
});

describe('closeModal()', () => {
    it('"btnCloseModal" event click to close modal', async () => {
        const btnCloseModal = document.querySelector('#btn-close-modal') as HTMLBRElement;

        await userEvent.click(btnCloseModal);
    })

    it('deleted "modal-active" class to "body"', () => {
        const body = document.querySelector('body') as HTMLBodyElement;

        expect(body.classList.contains('modal-active')).toBe(false);
    })

    it('deleted "flex" class to "modalContainer"', () => {
        const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;

        expect(modalContainer.classList.contains('flex')).toBe(false);
    })

    it('"imgModal" The data was deleted', () => {
        const imgModal = document.querySelector('#img-modal') as HTMLImageElement;

        //expect(imgModal.src).toBe('');
        expect(imgModal.alt).toBe('');
    })

    it('The "Flex" class was replaced by the "hidden" class in the "dropdownTop"', () => {
        const dropdownTop = document.querySelector('#dropdownTop') as HTMLDivElement;

        expect(dropdownTop.classList.contains('flex')).toBe(false);
        expect(dropdownTop.classList.contains('hidden')).toBe(true);
    })

    it('"dropdownTop" the data was deleted', () => {
        const dropdownTop = document.querySelector('#dropdownTop') as HTMLDivElement;

        expect(dropdownTop.innerHTML).toBe('');
        expect(dropdownTop.children.length).toBe(0);
    })
})
