import axios from 'axios';

const apiUrl = process.env.VUE_IMAGES_API_URL

const imagesApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});


export { imagesApi };
