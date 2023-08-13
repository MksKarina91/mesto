export class UserInfo {
  constructor({
    selectorProfileName,
    selectorProfileText,
    selectorProfileAvatar,
  }) {
    (this._profileName = document.querySelector(selectorProfileName)),
      (this._profileText = document.querySelector(selectorProfileText)),
      (this._avatar = document.querySelector(selectorProfileAvatar));
  }

  getUserInfo() {
    const userData = {
      name: this._profileName.textContent,
      about: this._profileText.textContent,
    };

    return userData;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileText.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
