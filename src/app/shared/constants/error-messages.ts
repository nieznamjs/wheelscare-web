export enum ErrorMessages {
  GENERAL_SERVER_ERROR = 'Błąd serwera, spróbuj ponownie później lub skontaktuj się z administratorem.',
  UNAUTHORIZED_USER = 'Nieprawidłowy e-mail lub hasło.',
  BadUrl = 'Coś poszło nie tak, sprawdź adres linku lub skontaktuj się z administratorem.',
  USER_ALREADY_EXISTS = 'Użytkownik z podanym adresem e-mail już istnieje.',
  CAN_NOT_ACTIVATE_USER = 'Nie udało się aktywować konta.',
  USER_IS_NOT_ACTIVE = 'Konto nie zostało aktywowane. Aktywuj konto za pomocą linku przesłanego na podany adres e-mail.',
  NOT_UNIQUE_VIN = 'Pojazd z podanym numerem VIN już istnieje.'
}
