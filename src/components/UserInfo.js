//отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({profileName, profileAbout}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}