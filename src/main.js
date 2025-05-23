import iziToast from 'izitoast';
import {
  createGallery,
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery, IMAGES_PER_PAGE } from './js/pixabay-api';
import iconError from '../src/img/error-icon.svg';
import iconMessage from '../src/img/message-icon.svg';

const refs = {
  searchForm: document.querySelector('.js-form'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  gallery: document.querySelector('.js-gallery'),
};

let page = 1;
let query = '';

//---Retrieving the value from input
const onSearchForm = async event => {
  try {
    event.preventDefault();
    query = event.currentTarget.elements.search_text.value.trim();

    if (query === '') {
      return;
    }
    showLoader();
    page = 1;

    const { data } = await getImagesByQuery(query, page); //retrieving the data method by destructuring

    if (data.hits.length === 0) {
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
      hideLoadMoreButton();
      clearGallery(); //Function - clear galleries
      return;
    }

    clearGallery();
    renderGallery(data.hits); // Rendering the gallery
    refs.searchForm.reset(); //clearing input
    showLoadMoreButton();
    refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtn);
    refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

//-----Loade More button
const onLoadMoreBtn = async event => {
  try {
    page++;
    showLoader();
    const { data } = await getImagesByQuery(query, page);

    const galleryCardsMarkup = data.hits.map(createGallery).join('');
    refs.gallery.insertAdjacentHTML('beforeend', galleryCardsMarkup);

    //---Page scrolling
    const firstNewCard = refs.gallery.lastElementChild; //Get the last item in the gallery
    await new Promise(resolve => setTimeout(resolve, 100)); // Image upload;pause
    const cardHeight = firstNewCard.getBoundingClientRect().height; //Calculate height
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    //---End of collection
    const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);
    if (page >= totalPages) {
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        iconUrl: iconMessage,
        timeout: 4000,
        titleColor: '#fff',
        backgroundColor: ' #09f',
        messageColor: '#fff',
      });
      hideLoadMoreButton();
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtn);
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
};

refs.searchForm.addEventListener('submit', onSearchForm);
