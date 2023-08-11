export const enableConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const cardForm = document.forms["cardForm"];
export const nameInput = document.querySelector(".popup__input_field_name");
export const jobInput = document.querySelector(".popup__input_field_text");
export const profileName = document.querySelector(".profile__name");
export const profileText = document.querySelector(".profile__text");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const placeName = document.querySelector(".popup__input_name");
export const placeImage = document.querySelector(".popup__input_image");
export const addNewCard = document.querySelector(".popup__form_add-photo");
export const popupImage = document.querySelector(".popup__image");
export const popupImageName = document.querySelector(".popup__image-name");
export const elementsItem = document.querySelector(".element");
export const closeButtons = document.querySelectorAll(".popup__close-icon");
export const formValidators = {};
