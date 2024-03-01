export const MOVIE_SEARCH_ERR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const MOVIE_SEARCH_EMPTY = 'Ничего не найдено';


export const NAME_REG_EX = /^[A-Za-zА-Яа-яёЁ]+(?:[-\s][A-Za-zА-Яа-яёЁ]+)*$/;
export const NAME_ERR = 'Поле "имя" необходимо заполнить. Оно может содержать только латиницу, кирилицу, а также дефис и пробел';
export const NAME_ERR_SMALL = 'Минимальная длина поля "имя" 2 символа';

export const EMAIL_REG_EX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
export const EMAIL_ERR = 'Поле "Email" необходимо заполнить корректным адресом почты.';

export const REG_EMAIL_ERR = 'Пользователь с таким email уже существует';
export const REG_ERR = 'При регистрации пользователя произошла ошибка.';

export const AUTH_ERR ='Вы ввели неправильный логин или пароль';

export const USER_UPDATE_EMAIL_ERR = ' Пользователь с таким email уже существует';
export const USER_UPDATE_ERR = 'При обновлении профиля произошла ошибка';

export const SHORT_MOVIE_DURATION = 40;
export const SHORT_MOVIE_TIME_COUNT = 60;

export const CARDS_COUNT_MANY = 15;
export const CARDS_COUNT_BIG_MIDDLE = 11;
export const CARDS_COUNT_MIDDLE = 7;
export const CARDS_COUNT_LITTLE = 4;

export const SCREEN_WIDTH_BIG = 1280;
export const SCREEN_WIDTH_MIDDLE = 990;
export const SCREEN_WIDTH_LITTLE = 1279;