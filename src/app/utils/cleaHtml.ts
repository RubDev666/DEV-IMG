export function cleanHtml(selector: HTMLElement) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}
