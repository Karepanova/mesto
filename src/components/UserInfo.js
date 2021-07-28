//отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({profileName, profileAbout, profileAvatar}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    }
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about, avatar}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.src = avatar;
  }
}