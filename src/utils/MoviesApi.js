class MoviesApi{
  constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
  };

  _getRequest (url, options) {
      return fetch(url, options)
      .then((res) => {
          if(res.ok) {
              return res.json()
          }
          throw new Error('Что-то пошло не так...')
      });
  };

  getMovies(){
    return this._getRequest(`${this._url}/`, {
     headers: this._headers
    })
 };
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
  'Content-Type': 'application/json',
  },
});

  export default moviesApi