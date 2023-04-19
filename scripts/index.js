// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_field_name');
let jobInput = document.querySelector('.popup__input_field_text');
let popupWindow = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let popupCloseButton = document.querySelector(".popup__close-icon");
let formButton = document.querySelector(".profile__edit-button");
formElement.addEventListener('submit', handleFormSubmit);
formButton.addEventListener("click", popupOpen);
function popupOpen() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
    popupWindow.classList.add('popup_opened');
}
popupCloseButton.addEventListener("click", popupClose);
function popupClose() {
    popupWindow.classList.remove('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    popupClose();
}
