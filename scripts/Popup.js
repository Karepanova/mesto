export default class Popup {
 constructor(popupSelector){
this._popupSelector = popupSelector;
 }

 open(modal){
  document.addEventListener('keydown', this._handleEscClose);
  modal.classList.add('popup_opened');
 } //открытие попапа


 close(modal){
  document.removeEventListener('keydown', this._handleEscClose);
  modal.classList.remove('popup_opened');
 } // закрытие попапа


 _handleEscClose = (event) => {
 if (event.keyCode === escKey) {
 const activePopup = document.querySelector('.popup_opened');
  close(activePopup);
}
}; //содержит логику закрытия попапа клавишей Esc


 _setEventListeners(popup){
  popup.addEventListener('mousedown', (evt) => {
   if (evt.target.classList.contains('popup_opened')) {
    close(popup);
   }
   if (evt.target.classList.contains('popup__close-icon')) {
    close(popup);
   }
  })
 } //добавляет слушатель клика иконке закрытия попапа
}

