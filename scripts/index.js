// Находим форму в DOM
const formProfile = document.querySelector('.popup__form_profile');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_text');
const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const formProfileOpenButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_image');
const formPlaceCreation = popupAdd.querySelector('.popup__form');
const placeName = document.querySelector('.popup__input_name');
const placeImage = document.querySelector('.popup__input_image');
const popupTypePreview = document.querySelector('.popup_type_preview')
const popupImage = popupTypePreview.querySelector('.popup__image');
const popupImageName = popupTypePreview.querySelector('.popup__image-name');
const elementsItem = document.querySelector('.element');
const cardTemplate = document.querySelector('#element__template').content;
const card = cardTemplate.querySelector('element__card');
const closeButtons = document.querySelectorAll('.popup__close-icon');
const allPopups = document.querySelectorAll('popup');

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
})

addButton.addEventListener('click', function () {
  const inputList = Array.from(formPlaceCreation.querySelectorAll('.popup__input'));
  const formValidation = inputList.every(function (input) {
    return input.validity.valid;
  });
  if (!formValidation) {
    const buttonValidate = popupAdd.querySelector('.popup__create-button');
    buttonValidate.classList.add('popup__button_disabled');
    buttonValidate.setAttribute('disabled', 'true');
  }
  openPopup(popupAdd);
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
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const cardLike = newCard.querySelector('.element__like');
  const cardDelete = newCard.querySelector('.element__delete');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLike.addEventListener('click', clickLike);
  cardDelete.addEventListener('click', deleteCard);
  function clickLike(cardLike) {
    cardLike.target.classList.toggle('element__like_active');
  };

  function deleteCard(evt) {
    const purge = evt.target.closest('.element__card').remove();
  };

  cardImage.addEventListener('click', function (event) {
    openPopup(popupTypePreview);
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageName.textContent = card.name;
  })

  return newCard;

}

formPlaceCreation.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardNew = createCard({ name: placeName.value, link: placeImage.value });
  elementsItem.prepend(cardNew);
  closePopup(popupAdd);
  evt.target.reset();
})

