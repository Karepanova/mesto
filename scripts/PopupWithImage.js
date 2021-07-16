export class PopupWithImage extends Popup {
  constructor(popupSelector, {link, name}) {
    super(popupSelector);
    this._popupImg = super._popupSelector.querySelector('.popup__img'); //ищем в родителе селектор имг
    this._popupImgSignature = super._popupSelector.querySelector('.popup__img-signature'); //ищем в род. селектор подписи
    this._link = link;
    this._name = name;
  }

  open = () => {
    this._popupImg.src = this._link; //устанавливаем ссылку
    this._popupImg.alt = this._name; //устанавливаем альт
    this._popupImgSignature.textContent = this._name;//устанавливаем подпись картинке

    super.open();
  }


}