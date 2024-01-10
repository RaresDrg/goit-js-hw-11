import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '41738321-a8f823d3708a3beef3432afb9';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

class PixabayApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async getImages() {
    const url = `${ENDPOINT}?q=${this.searchQuery}&${searchParams}&page=${this.page}`;
    const reponse = await axios.get(url);
    const data = await reponse.data;

    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

export default PixabayApi;
