import SimpleLightbox from 'simplelightbox';

const gallery = document.querySelector('.js-gallery');
const loaderContainer = document.querySelector('.loader-container');

let lightbox = null;

const createGallery = ({
  webformatURL: src,
  tags: alt,
  largeImageURL: href,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
<li class="gallery-item">
   <a class="gallery-link" href="${href}">
		<img 
		  class="gallery-img" 
		  src="${src}" 
		  alt="${alt}" 
		/>
   </a>
   <div class="image-stats">
    <p><b>Likes</b><br>${likes}</p>
    <p><b>Views</b><br>${views}</p>
    <p><b>Comments</b><br>${comments}</p>
    <p><b>Downloads</b><br>${downloads}</p>
  </div>
</li>
`;
};

// Function to render the all gallery
export function renderGallery(hits) {
  const galleryCardsMarkup = hits.map(createGallery).join('');
  gallery.innerHTML = galleryCardsMarkup;

  // Oновлюємо SimpleLightbox
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.js-gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

//Function - clear galleries
export function clearGallery() {
  gallery.innerHTML = '';
}

// function show loader
export function showLoader() {
  loaderContainer.classList.remove('hidden');
}

//function hide loader
export function hideLoader() {
  loaderContainer.classList.add('hidden');
}
