import Popup from './Popup.js';


export default class PopupConfirm extends Popup {
 constructor(popupSelector, submitForm) {
  super(popupSelector);
  this._popupSelector = document.querySelector(popupSelector);
  this._popupForm = this._popupSelector.querySelector('.popup__data');
  this._submitForm = (evt) => {
   evt.preventDefault();
   submitForm(this._card);
   this.close();
  }
 }

 setEventListeners() {
  super.setEventListeners();
  this._popupForm.addEventListener('submit', this._submitForm);
 }

 open(card) {
  this._card = card;
  super.open();
 }

}
