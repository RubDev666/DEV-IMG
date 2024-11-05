import {fetchStatus, masonryCustom} from "../../utils/globalVariables.js";
import { openModal } from "../modal.js";

export const showImages = (i: number) => {
    const galleryContainer = document.querySelector('#gallery') as HTMLDivElement;

    const result = fetchStatus.results[i];

    let column = document.querySelector(`.column-${masonryCustom.countColumns + 1}`) as HTMLDivElement;

    if(!column) {
        column = document.createElement('DIV') as HTMLDivElement;
        column.classList.add(`column-${masonryCustom.countColumns + 1}`);
    }

    //const column = ALL_COLUMNS[countColumns];

    const imgCont = document.createElement('DIV') as HTMLDivElement;
    imgCont.classList.add('img-container', 'scroll', `${i < masonryCustom.columns * masonryCustom.firstLoadRows ? 'active' : undefined}`, 'cursor-pointer');

    imgCont.onclick = () => openModal(result);

    const overlayHoverGradient = document.createElement('DIV') as HTMLDivElement;
    overlayHoverGradient.classList.add('hover-gradient');

    const imgEle = document.createElement('IMG') as HTMLImageElement;
    imgEle.src = result.webformatURL;
    imgEle.loading = 'lazy';
    imgEle.alt = `img-${fetchStatus.search}`;
    imgEle.classList.add('w-full', 'h-full');

    imgCont.appendChild(imgEle);
    imgCont.appendChild(overlayHoverGradient);
    column.appendChild(imgCont);

    if(galleryContainer.childNodes.length !== masonryCustom.columns) galleryContainer.appendChild(column);

    if (masonryCustom.countColumns === masonryCustom.columns - 1) {
        masonryCustom.countColumns = 0;
    } else {
        masonryCustom.countColumns++;
    }
}
