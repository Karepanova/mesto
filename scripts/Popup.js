export default class Popup {
 constructor(popupSelector) {
  this._popupSelector = document.querySelector(popupSelector);
  this._escKey = 27;
 }

 open = () => {
  this._popupSelector.classList.add('popup_opened');
 } //открытие попапа


 close = () => {
  this._popupSelector.classList.remove('popup_opened');
 } // закрытие попапа


 _handleEscClose = (event) => {
  if (event.keyCode === this._escKey) {
   this.close();
  }
 } //содержит логику закрытия попапа клавишей Esc


 _setEventListeners = () => {
  this._popupSelector.addEventListener('mousedown', (evt) => {
   if (evt.target.classList.contains('popup_opened')) {
    this.close();
   }
   if (evt.target.classList.contains('popup__close-icon')) {
    this.close();
   }
  })
 } //добавляет слушатель клика иконке закрытия попапа
}

