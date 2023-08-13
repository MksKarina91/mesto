export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    openDeletePopup,
    likeCard,
    dislikeCard,
    myId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._openDeletePopup = openDeletePopup;
    this._id = data._id;
    this._ownerId = data.owner._id;

    this._myId = myId;

    this.likeCard = likeCard;
    this.dislikeCard = dislikeCard;
  }
  _getTemplate() {
    const cardEl = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);

    return cardEl;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardLike = this._element.querySelector(".element__like");
    this._likesCount = this._element.querySelector(".element__like_counts");
    this._element.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleTrashDisplay() {
    if (this._ownerId !== this._myId) {
      this._deleteButton.classList.add("element__delete_inactive");
    }
  }

  _handleCardLike() {
    if (
      this._likes.some((item) => {
        return item._id === this._myId;
      })
    ) {
      this.dislikeCard(this._likesCount, this._id, this._cardLike);
      this._likes = this._likes.filter((item) => item._id !== this._myId);
    } else {
      this.likeCard(this._likesCount, this._id, this._cardLike);
      this._likes.push({ _id: this._myId });
    }
  }

  _checkLikeColor() {
    if (
      this._likes.some((item) => {
        return item._id === this._myId;
      })
    ) {
      this._cardLike.classList.add("element__like_active");
    } else {
      this._cardLike.classList.remove("element__like_active");
    }
  }

  _setEventListeners() {
    this._cardLike = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');

    this._cardLike.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._deleteButton.addEventListener('click', () => {
      this._openDeletePopup();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
