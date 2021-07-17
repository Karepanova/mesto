import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../components/initial-сards.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__data[name=form1]');
const popupInfoName = formEditProfile.querySelector('.popup__info_profile_name');
const popupInfoAbout = formEditProfile.querySelector('.popup__info_profile_about');
const addButton = content.querySelector('.profile__add-button');



//экземпляр class Section - отвечает за отрисовку элементов на странице
const cardsList = new Section({
 items: initialCards,
 renderer: (item) => {
  const card = new Card(item, '#elements-template', (name, link) => {
   const popupImg = new PopupWithImage('.popup_image-card');
   popupImg.setEventListeners();
   popupImg.open(name, link);
  });
  const insertCard = card.createCard();
  cardsList.addItem(insertCard);
 }
}, '.elements');
cardsList.initialItems();


//ф-ция открывает форму добавления карточки
addButton.addEventListener('click', openAddCardForm);

function openAddCardForm() {
 const popupForm = new PopupWithForm('.popup_new-card', (evt) => {
  evt.preventDefault();//не отправлять форму

  const item = popupForm._getInputValues();

  const card = new Card(item, '#elements-template', (name, link) => {
   const popupImg = new PopupWithImage('.popup_image-card');
   popupImg.setEventListeners();
   popupImg.open(name, link);
  });
  const insertCard = card.createCard();

  cardsList.addItem(insertCard);

  popupForm.close();
 });
 popupForm.setEventListeners();
 popupForm.open();
}


const userInfo = new UserInfo({
 profileName: '.profile__title',
 profileAbout: '.profile__subtitle'
});

//открывает форму редактирования профиля
editButton.addEventListener('click', openProfileForm);

function openProfileForm() {

 //дергаем объект с данными пользователя
 const userInfoData = userInfo.getUserInfo();
 popupInfoName.value = userInfoData.name; //вставка с шапки в форму
 popupInfoAbout.value = userInfoData.about; //вставка с шапки в форму

 const popupForm = new PopupWithForm('.popup_edit-profile', (evt) => {
  evt.preventDefault();//не отправлять форму
  const formData = popupForm._getInputValues();
  userInfo.setUserInfo(formData); //вставляет данные из формы на страницу
  popupForm.close();
 });
 popupForm.setEventListeners();
 popupForm.open();
}



//для валидатора
const config = {
 form: `.popup__data`,
 button: '.popup__button',
 buttonInvalid: 'popup__button_invalid',
 inputError: 'popup__info_error'
};
const forms = [
 '.popup__data[name="form1"]',
 '.popup__data[name="form2"]'
];

forms.forEach(function (form) {
 const validator = new FormValidator(config, document.querySelector(form));
 validator.enableValidation();
});