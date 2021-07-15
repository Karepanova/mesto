export class PopupWithForm extends Popup {
 constructor(popupSelector, submitForm) {
  super(popupSelector);
  this._popupForm = super._popupSelector.querySelector('.popup__data'); //dom элемент формы
  this._submitForm = submitForm; // колбэк ф-ция отправки формы
 }


//собирает данные всех полей формы.
 _getInputValues = () => {
  const inputList = super._popupSelector.querySelectorAll('.popup__info');
  const formValues = {};
  inputList.forEach(input => formValues[input.name] = input.value);
  return formValues;
 }


 _setEventListeners = () => {
  super._setEventListeners();
  this._popupForm.addEventListener('submit', this._submitForm); /*ф-ция отправки формы*/
 }

 close = () => {
  this._popupForm.reset(); //чистим форму
  super.close();
 }
}