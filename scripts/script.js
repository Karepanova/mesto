let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseIcon = popup.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__data');

editButton.addEventListener('click', openClick);
popupCloseIcon.addEventListener('click', closeClick);
formElement.addEventListener('submit', formSubmitHandler);

function openClick() {
  popup.classList.add('popup_opened'); /*добавить модификатор*/
}

function closeClick() {
  popup.classList.remove('popup_opened'); /*удалить модификатор*/
}

function formSubmitHandler (evt) {
	evt.preventDefault();
	let popupInfoName = formElement.querySelector('.popup__info_name');
	let popupInfoAbout = formElement.querySelector('.popup__info_about');
	// Получите значение полей из свойства value
  let name = popupInfoName.value;
  let about = popupInfoAbout.value;
	// Выберите элементы, куда должны быть вставлены значения полей
  let title = document.querySelector('.profile__title');
  let subtitle = document.querySelector('.profile__subtitle');
  // Вставьте новые значения с помощью textContent
  title.textContent = name;
  subtitle.textContent = about;
  closeClick();
}
