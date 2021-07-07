import './sass/main.css';
import './js/apiService.js';
import photoApiService from './js/apiService.js';
import getRefs from './js/get-refs.js';

import articlesTpl from './templates/image-card.hbs';
import debounce from 'lodash.debounce';


const copyApiService = new photoApiService();



const refs = getRefs();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function scrollDown() {
    refs.element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}



function onSearch(e) {

    e.preventDefault();



    copyApiService.query = e.currentTarget.elements.query.value;
    if (!copyApiService.query) {
        return;
    }

    copyApiService.resetPage();

    copyApiService.fetchArticles().then(articles => {
        if (articles.length > 0) {
            refs.loadMoreBtn.classList.remove('is-hidden');
        }
        if (articles.length === 0) {
            alert('Photo not found!');
        }
        clearArticlesContainer();
        markupArticlesContainer(articles);
        if (articles.length < 12) {
            refs.loadMoreBtn.classList.add('is-hidden');
        }
    });
}

function onLoadMore() {
    copyApiService.fetchArticles().then(articles => {
        markupArticlesContainer(articles);
        scrollDown();
        if (articles.length < 12) {
            refs.loadMoreBtn.classList.add('is-hidden');
        }

    }).then();
}

function markupArticlesContainer(articles) {
    refs.articlesConatiner.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
    refs.articlesConatiner.innerHTML = '';
}

// if (articles.length < 12) {
//     
// }

