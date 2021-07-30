import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
 constructor(popupSelector, submitForm) {
  super(popupSelector);
  this._popupForm = this._popup.querySelector('.popup__data');
  // колбэк ф-ция отправки формы
  this._submitForm = (evt) => {
   this.waitSave();
   submitForm(evt);
  };
  this._popupButton = this._popup.querySelector('.popup__button');
  this._inputList = this._popup.querySelectorAll('.popup__info');
 }

//собирает данные всех полей формы.
 getInputValues() {

  const formValues = {};
  this._inputList.forEach(input => formValues[input.name] = input.value);
  return formValues;
 }

 setEventListeners() {
  super.setEventListeners();
  this._popupForm.addEventListener('submit', this._submitForm);
 }

 //чистим форму
 close() {
  this._popupForm.reset();
  super.close();
  this.save();
 }

 waitSave() {
  this._popupButton.textContent = 'Сохранение...';
 }

 save() {
  this._popupButton.textContent = 'Сохранить';
 }

}