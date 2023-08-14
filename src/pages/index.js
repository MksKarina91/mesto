import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import {
  enableConfig,
  profileText,
  profileName,
  formValidators,
  profileEditButton,
  addButton,
  profileAvatar,
  buttonSaveNewElement,
  buttonUpdateButton,
  buttonChangeAvatar,
} from "../components/utils/constants.js";
import { Api } from "../components/Api.js";
import { renderLoading } from "../components/utils/utils.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-72",
  headers: {
    authorization: "705c00be-ed34-4118-b41b-e0ee6e452cf1",
    "Content-Type": "application/json",
  },
});

function handleProfileFormSubmit(data) {
  renderLoading(true, "Сохранение...", buttonUpdateButton);
  api
    .editUserInfo(data)
    .then(() => {
      profileCard.setUserInfo(data);
    })
    .then(() => {
      popupProfile.close();
    })
    .catch((err) => console.log(`Ошибка в отправке данных профиля: ${err}`))
    .finally(() => {
      renderLoading(false, "Сохранить", buttonUpdateButton);
    });
}



profileEditButton.addEventListener("click", () => {
  popupProfile.open();
  formValidators["profileForm"].resetValidation();
  const dataProfile = profileCard.getUserInfo();
  profileName.value = dataProfile.name;
  profileText.value = dataProfile.about;
});

addButton.addEventListener("click", function () {
  popupAddImage.open();
  formValidators["cardForm"].resetValidation();
});

function createCard(item) {
  const newCard = new Card(
    item,
    "#element__template",
    handleCardClick,
    () => {
      removePopup.open(newCard, newCard._id);
    },
    likeCard,
    dislikeCard,
    myId
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}


function likeCard(likeCount, id) {
  api
    .addLike(id)
    .then(() => {
      this.updateLikes(likeCount);
    })
    .catch((err) => {
      console.log(err);
    })
}

function dislikeCard(likeCount, id) {
  api
    .deleteLike(id)
    .then(() => {
      this.updateLikes(likeCount);
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleCardClick(name, link) {
  popupTypePreview.open(name, link);
}

const profileCard = new UserInfo({
  selectorProfileName: ".profile__name",
  selectorProfileText: ".profile__text",
  selectorProfileAvatar: ".profile__avatar",
});

const popupAddImage = new PopupWithForm(
  ".popup_type_image",
  handleCardSubmit,
  ".popup__form_add-element"
);
popupAddImage.setEventListeners();

const popupProfile = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit,
  ".popup__form"
);
popupProfile.setEventListeners();

const popupChangeAvatar = new PopupWithForm(
  ".popup_avatar_change",
  handleAvatarSubmit,
  ".popup__form_avatar_change"
);
popupChangeAvatar.setEventListeners();

const removePopup = new PopupWithConfirm(
  ".popup_remove-card",
  ".popup__button-delete",
  handleDeleteCard
);
removePopup.setEventListeners();

const popupTypePreview = new PopupWithImage(".popup_type_preview");
popupTypePreview.setEventListeners();


const cardsList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
    },
  },
  ".element"
);

function handleCardSubmit(data) {
  renderLoading(true, "Создание...", buttonSaveNewElement);
  api
    .postNewCard(data)
    .then((res) => {
      cardsList.addItem(createCard(res));
    })
    .then(() => {
      popupAddImage.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, "Создать", buttonSaveNewElement);
    });
}
let myId;

const getCards = () => {
  return api
    .getInitialCards()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
};

const getCurrentUserInfo = () => {
  return api
    .getUserInfo()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
};

function handleAvatarSubmit(data) {
  renderLoading(true, "Сохранение...", buttonChangeAvatar);
  api
    .changeAvatar(data)
    .then((res) => {
      profileCard.setUserAvatar(res);
    })
    .then(() => {
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, "Сохранить", buttonChangeAvatar);
    });
}

function handleDeleteCard(card, cardId) {
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteCard();
    })
    .then(() => {
      removePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

const promises = [getCards(), getCurrentUserInfo()];
Promise.all(promises)
  .catch((err) => {
    console.log(err);
  })
  .then(([cards, userInfo, likes]) => {
    myId = userInfo._id;
    profileCard.setUserInfo(userInfo);
    profileCard.setUserAvatar(userInfo);
    cardsList.renderItems(cards);
  });

profileAvatar.addEventListener("click", () => {
  popupChangeAvatar.open();
  formValidators["formAvatar"].resetValidation();
});

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
