import { showImages } from "./showImages.js";
import {fetchStatus, masonryCustom} from "../../utils/globalVariables.js";
import { cleanHtml } from "../../utils/cleaHtml.js";

export const showFirstImages = () => {
    let countIterator = 0;

    const galleryContainer = document.querySelector('#gallery') as HTMLDivElement;
    
    cleanHtml(galleryContainer);

    fetchStatus.loadingData = true;

    for(let i = masonryCustom.initialIteration; i < fetchStatus.results.length; i++) {
        //show images according to the number of columns on the screen, and then multiply by 2 to fill a little more images.
        if(countIterator === masonryCustom.columns * masonryCustom.firstLoadRows) {
            masonryCustom.initialIteration = i;

            break;
        } else {
            countIterator++
        }

        showImages(i);
    }

    fetchStatus.loadingData = false;
}
