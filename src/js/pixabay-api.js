import axios from 'axios';

const API_KEY = '50304425-dc6600d3dd72044e5b60da34e';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesByQuery = query => {
  const data = axios.get('', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      per_page: '9',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
};
