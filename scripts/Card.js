export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element__card')
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
  _handleCardLike() {
    this._cardLike.classList.toggle('element__like_active');
  }
  _deleteCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._cardLike = this._element.querySelector('.element__like');
    this._cardDelete = this._element.querySelector('.element__delete');
    this._cardLike.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._cardDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
