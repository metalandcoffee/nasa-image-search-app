import { state, setState } from "../../state";
import "./index.css";

export default function lightbox() {
    let markup = `<div class="lightbox">`;
    state.images.forEach(image => {
        const url = image.links[0].href;
        const title = image.data[0].title;
        markup += `<div class="thumbnail">
            <img src="${url}" alt="${title}" />
        </div>`;
    });
    markup += `</div>`;
    return markup;
}

export function init() {
    const images = Array.from(document.querySelectorAll(`.lightbox img`));
    images.forEach(image => {
        image.addEventListener(`click`, openLightbox);
    });
}

function openLightbox(e) {
    e.preventDefault();
    const currentImageIndex = getCurrentImageIndex(event.target);
    setState(`currentImage`, currentImageIndex);
    console.log(state.currentImage);
}

function getCurrentImageIndex(image) {
    const images = Array.from(document.querySelectorAll(`.lightbox img`));

    let currentImageIndex = images
        .map(img => img.outerHTML)
        .findIndex(img => img == image.outerHTML);

    return currentImageIndex;
}

export function clearLightbox() {
    const lightbox = document.querySelector(`.lightbox`);
    if (lightbox) lightbox.remove();
}