export const content = document.querySelector('.content');
export const editButton = content.querySelector('.profile__edit-button');
export const formEditProfile = document.querySelector('.popup__data[name=profile-form-name]');
export const popupInfoName = formEditProfile.querySelector('.popup__info_profile_name');
export const popupInfoAbout = formEditProfile.querySelector('.popup__info_profile_about');
export const addButton = content.querySelector('.profile__add-button');
export const avatarWrapper = content.querySelector('.profile__avatar-wrapper');

//для валидатора
export const config = {
 form: `.popup__data`,
 button: '.popup__button',
 buttonInvalid: 'popup__button_invalid',
 inputError: 'popup__info_error'
};