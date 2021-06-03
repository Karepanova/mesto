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
const profileNaming = document.querySelector('.form-add-card__info_profile_naming'); //из инпута
const profileLink = document.querySelector('.form-add-card__info_profile_link');// из инпута
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

/*добавляет класс отркрытия для "редактировать профиль"*/
function openClick() {
    popup.classList.add('popup_opened');
    /*при открытии, подтягивает данные со страницы в форму */
    popupInfoName.value = title.textContent;
    popupInfoAbout.value = subtitle.textContent;
}

/*добавляет класс отркрытия для формы "добавить фото"*/
function openClickFormAddCard() {
    formAddCard.classList.add('popup_opened');
    profileNaming.value = ''; //чистит инпут
    profileLink.value = ''; //чистит инпут
}

/*добавляет класс отркрытия для попап фото*/
function openClickImgPopup(event) {
    imagePopup.classList.add('popup_opened'); //добавляет класс для открытия
    imagePopupImg.src = event.target.src;  //записывает ссылку
    let name = event.target.closest('.element').querySelector('.element__text').textContent; //ищем родителя, от родителя ищем текст
    imagePopupImg.alt = name; //записывает альт
    imagePopupTitle.textContent = name; //записывает текст
}

/*удаляет класс для "редактировать профиль"*/
function closeClick() {
    popup.classList.remove('popup_opened');
}

/*удаляет класс для формы с добавлением фото*/
function closeClickFormAddCard() {
    formAddCard.classList.remove('popup_opened');
}

/*удаляет класс для фото попап*/
function closeClickImgPopup() {
    imagePopup.classList.remove('popup_opened');
}

/*сохраняет введенные в профиль данные*/
function formSubmitHandler(evt) {
    evt.preventDefault();//не отправлять форму
    title.textContent = popupInfoName.value;// вставка в профиль на странице из формы
    subtitle.textContent = popupInfoAbout.value;// вставка в профиль на странице из формы
    closeClick();
}

function formSubmitHandlerForm(evt) {
    evt.preventDefault();//не отправлять форму
    const element = {
        name: profileNaming.value,
        link: profileLink.value
    };
    renderItem(element);
    closeClickFormAddCard();
}

/*создает из шаблона карточки с данными из массива*/
function renderItem(element) {
    const initialElement = elementsTemplate.cloneNode(true); /*клонирует карточку*/
    initialElement.querySelector('.element__text').textContent = element.name; /*тянет в клон текст*/
    initialElement.querySelector('.element__img').src = element.link; /*тянет в клон ссылку*/
    initialElement.querySelector('.element__img').alt = element.name;
    setEventListeners(initialElement); //вызфвает ф-цию с обработчиками событий
    elementsList.prepend(initialElement); //вставляет клонируемые карточки в блок в начало
}

/*обрабатывает создание всех карточек из массива*/
(function renderItems() {
    initialCards.forEach(renderItem); //применяется к каждому элементу массива
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
function setEventListeners(element) {
    /*нажатие корзинка удалить вызывается ф-ция удаления блока*/
    element.querySelector('.profile__delete').addEventListener('click', handleDelete);
    /*нажатие сердечка вызывает функцию поставления класса*/
    element.querySelector('.element__button').addEventListener('click', handleLike);
    /*ф-ция добавить класс для поп открытия картинки*/
    element.querySelector('.element__img').addEventListener('click', openClickImgPopup);
}

/*обработчик событий*/
editButton.addEventListener('click', openClick); /*ф-ция добавить класс*/
addButton.addEventListener('click', openClickFormAddCard); /*ф-ция добавить класс для формы с фото*/
popupCloseIcon.addEventListener('click', closeClick); /*ф-ция удалить класс*/
formAddCardCloseIcon.addEventListener('click', closeClickFormAddCard); /*ф-ция удалить класс для формы с фото*/
imagePopupCloseIcon.addEventListener('click', closeClickImgPopup); /*ф-ция удалить класс для формы с фото*/
formElement.addEventListener('submit', formSubmitHandler); /*ф-ция отправки формы*/
formAddCardData.addEventListener('submit', formSubmitHandlerForm); /*ф-ция отправки формы*/