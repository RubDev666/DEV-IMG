import {fetchStatus} from "../utils/globalVariables.js";
import { cleanHtml } from "../utils/cleaHtml.js";
import { adjustWindow, restoreWindow } from "../utils/adjustWindow.js";

export const openModal = (imgData: any) => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;
    const dropdownTop = document.querySelector('#dropdownTop') as HTMLDivElement;
    const imgModal = document.querySelector('#img-modal') as HTMLImageElement;
    const btnCloseModal = document.querySelector('#btn-close-modal') as HTMLBRElement;

    imgModal.src = imgData.webformatURL;
    imgModal.alt = `img-${fetchStatus.search}`;

    btnCloseModal.onclick = (e) => closeModal(e);

    const ulData = document.createElement('ul');

    const imgD = [
        {
            sizeUI: 'Full Size',
            sizeURL: imgData.largeImageURL
        },
        {
            sizeUI: 'Medium Size',
            sizeURL: imgData.webformatURL
        },
        {
            sizeUI: 'Small Size',
            sizeURL: imgData.previewURL
        }
    ];

    imgD.forEach((sizeElement) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = sizeElement.sizeURL;
        link.textContent = sizeElement.sizeUI;
        link.classList.add('download-btns');
        link.target = '_blank';

        const s = document.createElement('span');
        s.textContent = 'Download';
        s.classList.add('material-symbols-outlined', 'icon-download');

        link.appendChild(s);
        li.appendChild(link);

        ulData.appendChild(li);

        dropdownTop.appendChild(ulData);
    })

    adjustWindow();

    body.classList.add('modal-active');
    modalContainer.classList.replace('hidden', 'flex');
}

export const closeModal = (e: MouseEvent) => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const modalContainer = document.querySelector('#modal-container') as HTMLDivElement;
    const dropdownTop = document.querySelector('#dropdownTop') as HTMLDivElement;
    const imgModal = document.querySelector('#img-modal') as HTMLImageElement;

    const target = e.target as HTMLElement;
 
    if(target.id.includes('modal-container') || target.id.includes('btn-close-modal') || target.classList.contains('close')) {
        restoreWindow();
        
        body.classList.remove('modal-active');
        modalContainer.classList.replace('flex', 'hidden');
        imgModal.src = '';
        imgModal.alt = '';

        dropdownTop.classList.replace('flex', 'hidden');

        cleanHtml(dropdownTop);
    }
}
