const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseIcon = popup.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__data');
const popupInfoName = formElement.querySelector('.popup__info_profile_name');
const popupInfoAbout = formElement.querySelector('.popup__info_profile_about');
const title = document.querySelector('.profile__title');// Выберите элементы, куда должны быть вставлены значения полей
const subtitle = document.querySelector('.profile__subtitle');// Выберите элементы, куда должны быть вставлены значения полей


const addButton = content.querySelector('.profile__add-button');
const formEmpty = document.querySelector('.form-empty');
const formEmptyCloseIcon = formEmpty.querySelector('.form-empty__close-icon');
/*const formEmptyData = document.querySelector('.form-empty__data');
const formEmptyInfoProfileNaming = formElement.querySelector('.form-empty__info_profile_naming');
const formEmptyInfoProfileLink = formElement.querySelector('.form-empty__info_profile_link');*/





function openClick() {
  popup.classList.add('popup_opened'); /*добавить модификатор для "редактировать профиль"*/
  /*при открытии с сайта в форму*/
  popupInfoName.value = title.textContent;
  popupInfoAbout.value = subtitle.textContent;
}

function openClickFormEmpty() {
  formEmpty.classList.add('popup_opened'); /*добавить модификатор для формы с добавлением фото*/
}

function closeClick() {
  popup.classList.remove('popup_opened'); /*удалить модификатор для "редактировать профиль"*/
}

function closeClickFormEmpty () {
  formEmpty.classList.remove('popup_opened'); /*удалить модификатор для формы с добавлением фото*/
}

function formSubmitHandler (evt) {
	evt.preventDefault();
  title.textContent = popupInfoName.value;// Вставьте новые значения с помощью textContent
  subtitle.textContent = popupInfoAbout.value;// Вставьте новые значения с помощью textContent
  closeClick();
}


editButton.addEventListener('click', openClick); /*ф-ция добавить класс*/
addButton.addEventListener('click', openClickFormEmpty); /*ф-ция добавить класс для формы с фото*/
popupCloseIcon.addEventListener('click', closeClick); /*ф-ция удалить класс*/
formEmptyCloseIcon.addEventListener('click', closeClickFormEmpty); /*ф-ция удалить класс для формы с фото*/
formElement.addEventListener('submit', formSubmitHandler); /*ф-ция отправки формы*/

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];