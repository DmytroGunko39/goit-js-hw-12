import iziToast from 'izitoast';
import { renderGallery, clearGallery } from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

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

  //-----retrieving the hits object by destructurisation
  getImagesByQuery(query)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          title: '',
          titleColor: '#fff',
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
          icon: '',
          close: true,
          messageColor: '#fff',
          backgroundColor: '#ef4040',
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
    });
};

refs.searchForm.addEventListener('submit', onSearchForm);
