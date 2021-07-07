export default class photoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        console.log(this);
        const Key = '22382402-6e64c7211e25b83073e42c977';
        const BaseUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
        const url = `${BaseUrl}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${Key}`;
        return fetch(url).then(response => response.json()).then(({ hits }) => {
            this.incrementPage();
            return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuary) {
        this.searchQuery = newQuary;
    }
}