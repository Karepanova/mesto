import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../components/initial-сards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__data[name=profile-form-name]');
const popupInfoName = formEditProfile.querySelector('.popup__info_profile_name');
const popupInfoAbout = formEditProfile.querySelector('.popup__info_profile_about');
const addButton = content.querySelector('.profile__add-button');
//для валидатора
const config = {
 form: `.popup__data`,
 button: '.popup__button',
 buttonInvalid: 'popup__button_invalid',
 inputError: 'popup__info_error'
};


//создание экземпляра класса - открытие картинки
const popupImg = new PopupWithImage('.popup_image-card');
popupImg.setEventListeners();

//экземпляр класса - делает форму добавления карточки
const popupNewForm = new PopupWithForm('.popup_new-card', (evt) => {
 evt.preventDefault();//не отправлять форму
 const item = popupNewForm.getInputValues();
 const insertCard = createCard(item);
 cardsList.addItem(insertCard);
 popupNewForm.close();
});
popupNewForm.setEventListeners();

//информация о профиле
const userInfo = new UserInfo({
 profileName: '.profile__title',
 profileAbout: '.profile__subtitle'
});

//эксепляр класса - форма редактирования профиля
const popupProfileForm = new PopupWithForm('.popup_edit-profile', (evt) => {
 evt.preventDefault();//не отправлять форму
 const formData = popupProfileForm.getInputValues();
 userInfo.setUserInfo(formData); //вставляет данные из формы на страницу
 popupProfileForm.close();
});
popupProfileForm.setEventListeners();

//экземпляр class Section - отвечает за отрисовку элементов на странице
const cardsList = new Section({
 items: initialCards,
 renderer: (item) => {
  const insertCard = createCard(item);
  cardsList.addItem(insertCard);
 }
}, '.elements');
cardsList.initialItems();

const validatorAddForm = new FormValidator(config, document.querySelector('.popup__data[name=add-card-form-name]'));
validatorAddForm.enableValidation();
const validatorEditForm = new FormValidator(config, document.querySelector('.popup__data[name=profile-form-name]'));
validatorEditForm.enableValidation();



//ф-ция открывает форму добавления карточки
addButton.addEventListener('click', openAddCardForm);

//открывает форму редактирования профиля
editButton.addEventListener('click', openProfileForm);


//возвращает карточку
function createCard(item) {
 const card = new Card(item, '#elements-template', (name, link) => {
  popupImg.open(name, link);
 });
 return card.createCard();
}

//ф-я открытия формы добавления карточки
function openAddCardForm() {
 validatorAddForm.setSubmitButtonState();
 popupNewForm.open();
}

//ф-я открытия формы редактирования профиля
function openProfileForm() {
 //дергаем объект с данными пользователя
 const userInfoData = userInfo.getUserInfo();
 popupInfoName.value = userInfoData.name; //вставка с шапки в форму
 popupInfoAbout.value = userInfoData.about; //вставка с шапки в форму
 popupProfileForm.open();
}