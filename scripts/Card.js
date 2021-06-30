//создаёт карточку с текстом и ссылкой на изображение
export class Card {

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