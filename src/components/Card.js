//создаёт карточку с текстом и ссылкой на изображение
export default class Card {

 constructor(myId, data, cardSelector, {
  handleCardClick,
  handleLikeClick,
  handleDeleteLikeClick,
  handleDeleteCardClick
 }) {
  this._link = data.link;
  this._name = data.name;
  this._likes = data.likes;
  this._id = data._id;
  this._ownerId = data.owner._id;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
  this._handleLikeClick = handleLikeClick;
  this._handleDeleteLikeClick = handleDeleteLikeClick;
  this._handleDeleteCardClick = handleDeleteCardClick;
  this._myId = myId;

 }

 //клонирование карточки из темплейта
 _getTemplate() {
  return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
 }


 //создание и наполнение карточки
 _renderCard() {
  this._element = this._getTemplate();
  this._elementButton = this._element.querySelector('.element__button');
  this._element.querySelector('.element__text').textContent = this._name; /*тянет в клон текст*/
  const elementImg = this._element.querySelector('.element__img');

  elementImg.src = this._link; /*тянет в клон ссылку*/
  elementImg.alt = this._name;
  this._countLikes(); //считаем лайки
  this._setCardEventListeners(this._element); //вызфвает ф-цию с обработчиками событий
  this._likeMark(); //жирный лайк или нет
  this._presenceBasket(); //есть корзинка или нет
  return this._element;
 }

 /*назначение событий*/
 _setCardEventListeners(element) {
  /*нажатие корзинка удалить вызывается ф-ция удаления блока*/
  element.querySelector('.profile__delete').addEventListener('click', this._handleDelete.bind(this));
  /*нажатие сердечка вызывает функцию поставления класса*/
  element.querySelector('.element__button').addEventListener('click', this._handleLike.bind(this));
  /*ф-ция добавить класс для попап открытия картинки*/
  element.querySelector('.element__img').addEventListener('click', () => {
   this._handleCardClick(this._name, this._link);
  });
 }


 /*удаляет карточку*/
 _handleDelete() {
  this._handleDeleteCardClick(this);
 }

 //лайк
 _handleLike(event) {
  if (event.target.classList.contains('element__button_active')) {
   this._handleDeleteLikeClick(this._id)
    .then((card) => {
     this._likes = card.likes;
     this._likeMark();
     this._countLikes();
    })
    .catch((err) => {
     console.log(`Ошибка сервера ${err}`)
    });
  } else {
   this._handleLikeClick(this._id)
    .then((card) => {
     this._likes = card.likes;
     this._likeMark();
     this._countLikes();
    })
    .catch((err) => {
     console.log(`Ошибка сервера ${err}`)
    });
  }
 }

 _likeMark() {
  const arrId = this._likes.filter((val) => {
   return val._id === this._myId;
  })

  if (arrId.length > 0) {
   this._elementButton.classList.add('element__button_active');
  } else {
   this._elementButton.classList.remove('element__button_active');
  }
 }

 owner

 _presenceBasket() {
  if (this._myId !== this._ownerId) {
   this._element.querySelector('.profile__delete').remove();
  }
 }


 _countLikes() {
  this._element.querySelector('.element__count-likes').textContent = this._likes.length;
 }

 //возвращаем карточку
 createCard() {
  return this._renderCard();
 }

 //удаление дом-элемента
 removeElement() {
  this._element.remove();
 }

 getId() {
  return this._id;
 }

}