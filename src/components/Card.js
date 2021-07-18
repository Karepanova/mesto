//создаёт карточку с текстом и ссылкой на изображение
export default class Card {

 constructor(data, cardSelector, handleCardClick) {
  this._link = data.link;
  this._name = data.name;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
 }

 //клонирование карточки из темплейта
 _getTemplate() {
  return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
 }


 //создание и наполнение карточки
 _renderCard() {
  this._element = this._getTemplate();
  this._element.querySelector('.element__text').textContent = this._name; /*тянет в клон текст*/
  const elementImg = this._element.querySelector('.element__img');
  elementImg.src = this._link; /*тянет в клон ссылку*/
  elementImg.alt = this._name;
  this._setCardEventListeners(this._element); //вызфвает ф-цию с обработчиками событий
  return this._element;
 }

 /*назначение событий*/
 _setCardEventListeners(element) {
  /*нажатие корзинка удалить вызывается ф-ция удаления блока*/
  element.querySelector('.profile__delete').addEventListener('click', this._handleDelete.bind(this));
  /*нажатие сердечка вызывает функцию поставления класса*/
  element.querySelector('.element__button').addEventListener('click', this._handleLike);
  /*ф-ция добавить класс для попап открытия картинки*/
  element.querySelector('.element__img').addEventListener('click', () => {
   this._handleCardClick(this._name, this._link);
  });
 }


 /*удаляет карточку*/
 _handleDelete() {
  this._element.remove();
 }

 //лайк
 _handleLike(event) {
  event.target.classList.toggle('element__button_active');
 }


 //возвращаем карточку
 createCard() {
  return this._renderCard();
 }
}