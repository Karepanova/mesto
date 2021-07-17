export default class Popup {
 constructor(popupSelector) {
  this._popupSelector = document.querySelector(popupSelector);
  this._escKey = 27;
  //this.setEventListeners();
 }

 //открытие попапа
 open() {
  this._popupSelector.classList.add('popup_opened');
 }


 // закрытие попапа
 close() {
  this._popupSelector.classList.remove('popup_opened');
  //слушатель на нажатие кнопки
  document.removeEventListener('keydown', this._handleEscClose);
 }


 //содержит логику закрытия попапа клавишей Esc
 _handleEscClose(event) {
  if (event.keyCode === this._escKey) {
   this.close();
  }
 }

//добавляет слушатель клика иконке закрытия попапа
 setEventListeners() {
  //слушатель на клик мышки
  this._popupSelector.addEventListener('mousedown', (evt) => {
   if (evt.target.classList.contains('popup_opened')) {
    this.close();
   }
   if (evt.target.classList.contains('popup__close-icon')) {
    this.close();
   }
  })

  //слушатель на нажатие кнопки
  document.addEventListener('keydown', this._handleEscClose.bind(this));
 }
}