//создаёт карточку с текстом и ссылкой на изображение
class Card {

 constructor(data, cardSelector) {
  this._link = data.link;
  this._name = data.name;
  this._cardSelector = cardSelector;
  this._escKey = 27;
 }

 _renderCard = () => {
  const initialElement = document.querySelector(this._cardSelector).content.cloneNode(true); /*клонирует карточку*/
  initialElement.querySelector('.element__text').textContent = this._name; /*тянет в клон текст*/
  const elementImg = initialElement.querySelector('.element__img');
  elementImg.src = this._link; /*тянет в клон ссылку*/
  elementImg.alt = this._name;
  this._setCardEventListeners(initialElement); //вызфвает ф-цию с обработчиками событий
  return initialElement;
 }

 /*назначение событий*/
 _setCardEventListeners = (element) => {
  /*нажатие корзинка удалить вызывается ф-ция удаления блока*/
  element.querySelector('.profile__delete').addEventListener('click', this._handleDelete);
  /*нажатие сердечка вызывает функцию поставления класса*/
  element.querySelector('.element__button').addEventListener('click', this._handleLike);
  /*ф-ция добавить класс для поп открытия картинки*/
  element.querySelector('.element__img').addEventListener('click', this._openImgPopup);
 }

 /*удаляет карточку*/
 _handleDelete = (event) => {
  event.target.closest('.element').remove();
 }

 _handleLike = (event) => {
  event.target.classList.toggle('element__button_active');
 }

 _openImgPopup = (event) => {
  this._openModal(document.querySelector('.popup_image-card'));//вызов функции подставления класса открытия попапа
  const popupImg = document.querySelector('.popup__img');
  popupImg.src = event.target.src;  //записывает ссылку
  //ищем родителя, от родителя ищем текст
  const name = event.target.closest('.element').querySelector('.element__text').textContent;
  popupImg.alt = name; //записывает альт
  document.querySelector('.popup__img-signature').textContent = name; //записывает текст
 }

 _openModal = (modal) => {
  document.addEventListener('keydown', this._handleEscUp);
  modal.classList.add('popup_opened');
 }

 _handleEscUp = (event) => {
  if (event.keyCode === this._escKey) {
   const activePopup = document.querySelector('.popup_opened');
   this._closeModal(activePopup);
  }
 }

 _closeModal = (modal) => {
  // функционал удаления класса элемента modal
  document.removeEventListener('keydown', this._handleEscUp);
  modal.classList.remove('popup_opened');
 }

 createCard = () => {
  const card = this._renderCard();
  document.querySelector('.elements').prepend(card);
 }

}




initialCards.forEach(function (element) {
 const card = new Card(element, '#elements-template');
 card.createCard();
});


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
const popupImgSignature = document.querySelector('.popup__img-signature');//поле текст попап фото
const elementsList = document.querySelector('.elements'); //блок в котором будут клонируемые карточки
const elementsTemplate = document.querySelector('#elements-template').content; //000
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

/*открывает изображение*/
/*function openImgPopup(event) {
 openModal(popupImageCard);//вызов функции подставления класса открытия попапа
 popupImg.src = event.target.src;  //записывает ссылку
 //ищем родителя, от родителя ищем текст
 const name = event.target.closest('.element').querySelector('.element__text').textContent;
 popupImg.alt = name; //записывает альт
 popupImgSignature.textContent = name; //записывает текст
}*/


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

 const card = renderCard(element);
 createCard(card);
 closeModal(popupNewCard);
}

/*создает из шаблона -  карточки с данными из массива*/
/*function renderCard(element) {
 const initialElement = elementsTemplate.cloneNode(true); /!*клонирует карточку*!/
 initialElement.querySelector('.element__text').textContent = element.name; /!*тянет в клон текст*!/
 const elementImg = initialElement.querySelector('.element__img');
 elementImg.src = element.link; /!*тянет в клон ссылку*!/
 elementImg.alt = element.name;
 setCardEventListeners(initialElement); //вызфвает ф-цию с обработчиками событий
 return initialElement;
}*/

//вставляет клонируемые карточки в блок в начало
/*
function createCard(card) {
 elementsList.prepend(card);
}
*/



/*обрабатывает создание всех карточек из массива*/
/*(function renderItems() {
 initialCards.forEach(function (element) {
  const card = renderCard(element);
  createCard(card);
 }); //применяется к каждому элементу массива
})() /!*самовызывающаяся функция*!/

/*удаляет карточку*/
/*function handleDelete(event) {
 event.target.closest('.element').remove();
}

/*подставляет класс с фото черный лайк*/
/*function handleLike(event) {
 event.target.classList.toggle('element__button_active');
}*/

/*назначение событий*/
/*function setCardEventListeners(element) {
 /!*нажатие корзинка удалить вызывается ф-ция удаления блока*!/
 element.querySelector('.profile__delete').addEventListener('click', handleDelete);
 /!*нажатие сердечка вызывает функцию поставления класса*!/
 element.querySelector('.element__button').addEventListener('click', handleLike);
 /!*ф-ция добавить класс для поп открытия картинки*!/
 element.querySelector('.element__img').addEventListener('click', openImgPopup);
}*/

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

