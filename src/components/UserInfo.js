export class UserInfo {
    constructor({ selectorProfileName, selectorProfileText }) {
        this._profileName = document.querySelector(selectorProfileName),
            this._profileText = document.querySelector(selectorProfileText);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent, 
            text: this._profileText.textContent 
         }
    }
    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileText.textContent = data.text;
    }
}