import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery .photo-card a', {
  captionDelay: '250',
});

const galleryEl = document.querySelector('.gallery');

function createMarkup(images) {
  return images
    .map(image => {
      const markup = `
        <div class="photo-card">
          <a class="gallery__link" href="${image.largeImageURL}">
            <img
              class="gallery__image"
              src="${image.webformatURL}"
              alt="${image.tags}
              loading="lazy"
            >
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b>${image.likes}</p>
            <p class="info-item"><b>Views</b>${image.views}</p>
            <p class="info-item"><b>Comments</b>${image.comments}</p>
            <p class="info-item"><b>Downloads</b>${image.downloads}</p>
          </div>
        </div>
      `;
      return markup;
    })
    .join('');
}

function updateGalleryList(markup) {
  galleryEl.innerHTML += markup;
  lightbox.refresh();
}

export { createMarkup, updateGalleryList };
