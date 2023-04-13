// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_field-name');
let jobInput = document.querySelector('.popup__input_field-text');
let popupWindow = document.querySelector('.popup');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileText.textContent = jobValue;
    popupWindow.classList.remove('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
let formButton = document.querySelector(".profile__edit-button");
formButton.addEventListener("click", popupOpen, false);
function popupOpen() {
    popupWindow.classList.add('popup_opened');
}
let popupCloseButton = document.querySelector(".popup__close-icon");
popupCloseButton.addEventListener("click", popupClose, false);
function popupClose() {
    popupWindow.classList.remove('popup_opened');
}