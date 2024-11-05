import { fetchStatus, masonryCustom } from "../../utils/globalVariables.js";
import { showImages } from "./showImages.js";

export const showScrollImages = () => {
    let countIterator = 0;

    fetchStatus.loadingData = true;

    for(let i = masonryCustom.initialIteration; i <= fetchStatus.results.length; i++) {
        if(masonryCustom.initialIteration === fetchStatus.results.length) {
            masonryCustom.initialIteration = fetchStatus.results.length;
            fetchStatus.loadingData = false;

            break;
        }

        //image limit for each scroll event
        if(countIterator === masonryCustom.imagesPerScroll) {
            masonryCustom.initialIteration = i;
            fetchStatus.loadingData = false;

            break;
        } else {
            countIterator++
        }

        showImages(i);
    }

    fetchStatus.loadingData = false;
}
