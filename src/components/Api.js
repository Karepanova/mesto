export default class Api {
 constructor(config) {
  this._address = config.address;
  this._headers = config.headers;
 }


 //1. Загрузка информации о пользователе с сервера (GET)
 getUserData() {
  return fetch(`${this._address}/users/me`, {
   method: 'GET',
   headers: this._headers
  })
   .then(this._checkResponse)
 }



 // 2. Загрузка карточек с сервера (GET)
 getArrayCards() {
  return fetch(`${this._address}/cards`, {
   method: 'GET',
   headers: this._headers
  })
   .then(this._checkResponse)
 }


 // 3. Редактирование профиля (PATCH)
 editUserProfile(data) {
  return fetch(`${this._address}/users/me`, {
   method: 'PATCH',
   headers: this._headers,
   body: JSON.stringify({
    name: data.name,
    about: data.about
   })
  })
   .then(this._checkResponse)
 }


//4. Добавление новой карточки (POST)
 addNewCard(data) {
  return fetch(`${this._address}/cards`, {
   method: 'POST',
   headers: this._headers,
   body: JSON.stringify(data) //name и link
  })
   .then(this._checkResponse)
 }



 //7. Удаление карточки (DELETE)
 delCard(cardId) {
  return fetch(`${this._address}/cards/${cardId}`, {
   method: 'DELETE',
   headers: this._headers
  })
   .then(this._checkResponse)
 }


 //8. Постановка и снятие лайка
 // 8.1 Установить лайк (PUT)
 likeCard(cardId) {
  return fetch(`${this._address}/cards/likes/${cardId}`, {
   method: 'PUT',
   headers: this._headers
  })
   .then(this._checkResponse)
 }



 // 8.2 удалить лайк карточки  (DELETE)
 delLikeCard(cardId) {
  return fetch(`${this._address}/cards/likes/${cardId}`, {
   method: 'DELETE',
   headers: this._headers
  })
   .then(this._checkResponse)
 }


 //9. Обновление аватара пользователя (PATCH)
 editAvatar(data) {
  return fetch(`${this._address}/users/me/avatar`, {
   method: 'PATCH',
   headers: this._headers,
   body: JSON.stringify({
    avatar: data.avatar
   })
  })
   .then(this._checkResponse)
 }

 _checkResponse(res) {
  // тут проверка ответа
  if (res.ok) {
   return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
 }

}