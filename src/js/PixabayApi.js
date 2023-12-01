import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '40980203-bf5d380b1e5580ea318d0b451';

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
