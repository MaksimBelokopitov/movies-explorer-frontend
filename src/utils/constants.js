export const MOVIE_SEARCH_ERR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const MOVIE_SEARCH_EMPTY = 'Ничего не найдено';


export const nameRegEx = /^[A-Za-zА-Яа-яёЁ]+(?:[-\s][A-Za-zА-Яа-яёЁ]+)*$/;
export const nameErr = 'Поле "имя" необходимо заполнить. Оно может содержать только латиницу, кирилицу, а также дефис и пробел';
export const nameErrSmall = 'Минимальная длина поля "имя" 2 символа';

export const emailRegEx = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
export const emailErr = 'Поле "Email" необходимо заполнить корректным адресом почты.';

export const regErrEmail = 'Пользователь с таким email уже существует';
export const regErr = 'При регистрации пользователя произошла ошибка.';

export const authErr ='Вы ввели неправильный логин или пароль';

export const userUpdateEmailError = ' Пользователь с таким email уже существует';
export const userUpdateError = 'При обновлении профиля произошла ошибка';