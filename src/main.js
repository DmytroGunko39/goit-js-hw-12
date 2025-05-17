import iziToast from 'izitoast';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iconError from '../src/img/error-icon.svg';

const refs = {
  searchForm: document.querySelector('.js-form'),
};

//-----retrieving the value from input
const onSearchForm = event => {
  event.preventDefault();

  const query = event.currentTarget.elements.search_text.value.trim();

  // -----checking if input empty or not
  if (query === '') {
    return;
  }

  showLoader();

  //-----retrieving the hits object by destructurisation
  getImagesByQuery(query)
    .then(({ data: { hits } }) => {
      if (hits.length === 0) {
        iziToast.error({
          title: '',
          titleColor: '#fff',
          timeout: 3000,
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
          iconUrl: iconError,
          iconColor: '#fff',
          close: true,
          messageColor: '#fff',
          messageSize: '16px',
          backgroundColor: '#ef4040',
          maxWidth: '434px',
        });

        refs.searchForm.reset(); //clearing input
        clearGallery(); //Function - clear galleries
        return;
      }

      // Rendering the gallery
      renderGallery(hits);
      refs.searchForm.reset(); //clearing input
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => hideLoader());
};

refs.searchForm.addEventListener('submit', onSearchForm);
