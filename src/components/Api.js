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

  getCards() {
      return fetch(this._url, { headers: this._headers })
        .then(checkError);
  }

  postCard(card) {
      return fetch(this._url, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(card)
      })
        .then(checkError);
  }

  deleteCard(id) {
      return fetch(`${this._url}/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(checkError);
    }

  getUserInfoFromServer() {
      return fetch(this._url, { 
          headers: this._headers,
          body: JSON.stringify() 
      })
          .then(checkError);
  }

  setUserInfoToServer(user) {
      return fetch(this._url, { 
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(user)
      })
        .then(checkError);
  }


}