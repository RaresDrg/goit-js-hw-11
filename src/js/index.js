import getImages from './PixabayApi.js';
import Notiflix from 'notiflix';

const formEl = document.getElementById('search-form');

const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  debugger;
  event.preventDefault();

  const searchTerm = formEl.elements.searchQuery.value;

  clearGalleryList();

  try {
    const images = await getImages(searchTerm);

    if (images.length === 0) {
      onError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const markup = createMarkup(images);
    updateGalleryList(markup);
  } catch (error) {
    onError(error.message);
  }
}

function onError(error) {
  Notiflix.Notify.failure(error);
  updateGalleryList(`<p>${error}</p>`);
}

// function createMarkup(images) {
//   const markup = images
//     .map(image => {
//       const {
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       } = image;

//       return;
//     })
//     .join();

//   return markup;
// }

function createMarkup(images) {
  return images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
      <div class="photo-card">
        <img src=${webformatURL} alt=${tags} loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>;
      `;
    })
    .join('');
}

function updateGalleryList(markup) {
  galleryEl.innerHTML += markup;
}

function clearGalleryList() {
  galleryEl.innerHTML = '';
}
