export const adjustWindow = (typeAdjust: 'open' | 'close') => {
    const header = document.querySelector('header') as HTMLHeadingElement;
    const adjustContainer = document.querySelector('#adjust-window') as HTMLDivElement;

    switch (typeAdjust) {
        case 'open': {
            const scrollBarWidth = window.innerWidth - document.body.clientWidth;

            header.style.paddingRight = `${scrollBarWidth.toString()}px`;
            adjustContainer.style.paddingRight = `${scrollBarWidth.toString()}px`;

            break;
        }
        case 'close': {
            header.style.paddingRight = `0px`;
            adjustContainer.style.paddingRight = `0px`;

            break;
        }
        default: {
            break
        }
    }
}
