export default class Api {
  constructor(options) {
    // constructor body

    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(status) {
    console.log("running check response method");
    if (status.ok) {
      return status.json();
    }
    return Promise.reject(`Error ${status.status}`);
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", { headers: this.headers })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getInitialCards() {
    // ...
  }

  getCards() {
    return fetch(this.baseUrl + "/cards", { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateProfileInfo({ name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateProfileAvatar(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addNewCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.ok;
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  likeCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this.headers,
    });
  }

  dislikeCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
