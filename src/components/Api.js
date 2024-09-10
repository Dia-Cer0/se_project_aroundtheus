export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", { headers: this.headers }).then(
      this._checkResponse
    );
  }

  getCards() {
    return fetch(this.baseUrl + "/cards", { headers: this.headers }).then(
      this._checkResponse
    );
  }

  updateProfileInfo({ name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  updateProfileAvatar(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.ok;
      }
      return Promise.reject(`Error ${res.status}`);
    });
  }

  likeCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}
