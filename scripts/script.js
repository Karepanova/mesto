let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseIcon = popup.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__data');
let popupInfoName = formElement.querySelector('.popup__info_profile_name');
let popupInfoAbout = formElement.querySelector('.popup__info_profile_about');
let title = document.querySelector('.profile__title');// Выберите элементы, куда должны быть вставлены значения полей
let subtitle = document.querySelector('.profile__subtitle');// Выберите элементы, куда должны быть вставлены значения полей


function openClick() {
  popup.classList.add('popup_opened'); /*добавить модификатор*/
  /*при открытии с сайта в форму*/
  popupInfoName.value = title.textContent;
  popupInfoAbout.value = subtitle.textContent;
}

function closeClick() {
  popup.classList.remove('popup_opened'); /*удалить модификатор*/
}

function formSubmitHandler (evt) {
	evt.preventDefault();
  title.textContent = popupInfoName.value;// Вставьте новые значения с помощью textContent
  subtitle.textContent = popupInfoAbout.value;// Вставьте новые значения с помощью textContent
  closeClick();
}

editButton.addEventListener('click', openClick); /*ф-ция добавить класс*/
popupCloseIcon.addEventListener('click', closeClick); /*ф-ция удалить класс*/
formElement.addEventListener('submit', formSubmitHandler); /*ф-ция отправки формы*/