import Notiflix from 'notiflix';
import PixabayApi from './PixabayApi.js';
import { createMarkup, updateGalleryList } from './markup.js';
import LoadMoreBtn from './LoadMoreBtn.js';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const API = new PixabayApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMoreBtn',
  isHidden: true,
});

// Submit event //
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const searchTerm = formEl.elements.searchQuery.value.trim();

  if (searchTerm === '') {
    Notiflix.Notify.info('Please, write something');
    return;
  }

  setApi(searchTerm);
  clear();
  loadData();
}

function setApi(searchTerm) {
  API.searchQuery = searchTerm;
  API.page = 1;
}

function clear() {
  galleryEl.innerHTML = '';
  formEl.reset();
  loadMoreBtn.hide();
}

async function loadData() {
  try {
    const data = await API.getImages();

    if (data.totalHits === 0) {
      onError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const markup = createMarkup(data.hits);
    updateGalleryList(markup);

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    loadMoreBtn.show();
    handleSmoothScroll();
  } catch (error) {
    onError(error.message);
  }
}

function onError(error) {
  Notiflix.Notify.failure(error);
  updateGalleryList(`<p>${error}</p>`);
}

function handleSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.5,
    behavior: 'smooth',
  });
}

// Click event (load more) //
loadMoreBtn.button.addEventListener('click', onClick);

function onClick() {
  loadMoreBtn.disable();
  loadMoreData();
}

async function loadMoreData() {
  try {
    const data = await API.getImages();
    const images = await data.hits;

    if (images.length === 0) {
      onError("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.enable();
      loadMoreBtn.hide();
      return;
    }

    const markup = createMarkup(images);
    updateGalleryList(markup);

    loadMoreBtn.enable();
    handleSmoothScroll();
  } catch (error) {
    onError(error.message);
  }
}
