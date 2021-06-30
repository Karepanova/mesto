import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-сards.js';

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupCloseProfile = popupEditProfile.querySelector('.popup__close-profile');
const formEditProfile = document.querySelector('.popup__data[name=form1]');
const formNewCard = document.querySelector('.popup__data[name=form2]');
const popupInfoName = formEditProfile.querySelector('.popup__info_profile_name');
const popupInfoAbout = formEditProfile.querySelector('.popup__info_profile_about');
const title = document.querySelector('.profile__title');// Выберите элементы, куда должны быть вставлены значения полей
const subtitle = document.querySelector('.profile__subtitle');// Выберите элементы, куда должны быть вставлены значения полей
const addButton = content.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_new-card');
const popupCloseNewCard = popupNewCard.querySelector('.popup__close-new-card');
const popupInfoNaming = document.querySelector('.popup__info_naming'); //из инпута
const popupInfLink = document.querySelector('.popup__info_link');// из инпута
const popupImageCard = document.querySelector('.popup_image-card'); //попап картинка
const popupCloseImage = popupImageCard.querySelector('.popup__close-image');//закрыть попап картинку
const popupImg = document.querySelector('.popup__img'); //поле ссылка попап фото
const escKey = 27;

// функционал добавления класса к элементу modal
function openModal(modal) {
 document.addEventListener('keydown', handleEscUp); //
 modal.classList.add('popup_opened');
}

/*открывает форму редактирования профиля*/
function openProfileForm() {
 openModal(popupEditProfile); //вызов функции подставления класса открытия попапа
 /*при открытии, подтягивает данные со страницы в форму */
 popupInfoName.value = title.textContent;
 popupInfoAbout.value = subtitle.textContent;
}

/*открывает форму "добавить фото"*/
function openFormAddCard() {
 openModal(popupNewCard);//вызов функции подставления класса открытия попапа
 formNewCard.reset(); //чистит инпут
}

function closeModal(modal) {
 // функционал удаления класса элемента modal
 document.removeEventListener('keydown', handleEscUp);
 modal.classList.remove('popup_opened');
}

const handleEscUp = (event) => {
 if (event.keyCode === escKey) {
  const activePopup = document.querySelector('.popup_opened');
  closeModal(activePopup);
 }
};

/*сохраняет введенные в профиль данные*/
function submitEditForm(evt) {
 evt.preventDefault();//не отправлять форму
 title.textContent = popupInfoName.value;// вставка в профиль на странице из формы
 subtitle.textContent = popupInfoAbout.value;// вставка в профиль на странице из формы
 closeModal(popupEditProfile); //вызов функции удаления класса попап для закрытия;
}

function submitCardForm(evt) {
 evt.preventDefault();//не отправлять форму
 const element = {
  name: popupInfoNaming.value,
  link: popupInfLink.value
 };

 const card = new Card(element, '#elements-template');
 card.createCard();
 closeModal(popupNewCard);
}

/*обработчик событий*/
editButton.addEventListener('click', openProfileForm); /*ф-ция добавить класс*/
addButton.addEventListener('click', openFormAddCard); /*ф-ция добавить класс для формы с фото*/
popupCloseProfile.addEventListener('click', () => closeModal(popupEditProfile)); /*ф-ция удалить класс*/
popupCloseNewCard.addEventListener('click', () => closeModal(popupNewCard)); /*ф-ция удалить класс для формы с фото*/
popupCloseImage.addEventListener('click', () => closeModal(popupImg)); /*ф-ция удалить класс для формы с фото*/
formEditProfile.addEventListener('submit', submitEditForm); /*ф-ция отправки формы*/
formNewCard.addEventListener('submit', submitCardForm); /*ф-ция отправки формы*/
//Закрытие формы по клику на оверлей
popupEditProfile.addEventListener('mousedown', (event) => {
 //проверка - если клик по оверлею или по крестику, то закрывать попап
 if (event.target.classList.contains('popup_edit-profile') || event.target.classList.contains('popup__close-profile')) {
  closeModal(popupEditProfile);
 }
});

//Закрытие формы по клику на оверлей
popupNewCard.addEventListener('mousedown', (event) => {
 //проверка - если клик по оверлею или по крестику, то закрывать попап
 if (event.target.classList.contains('popup_new-card') || event.target.classList.contains('popup__close-new-card')) {
  closeModal(popupNewCard);
 }
});

//Закрытие формы по клику на оверлей
popupImageCard.addEventListener('mousedown', (event) => {
 //проверка - если клик по оверлею или по крестику, то закрывать попап
 if (event.target.classList.contains('popup_image-card') || event.target.classList.contains('popup__close-image')) {
  closeModal(popupImageCard);
 }
});




initialCards.forEach(function (element) {
 const card = new Card(element, '#elements-template');
 card.createCard();
});


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