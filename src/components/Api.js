const checkError = res => {
  if (res.ok) {
    return res.json();
  }    
  return Promise.reject('Something wrong!');
};

export default class Api {
  constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
  }

  // getAllData() {
  //   return Promise.all([this.getUserInfoFromServer(), this.getCards()])
  // }

  getCards() {
      return fetch(`${this._url}/cards`, { headers: this._headers })
        .then(checkError);
  }

  postCard(card) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(card)
      })
        .then(checkError);
  }

  putLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(checkError);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(checkError);
  }

  deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(checkError);
    }

  getUserInfoFromServer() {
      return fetch(`${this._url}/users/me`, { 
          headers: this._headers,
          body: JSON.stringify() 
      })
          .then(checkError);
  }

  setUserInfoToServer(data) {
    return fetch(`${this._url}/users/me`, { 
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
    })
      .then(checkError);
}

setUserAvatarToServer(data) {
    return fetch(`${this._url}/users/me/avatar`, { 
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
    })
      .then(checkError);
}


}