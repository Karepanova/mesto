/*
если говорить о конкретных методах которые должен осуществлять данный класс, то это:
 получить список всех карточек в виде массива (GET)
добавить карточку (POST)
получить данные пользователя (GET)
заменить данные пользователя (PATCH)
“залайкать” карточку (PUT)
удалить лайк карточки (DELETE)
удалить карточку (DELETE)
заменить аватар (PATCH)
*/


export default class Api {
 constructor(/*config*/) {
  //this._url = config.url;
  //this._headers = config.headers;
 }

 // получить список всех карточек в виде массива (GET)
 getArrayCards() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
   method: 'GET',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e'
   }
  })
   .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
 }

 //получить данные пользователя (GET)
 getUserData() {
  return fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
   method: 'GET',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
    'Content-Type': 'application/json'
   }
  })
   .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
 }


 // редактировать/заменить данные пользователя (PATCH)
 editUserProfile(data) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me ', {
   method: 'PATCH',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    name: data.name,
    about: data.about
   })
  }).then(res => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  })
 }


//добавить карточку (POST)
 addNewCard(data) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards ', {
   method: 'POST',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    name: data.name,
    link: data.link
   })
  })
   .then(res => {
    if (res.ok) {
     return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
   })
 }


//Отображение количества лайков карточки (PUT)
 likeCard() {
  return fetch('/*todo - какая ссылка?*/', {
   method: 'PUT',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
    'Content-Type': 'application/json'
   }
  })
   .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
 }


 //удалить карточку (DELETE)
 delCard() {
  return fetch('/*todo - какая ссылка?*/', {
   method: 'DELETE',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
    'Content-Type': 'application/json'
   }
  })
   .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
 }


 //удалить лайк карточки  (DELETE)
 delLikeCard() {
  return fetch(`/*todo - какая ссылка?*/`, {
   method: 'DELETE',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
    'Content-Type': 'application/json'
   },
  })
   .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
 }


 //заменить аватар (PATCH)
 editAvatar(data) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me/avatar', {
   method: 'PATCH',
   headers: {
    authorization: '9f8fc9db-9c27-4bd4-bed6-8e527c6c542e',
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    avatar: data.avatar
   })
  })
   .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
 }
}