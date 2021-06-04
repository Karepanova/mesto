const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseIcon = popup.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__data');
const formAddCardData = document.querySelector('.form-add-card__data');
const popupInfoName = formElement.querySelector('.popup__info_profile_name');
const popupInfoAbout = formElement.querySelector('.popup__info_profile_about');
const title = document.querySelector('.profile__title');// Выберите элементы, куда должны быть вставлены значения полей
const subtitle = document.querySelector('.profile__subtitle');// Выберите элементы, куда должны быть вставлены значения полей
const addButton = content.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.form-add-card');
const formAddCardCloseIcon = formAddCard.querySelector('.form-add-card__close-icon');
const profileNaming = document.querySelector('.form-add-card__info-profile-naming'); //из инпута
const profileLink = document.querySelector('.form-add-card__info-profile-link');// из инпута
const imagePopup = document.querySelector('.image-popup'); //попап картинка
const imagePopupCloseIcon = document.querySelector('.image-popup__close-icon');//закрыть попап картинку
const imagePopupImg = document.querySelector('.image-popup__img'); //поле ссылка попап фото
const imagePopupTitle = document.querySelector('.image-popup__title');//поле текст попап фото
const elementsList = document.querySelector('.elements'); //блок в котором будут клонируемые карточки
const elementsTemplate = document.querySelector('#elements-template').content;
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
]; // массив

function openModal(modal) {
 // функционал добавления класса к элементу modal
 modal.classList.add('popup_opened');
}

/*открывает форму редактирования профиля*/
function openProfileForm() {
 openModal(popup); //вызов функции подставления класса открытия попапа
 /*при открытии, подтягивает данные со страницы в форму */
 popupInfoName.value = title.textContent;
 popupInfoAbout.value = subtitle.textContent;
}

/*открывает форму "добавить фото"*/
function openFormAddCard() {
 openModal(formAddCard);//вызов функции подставления класса открытия попапа
 profileNaming.value = ''; //чистит инпут
 profileLink.value = ''; //чистит инпут
}

/*открывает изображение*/
function openImgPopup(event) {
 openModal(imagePopup);//вызов функции подставления класса открытия попапа
 imagePopupImg.src = event.target.src;  //записывает ссылку
 let name = event.target.closest('.element').querySelector('.element__text').textContent; //ищем родителя, от родителя ищем текст
 imagePopupImg.alt = name; //записывает альт
 imagePopupTitle.textContent = name; //записывает текст
}


function closeModal(modal) {
 // функционал удаления класса элемента modal
 modal.classList.remove('popup_opened');
}

/*удаляет класс для "редактировать профиль"*/
function closeProfileForm() {
 closeModal(popup); //вызов функции удаления класса попап для закрытия
}

/*удаляет класс для формы с добавлением фото*/
function closeFormAddCard() {
 closeModal(formAddCard);//вызов функции удаления класса попап для закрытия
}

/*удаляет класс для фото попап*/
function closeImgPopup() {
 closeModal(imagePopup);//вызов функции удаления класса попап для закрытия
}

/*сохраняет введенные в профиль данные*/
function submitEditForm(evt) {
 evt.preventDefault();//не отправлять форму
 title.textContent = popupInfoName.value;// вставка в профиль на странице из формы
 subtitle.textContent = popupInfoAbout.value;// вставка в профиль на странице из формы
 closeProfileForm();
}

function submitCardForm(evt) {
 evt.preventDefault();//не отправлять форму
 const element = {
  name: profileNaming.value,
  link: profileLink.value
 };
 const card = renderCard(element);
 createCard(card);
 closeFormAddCard();
}

/*создает из шаблона карточки с данными из массива*/
function renderCard(element) {
 const initialElement = elementsTemplate.cloneNode(true); /*клонирует карточку*/
 initialElement.querySelector('.element__text').textContent = element.name; /*тянет в клон текст*/
 initialElement.querySelector('.element__img').src = element.link; /*тянет в клон ссылку*/
 initialElement.querySelector('.element__img').alt = element.name;
 setCardEventListeners(initialElement); //вызфвает ф-цию с обработчиками событий
 return initialElement;
 //elementsList.prepend(initialElement); //вставляет клонируемые карточки в блок в начало
}

function createCard(card) {
 elementsList.prepend(card);
}

/*обрабатывает создание всех карточек из массива*/
(function renderItems() {
 initialCards.forEach(function (element){
  const card = renderCard(element);
  createCard(card);
 }); //применяется к каждому элементу массива
})() /*самовызывающаяся функция*/

/*удаляет карточку*/
function handleDelete(event) {
 event.target.closest('.element').remove();
}

/*подставляет класс с фото черный лайк*/
function handleLike(event) {
 event.target.classList.toggle('element__button-active');
}

/*назначение событий*/
function setCardEventListeners(element) {
 /*нажатие корзинка удалить вызывается ф-ция удаления блока*/
 element.querySelector('.profile__delete').addEventListener('click', handleDelete);
 /*нажатие сердечка вызывает функцию поставления класса*/
 element.querySelector('.element__button').addEventListener('click', handleLike);
 /*ф-ция добавить класс для поп открытия картинки*/
 element.querySelector('.element__img').addEventListener('click', openImgPopup);
}

/*обработчик событий*/
editButton.addEventListener('click', openProfileForm); /*ф-ция добавить класс*/
addButton.addEventListener('click', openFormAddCard); /*ф-ция добавить класс для формы с фото*/
popupCloseIcon.addEventListener('click', closeProfileForm); /*ф-ция удалить класс*/
formAddCardCloseIcon.addEventListener('click', closeFormAddCard); /*ф-ция удалить класс для формы с фото*/
imagePopupCloseIcon.addEventListener('click', closeImgPopup); /*ф-ция удалить класс для формы с фото*/
formElement.addEventListener('submit', submitEditForm); /*ф-ция отправки формы*/
formAddCardData.addEventListener('submit', submitCardForm); /*ф-ция отправки формы*/