import { Card } from './Card.js';
import { FormValidator, enableConfig } from './FormValidator.js';
// Находим поля формы в DOM
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_text');
const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const formProfileOpenButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_image');
const placeName = document.querySelector('.popup__input_name');
const placeImage = document.querySelector('.popup__input_image');
const addNewCard = document.querySelector('.popup__form_add-photo');
const popupTypePreview = document.querySelector('.popup_type_preview')
const popupImage = popupTypePreview.querySelector('.popup__image');
const popupImageName = popupTypePreview.querySelector('.popup__image-name');
const elementsItem = document.querySelector('.element');
const closeButtons = document.querySelectorAll('.popup__close-icon');

const formCardAdd = new FormValidator(enableConfig, popupAdd);
formCardAdd.enableValidation();
const formProfileEdit = new FormValidator(enableConfig, popupProfile);
formProfileEdit.enableValidation();


export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const closePopupByEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};
const closePopupByClickOverlay = evt => {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupProfile);
};
formProfile.addEventListener('submit', handleProfileFormSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  elementsItem.prepend(createCard({ name: placeName.value, link: placeImage.value }));
  addNewCard.reset();
  closePopup(popupAdd);
};
addNewCard.addEventListener('submit', handleCardSubmit);

function openPopup(elTarget) {
  elTarget.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  elTarget.addEventListener('mousedown', closePopupByClickOverlay);
}
function closePopup(elTarget) {
  elTarget.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  elTarget.removeEventListener('mousedown', closePopupByClickOverlay);
}

formProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  formProfileEdit.resetForm();
})

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
  formCardAdd.resetForm();
})

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((card) => {
  const newElement = createCard(card);
  elementsItem.prepend(newElement);
});

function createCard(card) {
  const newCard = new Card(card.name, card.link, '#element__template', handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  openPopup(popupTypePreview);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
};
