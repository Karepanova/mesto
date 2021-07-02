import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-сards.js';

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = document.querySelector('.popup__data[name=form1]');
const formNewCard = document.querySelector('.popup__data[name=form2]');
const popupInfoName = formEditProfile.querySelector('.popup__info_profile_name');
const popupInfoAbout = formEditProfile.querySelector('.popup__info_profile_about');
const title = document.querySelector('.profile__title');// Выберите элементы, куда должны быть вставлены значения полей
const subtitle = document.querySelector('.profile__subtitle');// Выберите элементы, куда должны быть вставлены значения полей
const addButton = content.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_new-card');
const popupInfoNaming = document.querySelector('.popup__info_naming'); //из инпута
const popupInfLink = document.querySelector('.popup__info_link');// из инпута
const popups = document.querySelectorAll('.popup');
const popupImageCard = document.querySelector('.popup_image-card'); //попап картинка
const popupImg = document.querySelector('.popup__img');
const popupImgSignature = document.querySelector('.popup__img-signature');
const escKey = 27;


function handleCardClick(name, link) {
 //устанавливаем ссылку
 popupImg.src = link;
 popupImg.alt = name;
 //устанавливаем подпись картинке
 popupImgSignature.textContent = name;
 //открываем попап
 openModal(popupImageCard);
}

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
 const insertCard = createCard(element);
 document.querySelector('.elements').prepend(insertCard);
 closeModal(popupNewCard);
}


/*обработчик событий*/
editButton.addEventListener('click', openProfileForm); /*ф-ция добавить класс*/
addButton.addEventListener('click', openFormAddCard); /*ф-ция добавить класс для формы с фото*/
formEditProfile.addEventListener('submit', submitEditForm); /*ф-ция отправки формы*/
formNewCard.addEventListener('submit', submitCardForm); /*ф-ция отправки формы*/


popups.forEach((popup) => {
 popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
   closeModal(popup);
  }
  if (evt.target.classList.contains('popup__close-icon')) {
   closeModal(popup);
  }
 })
})

//вставка из массива экзепляров карточек
initialCards.forEach(function (element) {
 const insertCard = createCard(element);
 document.querySelector('.elements').prepend(insertCard);
});

//создает экземпляр класса и возвращает карточку
function createCard(element) {
 const card = new Card(element, '#elements-template', handleCardClick);
 return card.createCard();
}

/*
function createCard(element) {
 const card = new Card(element, '#elements-template', handleCardClick);
 const insertCard = card.createCard();
 document.querySelector('.elements').prepend(insertCard);
 return card;
}
*/

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