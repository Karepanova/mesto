//включает валидацию на форме
function enableValidation(configs) {
 configs.forEach(function (config) {
  const form = document.querySelector(config.form); //класс+нейм
  form.addEventListener('submit', (event) => handleFormSubmit(event, config)); //слушатель на сабмит
  form.addEventListener('input', (event) => handleFormInput(event, config)); //проверяет что вводим
 })
}

function handleFormSubmit(event, config) {
 event.preventDefault(); //не отправляет форму
 const form = event.currentTarget;
 const isValid = form.checkValidity();
 if (isValid) {
  form.reset();
  setSubmitButtonState(form, config);
 }
}

function handleFormInput(event, config) {
 const input = event.target; // отправил событие
 const form = event.currentTarget; // то на что мы повесили событие
 // показываем тексты ошибок пользователям
 setFieldError(input);
 setInputError(input, config);
 // активируем или деактивируем кнопку
 setSubmitButtonState(form, config);
}



function setFieldError(input) {
 const span = document.querySelector(`#${input.id}-error`);
 span.textContent = input.validationMessage;

}


//добавляет / удаляет класс у кнопки
function setSubmitButtonState(form, config) {
 const button = form.querySelector(config.button);
 const isValid = form.checkValidity();

 if (isValid) {
  button.classList.remove(config.buttonInvalid);
  button.removeAttribute('disabled')
 } else {
  button.classList.add(config.buttonInvalid);
  button.setAttribute('disabled', 'disabled')
 }
};

//добавляем класс инпуту
function setInputError(input, config) {
 if (input.validity.valid){
  input.classList.remove(config.inputError);
 } else {
  input.classList.add(config.inputError);
 }
}

enableValidation([
 {
  form: `.form-add-card__data`,
  button: '.form-add-card__button',
  buttonInvalid: 'form-add-card__button_invalid',
  inputError: 'form-add-card__field_error'
 },
 {
  form: `.popup__data`,
  button: '.popup__button',
  buttonInvalid: 'popup__button_invalid',
  inputError: 'popup__info_error'
 }
])

