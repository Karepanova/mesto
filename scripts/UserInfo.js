//отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({profileName, profileAbout}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    const userData ={
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
    return userData;

  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(profileName, profileAbout) {
    this._profileName.textContent = profileName;
    this._profileAbout.textContent = profileAbout;
  }
}
