import { masonryCustom, fetchStatus } from "../../utils/globalVariables.js";
import { showScrollImages } from "./showScrollImages.js";

export const handleScrollImages = () => {
    const galleryContainer = document.querySelector('#gallery') as HTMLDivElement;

    const imgC = document.getElementsByClassName('scroll');

    if (imgC.length > 0) {
        for (let i = 0; i < imgC.length; i++) {
            const imgU = imgC[i].getBoundingClientRect();

            if (imgU.top < 700) {
                imgC[i].classList.add('active');
            } else {
                imgC[i].classList.remove('active');
            }
        }
    }

    if(masonryCustom.initialIteration !== fetchStatus.results.length && !fetchStatus.loadingData) {
        const scrollTop = window.scrollY;
        const containerHeight = galleryContainer.offsetHeight;
        const windowHeight = window.innerHeight;
    
        if (scrollTop + windowHeight >= containerHeight) showScrollImages();
    }
}
