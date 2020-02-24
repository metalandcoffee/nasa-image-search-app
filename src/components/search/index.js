import "./index.css";

import { state, setState } from "../../state";
import fetchImages from "../../data";
import lightbox, { init as initLightbox, clearLightbox } from "../lightbox";

export function init() {
    const search = document.getElementById(`search`);
    search.addEventListener(`submit`, doSearch);
}

export default function search() {
    return `
        <h1>Search NASA Photos</h1>
        <form name="search" id="search">
            <p><label for="search-field">Enter Search Term Below:</label></p>
            <input id="search-field" name="search" type="search" />
            <input type="submit" id="submit" value="Search" />
        </form>
    `;
}

async function doSearch(e) {
    e.preventDefault();
    clearLightbox();

    const term = document.getElementById(`search-field`).value.toLowerCase();
    setState(`searchTerm`,term);
    console.log(state.searchTerm);

    const images = await fetchImages();
    setState(`images`, images);
    console.log(state.images);

    if (state.images.length === 0) {
        alert(`There are no results for "${state.searchTerm}"`);
        setState(`searchTerm`, null);
        document.getElementById(`search-field`).value = state.searchTerm;
    } else {
        const markup = lightbox();
        document.getElementById(`app`).insertAdjacentHTML(`beforeend`, markup);
        initLightbox();
    }
}