import './sass/main.css';
import './js/apiService.js';
import photoApiService from './js/apiService.js';
import getRefs from './js/get-refs.js';

import articlesTpl from './templates/image-card.hbs';
import debounce from 'lodash.debounce';


const copyApiService = new photoApiService();



const refs = getRefs();


refs.searchForm.addEventListener('input', debounce(onSearch, 700));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function scrollDown() {
    refs.element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}



function onSearch(e) {
    e.preventDefault();

    setTimeout(function removeHidden() {
        refs.loadMoreBtn.classList.remove('is-hidden');
    }, 1000);

    copyApiService.query = e.target.value;
    copyApiService.resetPage();
    if (!copyApiService.query) {
        return;
    }

    copyApiService.fetchArticles().then(articles => {
        clearArticlesContainer();
        markupArticlesContainer(articles);
    });
}

function onLoadMore() {
    copyApiService.fetchArticles().then((markupArticlesContainer)).then(scrollDown);
}

function markupArticlesContainer(articles) {
    refs.articlesConatiner.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
    refs.articlesConatiner.innerHTML = '';
}

