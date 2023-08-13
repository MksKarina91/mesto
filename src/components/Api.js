export class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.token = options.headers.authorization;
  }

  _isChecked(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then(this._isChecked);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then(this._isChecked);
  }

  editUserInfo(infoObj) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: infoObj.name,
        about: infoObj.about,
      }),
    }).then(this._isChecked);
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._isChecked);
  }

  postNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._isChecked);
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then(this._isChecked);
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then(this._isChecked);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then(this._isChecked);
  }
}
