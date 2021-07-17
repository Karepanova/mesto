import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._popupImg = this._popupSelector.querySelector('.popup__img');
    this._popupImgSignature = this._popupSelector.querySelector('.popup__img-signature');
  }

  open (name, link) {
    this._popupImg.src = link; //устанавливаем ссылку
    this._popupImg.alt = name; //устанавливаем альт
    this._popupImgSignature.textContent = name;//устанавливаем подпись картинке
    super.open();
  }
}