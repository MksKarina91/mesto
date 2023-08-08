import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this.image = this._popup.querySelector('.popup__image');
        this.name = this._popup.querySelector('.popup__image-name');
    }
    open(name, link) {
    super.open();
    this.image.src = link;
    this.image.alt = name;
    this.name.textContent = name;
    }
}
