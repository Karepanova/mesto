//настраивает валидацию полей формы
export class FormValidator {
 constructor(config, form) {
  this._config = config;
  this._form = form;
  this._button = this._form.querySelector(this._config.button);
 }

 enableValidation = () => {
  this._form.addEventListener('submit', this._handleFormSubmit); //слушатель на сабмит
  this._form.addEventListener('input', this._handleFormInput); //проверяет что вводим
 }

 _handleFormSubmit = (event) => {
  event.preventDefault(); //не отправляет форму

  const isValid = this._form.checkValidity();
  if (isValid) {
   this._form.reset();
   this._setSubmitButtonState();
  }
 }

 _handleFormInput = (event) => {
  const input = event.target; // отправил событие

  // показываем тексты ошибок пользователям
  this._setFieldError(input);
  this._setInputError(input);
  // активируем или деактивируем кнопку
  this._setSubmitButtonState();
 }

 _setFieldError = (input) => {
  const span = this._form.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
 }

 _setSubmitButtonState = () => {
  const isValid = this._form.checkValidity();

  if (isValid) {
   this._button.classList.remove(this._config.buttonInvalid);
   this._button.removeAttribute('disabled')
  } else {
   this._button.classList.add(this._config.buttonInvalid);
   this._button.setAttribute('disabled', 'disabled')
  }
 }

 _setInputError = (input) => {
  if (input.validity.valid) {
   input.classList.remove(this._config.inputError);
  } else {
   input.classList.add(this._config.inputError);
  }
 }
}