const state = {
    searchTerm: null,
    images: null,
    currentImage: null
};

const setState = (toSet, newValue) => {
    state[toSet] = newValue;
};

export { state, setState };