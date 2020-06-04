const http = {
  get: (url) => fetch(url).then(resp => resp.json()),
};

export default http;
export const URL = `http://www.omdbapi.com/?apikey=b4baf89a`;

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};