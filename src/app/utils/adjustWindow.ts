export const adjustWindow = () => {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;

    const header = document.querySelector('header') as HTMLHeadingElement;
    const adjustContainer = document.querySelector('#adjust-window') as HTMLDivElement;

    header.style.paddingRight = `${scrollBarWidth.toString()}px`;
    adjustContainer.style.paddingRight = `${scrollBarWidth.toString()}px`;
}

export const restoreWindow = () => {
    const header = document.querySelector('header') as HTMLHeadingElement;
    const adjustContainer = document.querySelector('#adjust-window') as HTMLDivElement;

    header.style.paddingRight = `0px`;
    adjustContainer.style.paddingRight = `0px`;
}
