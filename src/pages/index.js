import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import * as consts from '../utils/constants.js';

//создание экземпляра класса - открытие картинки
const popupImg = new PopupWithImage('.popup_image-card');
popupImg.setEventListeners();

//информация о профиле
const userInfo = new UserInfo({
 profileName: '.profile__title',
 profileAbout: '.profile__subtitle',
 profileAvatar: '.profile__avatar'
});

const api = new Api({
 address: 'https://mesto.nomoreparties.co/v1/cohort-26',
 headers: {
  authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
  'Content-Type': 'application/json'
 }
})


const validatorAddForm = new FormValidator(consts.config, document.querySelector('.popup__data[name=add-card-form-name]'));
validatorAddForm.enableValidation();
const validatorEditForm = new FormValidator(consts.config, document.querySelector('.popup__data[name=profile-form-name]'));
validatorEditForm.enableValidation();
const validatorAvatarForm = new FormValidator(consts.config, document.querySelector('.popup__data[name=edit-form-avatar]'));
validatorAvatarForm.enableValidation();


//эксепляр класса - форма редактирования профиля
const popupProfileForm = new PopupWithForm('.popup_edit-profile', (evt) => {
 evt.preventDefault();//не отправлять форму
 const formData = popupProfileForm.getInputValues();
 api.editUserProfile(formData)
  .then((data) => {
   userInfo.setUserInfo(data);//вставляет данные из формы на страницу
   popupProfileForm.close();
  })
  .catch((err) => {
   console.log(`Ошибка сервера ${err}`)
  });
});
popupProfileForm.setEventListeners();

//открывает форму редактирования профиля
consts.editButton.addEventListener('click', openProfileForm);

//ф-я открытия формы редактирования профиля
function openProfileForm() {
 //дергаем объект с данными пользователя
 const userInfoData = userInfo.getUserInfo();
 consts.popupInfoName.value = userInfoData.name; //вставка с шапки в форму
 consts.popupInfoAbout.value = userInfoData.about; //вставка с шапки в форму
 popupProfileForm.open();
}


//эксепляр класса - форма редактирования аватара
const popupAvatarForm = new PopupWithForm('.popup_avatar-form', (evt) => {
 evt.preventDefault();//не отправлять форму
 const formData = popupAvatarForm.getInputValues();
 api.editAvatar(formData).then((data) => {
  userInfo.setUserInfo(data);//вставляет данные из формы на страницу
  popupAvatarForm.close();
 })
  .catch((err) => {
   console.log(`Ошибка сервера ${err}`)
  });
});
popupAvatarForm.setEventListeners();

//открывает форму редактирования аватара
consts.avatarWrapper.addEventListener('click', openAvatarForm);

function openAvatarForm() {
 validatorAvatarForm.setSubmitButtonState();
 popupAvatarForm.open();
}

//эксепляр класса - форма подтверждения
const popupConfirm = new PopupConfirm('.popup_confirm', (card) => {
 popupConfirm.waitSave();
 api.delCard(card.getId())
  .then(() => {
   card.removeElement();
   popupConfirm.close();
  })
  .catch((err) => {
   console.log(`Ошибка сервера ${err}`)
  });
});
popupConfirm.setEventListeners();


//1. Загрузка информации о пользователе с сервера - промис
const getUserData = api.getUserData();
//2. получение карточек промис
const getArrayCards = api.getArrayCards();
//3. промис - элемент массива (Promise.all), поэтому для него отдельно кэтч прописываем
getUserData
 .catch((err) => {
  console.log(`Ошибка сервера ${err}`)
 });
//4. промис - элемент массива (Promise.all), поэтому для него отдельно кэтч прописываем
getArrayCards
 .catch((err) => {
  console.log(`Ошибка сервера ${err}`)
 });
//5.  массив промисов - ожидание исполения помисов
const arrPromises = [getUserData, getArrayCards];
const promiseAll = Promise.all(arrPromises);
promiseAll.then(([userData, cards]) => {
 userInfo.setUserInfo(userData);
 //открытие формы + добавление карточки
 const popupNewForm = new PopupWithForm('.popup_new-card', (evt) => {
  evt.preventDefault();//не отправлять форму
  const item = popupNewForm.getInputValues();
  const addNewCard = api.addNewCard(item);
  addNewCard
   .then((card) => {
    const insertCard = createCard(card);
    cardsList.addItem(insertCard);
    popupNewForm.close();
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 });
 popupNewForm.setEventListeners();

 //отрисовываем полученые карточки
 const cardsList = new Section({
  items: cards,
  renderer: (item) => {
   const insertCard = createCard(item);
   cardsList.addItem(insertCard);
  }
 }, '.elements');
 cardsList.initialItems();

//ф-ция открывает форму добавления карточки
 consts.addButton.addEventListener('click', openAddCardForm);

 //ф-я открытия формы добавления карточки
 function openAddCardForm() {
  validatorAddForm.setSubmitButtonState();
  popupNewForm.open();
 }

 //возвращает карточку
 function createCard(item) {
  const card = new Card(userData._id, item, '#elements-template',
   {
    handleCardClick: (name, link) => {
     popupImg.open(name, link);
    },
    handleLikeClick: (cardId) => {
     return api.likeCard(cardId);
    },
    handleDeleteLikeClick: (cardId) => {
     return api.delLikeCard(cardId);
    },
    handleDeleteCardClick: (card) => {
     popupConfirm.open(card);
    }
   }
  );
  return card.createCard();
 }
})