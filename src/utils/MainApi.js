export const BASE_URL = 'https://api.movieboxs.nomoredomainsmonster.ru'

function getRequest(url, options) {
  return fetch(url, options)
  .then((res) => {
      if(res.ok) {
          return res.json()
      }
      return res.json().then((err) => {
        return Promise.reject(res)
      })

  });
}

export const register = (name, email, password) => {
  return getRequest(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
};

export const authorize = (email, password) => {
  return getRequest(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((data) => {
    localStorage.setItem('jwt', data)
      return data;
    })
  };

  export const checkToken =() => {
    return getRequest(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  };

  export const signout =() => {
    return getRequest(`${BASE_URL}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  };

  export const updateUser = (data) => {
    return getRequest(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
        })
      });
  };

  export const getSavedMovies = () => {
    return getRequest(`${BASE_URL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  };

  export const createMovie = ({data}) => {
    const imageLink = `https://api.nomoreparties.co/${data.image.url}`;
    const thumbnail = `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`;
    return getRequest(`${BASE_URL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country : data.country,
        director : data.director,
        duration : data.duration,
        year : data.year,
        description : data.description,
        image : imageLink,
        trailerLink : data.trailerLink,
        nameRU : data.nameRU,
        nameEN : data.nameEN,
        thumbnail : thumbnail,
        movieId : data.id,
      })
    });
  };

  export const deleteMovie = (data) => {

    return getRequest(`${BASE_URL}/movies/${data}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };


