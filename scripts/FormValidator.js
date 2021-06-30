//настраивает валидацию полей формы
export class FormValidator {
 constructor(config, form) {
  this._config = config;
  this._form = form;
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
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
 }

 _setSubmitButtonState = () => {
  const button = this._form.querySelector(this._config.button);
  const isValid = this._form.checkValidity();

  if (isValid) {
   button.classList.remove(this._config.buttonInvalid);
   button.removeAttribute('disabled')
  } else {
   button.classList.add(this._config.buttonInvalid);
   button.setAttribute('disabled', 'disabled')
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


