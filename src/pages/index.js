import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  enableConfig, 
  initialCards,
  profileName,
  profileText,
  profileEditButton,
  addButton,
  formValidators,
} from "../components/utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '705c00be-ed34-4118-b41b-e0ee6e452cf1',
    'Content-Type': 'application/json',
  },
});

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

function handleProfileFormSubmit(formData) {
  profileCard.setUserInfo({
    name: formData.name,
    text: formData["field-text"],
  });
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
    },
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
