export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._escKey = 27;
  }

  //открытие попапа
  open = () => {
    this._popupSelector.classList.add('popup_opened');
  }


  // закрытие попапа
  close = () => {
    this._popupSelector.classList.remove('popup_opened');
  }


  //содержит логику закрытия попапа клавишей Esc
  _handleEscClose = (event) => {
    if (event.keyCode === this._escKey) {
      this.close();
    }
  }

//добавляет слушатель клика иконке закрытия попапа
  _setEventListeners = () => {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close();
      }
    })
  }
}

