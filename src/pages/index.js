import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator, enableConfig } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
// Находим поля формы в DOM

export const profileForm = document.forms["profileForm"];
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

addButton.addEventListener("click", function () {
  popupAddImage.open();
  formValidators["cardForm"].resetValidation();
});

function createCard(data) {
  const newCard = new Card(data, "#element__template", handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

const profileCard = new UserInfo({
  selectorProfileName: ".profile__name",
  selectorProfileText: ".profile__text",
});

function handleProfileFormSubmit(evt) {
  profileCard.setUserInfo(evt);
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  popupProfile.close();
}

profileEditButton.addEventListener("click", () => {
  popupProfile.open();
  formValidators["profileForm"].resetValidation();
  const dataProfile = profileCard.getUserInfo();
  profileName.value = dataProfile.name;
  profileText.value = dataProfile.text;
});

const popupTypePreview = new PopupWithImage(".popup_type_preview");
function handleCardClick(name, link) {
  popupTypePreview.open(name, link);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
    }
  },
  ".element"
);
cardsList.renderItems();

function handleCardSubmit(values) {
  const сard = createCard(values);
  cardsList.addItem(сard);
  popupAddImage.close();
}

const popupProfile = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit,
  ".popup__form"
);
const popupAddImage = new PopupWithForm(
  ".popup_type_image",
  handleCardSubmit,
  ".popup__form_add-photo"
);

const enableValidation = (enableConfig) => {
  const formList = Array.from(
    document.querySelectorAll(enableConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(enableConfig, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(enableConfig);
