import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
 constructor(popupSelector, submitForm) {
  super(popupSelector);
  this._popupSelector = document.querySelector(popupSelector);
  this._popupForm = this._popupSelector.querySelector('.popup__data');
  this._submitForm = submitForm; // колбэк ф-ция отправки формы
 }

//собирает данные всех полей формы.
 _getInputValues() {
  const inputList = this._popupSelector.querySelectorAll('.popup__info');
  const formValues = {};
  inputList.forEach(input => formValues[input.name] = input.value);
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
  this._popupForm.removeEventListener('submit', this._submitForm);
 }
}