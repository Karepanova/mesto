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
   .then((res) => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
 }



 // 2. Загрузка карточек с сервера (GET)
 getArrayCards() {
  return fetch(`${this._address}/cards`, {
   method: 'GET',
   headers: this._headers
  })
   .then((res) => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
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
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
 }


//4. Добавление новой карточки (POST)
 addNewCard(data) {
  return fetch(`${this._address}/cards`, {
   method: 'POST',
   headers: this._headers,
   body: JSON.stringify(data) //name и link
  })
   .then((res) => {
    if (res.ok) {
     return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
 }



 //7. Удаление карточки (DELETE)
 delCard(cardId) {
  return fetch(`${this._address}/cards/${cardId}`, {
   method: 'DELETE',
   headers: this._headers
  })
   .then((res) => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
 }


 //8. Постановка и снятие лайка
 // 8.1 Установить лайк (PUT)
 likeCard(cardId) {
  return fetch(`${this._address}/cards/likes/${cardId}`, {
   method: 'PUT',
   headers: this._headers
  })
   .then((res) => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
 }



 // 8.2 удалить лайк карточки  (DELETE)
 delLikeCard(cardId) {
  return fetch(`${this._address}/cards/likes/${cardId}`, {
   method: 'DELETE',
   headers: this._headers
  })
   .then((res) => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
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
   .then((res) => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {console.log(`Ошибка сервера ${err}`)});
 }
}