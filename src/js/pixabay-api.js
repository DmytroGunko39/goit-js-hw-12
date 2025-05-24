import axios from 'axios';

const API_KEY = '50304425-dc6600d3dd72044e5b60da34e';
export const IMAGES_PER_PAGE = 15;

axios.defaults.baseURL = 'https://pixabay.com';

export const getImagesByQuery = async (query, currentPage) => {
  try {
    const response = await axios.get('/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        page: currentPage,
        per_page: IMAGES_PER_PAGE,
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
