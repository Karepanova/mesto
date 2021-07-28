import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../components/initial-сards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__data[name=profile-form-name]');
const formAvatarProfile = document.querySelector('.popup__data[name=edit-form-avatar]');
const popupInfoName = formEditProfile.querySelector('.popup__info_profile_name');
const popupInfoAbout = formEditProfile.querySelector('.popup__info_profile_about');
const popupInfoAvatar = formAvatarProfile.querySelector('.popup__info_avatar');

const addButton = content.querySelector('.profile__add-button');
const avatarWrapper = content.querySelector('.profile__avatar-wrapper');


//для валидатора
const config = {
 form: `.popup__data`,
 button: '.popup__button',
 buttonInvalid: 'popup__button_invalid',
 inputError: 'popup__info_error'
};


//создание экземпляра класса - открытие картинки
const popupImg = new PopupWithImage('.popup_image-card');
popupImg.setEventListeners();

//экземпляр класса - делает форму добавления карточки
/*const popupNewForm = new PopupWithForm('.popup_new-card', (evt) => {
 evt.preventDefault();//не отправлять форму
 const item = popupNewForm.getInputValues();
 const insertCard = createCard(item);
 cardsList.addItem(insertCard);
 popupNewForm.close();
});
popupNewForm.setEventListeners();*/

//информация о профиле
const userInfo = new UserInfo({
 profileName: '.profile__title',
 profileAbout: '.profile__subtitle',
 profileAvatar: '.profile__avatar'
});


//эксепляр класса - форма редактирования профиля
const popupProfileForm = new PopupWithForm('.popup_edit-profile', (evt) => {
 evt.preventDefault();//не отправлять форму
 const formData = popupProfileForm.getInputValues();
 api.editUserProfile(formData).then((data) => {
  userInfo.setUserInfo(data);//вставляет данные из формы на страницу
  popupProfileForm.close();
 })
});
popupProfileForm.setEventListeners();

//экземпляр class Section - отвечает за отрисовку элементов на странице
/*const cardsList = new Section({
 items: initialCards,
 renderer: (item) => {
  const insertCard = createCard(item);
  cardsList.addItem(insertCard);
 }
}, '.elements');
cardsList.initialItems();*/

const validatorAddForm = new FormValidator(config, document.querySelector('.popup__data[name=add-card-form-name]'));
validatorAddForm.enableValidation();
const validatorEditForm = new FormValidator(config, document.querySelector('.popup__data[name=profile-form-name]'));
validatorEditForm.enableValidation();
const validatorAvatarForm = new FormValidator(config, document.querySelector('.popup__data[name=edit-form-avatar]'));
validatorAvatarForm.enableValidation();

//ф-ция открывает форму добавления карточки
/*addButton.addEventListener('click', openAddCardForm);*/

//открывает форму редактирования профиля
editButton.addEventListener('click', openProfileForm);


//эксепляр класса - форма редактирования аватара
const popupAvatarForm = new PopupWithForm('.popup__avatar-form', (evt) => {
 evt.preventDefault();//не отправлять форму
 const formData = popupAvatarForm.getInputValues();
 api.editAvatar(formData).then((data) => {
  userInfo.setUserInfo(data);//вставляет данные из формы на страницу
  popupAvatarForm.close();
 })
});
popupAvatarForm.setEventListeners();

//открывает форму редактирования аватара
avatarWrapper.addEventListener('click', openAvatarForm);

function openAvatarForm() {
 //дергаем объект с данными пользователя
 const userInfoData = userInfo.getUserInfo();
 popupInfoAvatar.value = userInfoData.avatar; //вставка с шапки в форму
 validatorAvatarForm.setSubmitButtonState();
 popupAvatarForm.open();
}


//эксепляр класса - форма подтверждения
const popupConfirm = new PopupConfirm('.popup_confirm', (card) => {
 api.delCard(card._id)
  .then(() => {
   card._element.remove();
  })
});
popupConfirm.setEventListeners();


//возвращает карточку
/*function createCard(item) {
 const card = new Card(item, '#elements-template', (name, link) => {
  popupImg.open(name, link);
 });
 return card.createCard();
}*/

//ф-я открытия формы добавления карточки
/*function openAddCardForm() {
 validatorAddForm.setSubmitButtonState();
 popupNewForm.open();
}*/

//ф-я открытия формы редактирования профиля
function openProfileForm() {
 //дергаем объект с данными пользователя
 const userInfoData = userInfo.getUserInfo();
 popupInfoName.value = userInfoData.name; //вставка с шапки в форму
 popupInfoAbout.value = userInfoData.about; //вставка с шапки в форму
 popupProfileForm.open();
}


const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
   authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
   'Content-Type': 'application/json'
  }
 }
)
//Загрузка информации о пользователе с сервера - промис
const getUserData = api.getUserData();

getUserData.then((data) => {
  userInfo.setUserInfo(data);
 }
);


//получение карточек промис
const getArrayCards = api.getArrayCards();


getArrayCards.then((cards) => {
 //открытие формы + добавление карточки
 const popupNewForm = new PopupWithForm('.popup_new-card', (evt) => {
  evt.preventDefault();//не отправлять форму
  const item = popupNewForm.getInputValues();


  const addNewCard = api.addNewCard(item);
  addNewCard.then((card) => {
   const insertCard = createCard(card);
   cardsList.addItem(insertCard);
  })


  popupNewForm.close();
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
 addButton.addEventListener('click', openAddCardForm);

//ф-я открытия формы добавления карточки
 function openAddCardForm() {
  validatorAddForm.setSubmitButtonState();
  popupNewForm.open();
 }

 //возвращает карточку
 function createCard(item) {
  const card = new Card(item, '#elements-template',
   (name, link) => {
    popupImg.open(name, link);
   },
   (cardId) => {
    return api.likeCard(cardId);
   },
   (cardId) => {
    return api.delLikeCard(cardId);
   },
   (card) => {
    popupConfirm.open(card);
   }
  );
  return card.createCard();
 }

})


//проба
/*const abc = {
 name: 'Сова',
 link: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80'
}*/


