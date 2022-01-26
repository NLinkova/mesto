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

  getAllData() {
    return Promise.all([this.getUserInfoFromServer(), this.getCards()])
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

  getUserInfoFromServer(user) {
      return fetch(this._url, { 
          headers: this._headers,
          body: JSON.stringify(user) 
      })
          .then(checkError);
  }

  setUserInfoToServer(user) {
    console.log('Api: setUserInfoToServer(user)');
      return fetch(this._url, { 
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(user)
      })
        .then(checkError);
  }


}