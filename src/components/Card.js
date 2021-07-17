//создаёт карточку с текстом и ссылкой на изображение
export default class Card {

 constructor(data, cardSelector, handleCardClick) {
  this._link = data.link;
  this._name = data.name;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
 }

 _renderCard() {
  const initialElement = document.querySelector(this._cardSelector).content.cloneNode(true); /*клонирует карточку*/
  initialElement.querySelector('.element__text').textContent = this._name; /*тянет в клон текст*/
  const elementImg = initialElement.querySelector('.element__img');
  elementImg.src = this._link; /*тянет в клон ссылку*/
  elementImg.alt = this._name;
  this._setCardEventListeners(initialElement); //вызфвает ф-цию с обработчиками событий
  return initialElement;
 }

 /*назначение событий*/
 _setCardEventListeners(element) {
  /*нажатие корзинка удалить вызывается ф-ция удаления блока*/
  element.querySelector('.profile__delete').addEventListener('click', this._handleDelete);
  /*нажатие сердечка вызывает функцию поставления класса*/
  element.querySelector('.element__button').addEventListener('click', this._handleLike);
  /*ф-ция добавить класс для попап открытия картинки*/
  element.querySelector('.element__img').addEventListener('click', () => {
   this._handleCardClick(this._name, this._link);
  });
 }

 /*удаляет карточку*/
 _handleDelete(event) {
  event.target.closest('.element').remove();
 }

 _handleLike(event) {
  event.target.classList.toggle('element__button_active');
 }


 //возвращаем карточку
 createCard() {
  return this._renderCard();
 }
}