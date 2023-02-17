import axios from 'axios';
const baseURL = `https://pixabay.com/api/?page=1&image_type=photo&orientation=horizontal&per_page=12`;

export const getPics = async (page, query) => {
  const options = {
    params: {
      page: page,
      q: query,
      key: '32117995-da98556d394b8c9b5a96c2a58',
    },
  };

  try {
    return await axios.get(baseURL, options);
  } catch (error) {
    console.log('error.name: ', error.name, 'error.message: ', error.message);
  }
};
