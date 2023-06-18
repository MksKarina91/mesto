// Находим форму в DOM
const formElement = document.querySelector('.popup__form_profile');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_text');
const popupWindow = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const formButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_image');
const formPlaceCreation = popupAdd.querySelector('.popup__form');
const placeName = document.querySelector('.popup__input_name');
const placeImage = document.querySelector('.popup__field_image');
const popupTypePreview = document.querySelector('.popup_type_preview')
const popupImage = popupTypePreview.querySelector('.popup__image');
const popupImageName = popupTypePreview.querySelector('.popup__image-name');
const elementsItem = document.querySelector('.element');
const cardTemplate = document.querySelector('#element__template').content;
const card = cardTemplate.querySelector('element__card');
const closeButtons = document.querySelectorAll('.popup__close-icon');

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupWindow);
}
formElement.addEventListener('submit', handleFormSubmit);

function openPopup(elTarget) {
  elTarget.classList.add('popup_opened');
}
function closePopup(elTarget) {
  elTarget.classList.remove('popup_opened');
}

formButton.addEventListener('click', function(){
  openPopup(popupWindow);
})

addButton.addEventListener('click', function(){
  openPopup(popupAdd);
})

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


const initialCards = [
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

  cardImage.addEventListener('click', function(event){
    openPopup(popupTypePreview);
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageName.textContent = card.name;
  })

  return newCard;

}

popupAdd.addEventListener('submit', function(evt){

  evt.preventDefault();
  const cardNew = createCard({ name: placeName.value, link: placeImage.value });
  elementsItem.prepend(cardNew);
  closePopup(popupAdd);
  evt.target.reset();
})