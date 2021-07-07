export default function getRefs() {
    return {
        searchForm: document.querySelector('.js-search-form'),
        articlesConatiner: document.querySelector('.gallery'),
        loadMoreBtn: document.querySelector('.btn-load'),
        element: document.getElementById('my-element-selector'),
    }
}