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


}