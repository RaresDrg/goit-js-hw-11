import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
// const API_KEY = '40980203-bf5d380b1e5580ea318d0b451';

const searchParams = new URLSearchParams({
  // key: API_KEY,
  key: '40980203-bf5d380b1e5580ea318d0b451',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

let page = 1;

async function getImages(query) {
  const url = `${ENDPOINT}?q=${query}&${searchParams}&page=${page}`;

  const response = await axios.get(url);
  const images = await response.data.hits;

  page += 1;
  console.log(page);

  return images;
}

export default getImages;
