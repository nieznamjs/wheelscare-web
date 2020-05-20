export enum ErrorMessages {
  GeneralServerError = 'Błąd serwera, spróbuj ponownie później lub skontaktuj się z administratorem.',
  Unauthorized = 'Nieprawidłowy e-mail lub hasło.',
  BadUrl = 'Coś poszło nie tak, sprawdź adres linku lub skontaktuj się z administratorem.',
  UserAlreadyExists = 'Użytkownik z podanym adresem e-mail już istnieje.',
  CannotActivateUser = 'Nie udało się aktywować konta.',
  UserIsNotActive = 'Konto nie zostało aktywowane. Aktywuj konto za pomocą linku przesłanego na podany adres e-mail.',
  NOT_UNIQUE_VIN = 'Pojazd z podanym numerem VIN już istnieje.'
}
