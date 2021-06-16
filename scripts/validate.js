//включает валидацию на форме
function enableValidation(config) {
 const form = document.querySelector(config.form); //класс+нейм
 form.addEventListener('submit', handleFormSubmit); //слушатель на сабмит
 form.addEventListener('input', (event) => handleFormInput(event, config)); //проверяет что вводим

 const form2 = document.querySelector(`.popup__info_profile_name[name="firstname"]`); //класс+нейм
 form2.addEventListener('submit', handleFormSubmit); //слушатель на сабмит
 form2.addEventListener('input', handleFormInput); //проверяет что вводим
}

function handleFormSubmit(event) {
 event.preventDefault(); //не отправляет форму
 const form = event.currentTarget;
 const isValid = form.checkValidity();

 if(isValid) {
alert('Форма валидна!')
  form.reset();
  setSubmitButtonState(form);
 } else {
  alert('Форма невалидна!')
 }
}

function handleFormInput(event, config) {
 const input = event.target; // отправил событие
 const form = event.currentTarget; // то на что мы повесили событие
 // 1. найдем невалидные поля и установим тексты ошибок
 //setCustomError(input)

 // 2. показываем тексты ошибок пользователям
 setFieldError(input);
 // 3. активируем или деактивируем кнопку
 setSubmitButtonState(form, config);
}
/*function setCustomError(input){
 const validity = input.validity;
 input.setCustomValidity(''); //обнуляем ошибки
 if(validity.tooShort || validity.tooLong){
  const currentLength = input.value.length;
  const min = input.getAttribute('minlength');
  const max = input.getAttribute('maxlength')
 //input.setCustomValidity(`Строка имеет неверную длинну. Введено ${currentLength}, а должно быть ${min} от до ${max}`)
 }

 if (validity.typeMismatch){
  //input.setCustomValidity('Это не ссылка');
 }
}*/

function setFieldError(input){
const span = document.querySelector(`#${input.id}-error`);
span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config){
 const button = form.querySelector(config.submitButton);
 const isValid = form.checkValidity();


 if(isValid) {
  button.classList.remove('form-add-card__button_invalid');
  button.removeAttribute('disabled')
} else {
  button.classList.add('form-add-card__button_invalid');
  button.setAttribute('disabled', 'disabled')
 }

};

function editProfile(form){
 const inputPopupInfoProfileName = form.querySelector('.popup__info_profile_name');
 const inputPopupInfoProfileAbout = form.querySelector('.popup__info_profile_about');

 inputPopupInfoProfileName.setCustomValidity('');
 inputPopupInfoProfileAbout.setCustomValidity('')
}

enableValidation({
 form: `.form-add-card__data[name="form"]`,
 submitButton: '.form-add-card__button'
});

enableValidation({
 form2: `.popup__info_profile_name[name="firstname"]`,
 submitButton: '.popup__button'
});
