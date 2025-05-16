export const getImagesByQuery = query => {
  const params = new URLSearchParams({
    key: '50304425-dc6600d3dd72044e5b60da34e',
    q: query,
    image_type: 'photo',
    per_page: '9',
    orientation: 'horizontal',
    safesearch: true,
  });
  console.log(params.toString());

  return fetch(`https://pixabay.com/api/?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

// import axios from 'axios';

// const API_KEY = '50304425-dc6600d3dd72044e5b60da34e';
// const BASE_URL = 'https://pixabay.com/api/';

// export async function getImagesByQuery(query) {
//   const params = {
//     key: API_KEY,
//     q: query,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 9,
//   };

//   try {
//     const response = await axios.get(BASE_URL, { params });
//     return response.data; // повертає тільки data
//   } catch (error) {
//     throw new Error(`Failed to fetch images: ${error.message}`);
//   }
// }
