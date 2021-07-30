import Popup from './Popup.js';


export default class PopupConfirm extends Popup {
 constructor(popupSelector, submitForm) {
  super(popupSelector);
  this._popupForm = this._popup.querySelector('.popup__data');
  this._submitForm = (evt) => {
   evt.preventDefault();
   submitForm(this._card);
  }
  this._popupButton = this._popup.querySelector('.popup__button');
 }

 setEventListeners() {
  super.setEventListeners();
  this._popupForm.addEventListener('submit', this._submitForm);
 }

 open(card) {
  this._card = card;
  super.open();
 }

 close() {
  super.close();
  this.save();
 }

 waitSave() {
  this._popupButton.textContent = 'Удаление...';
 }

 save() {
  this._popupButton.textContent = 'Да';
 }
}
