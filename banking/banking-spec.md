# Specyfikacja Operacji Bankowych

## Podstawowe Reguły Biznesowe

1. Tworzenie Konta
   - Mając nowe żądanie utworzenia konta
   - Podczas tworzenia konta bankowego
   - System powinien utworzyć konto z unikalnym ID, prawidłową walutą oraz danymi właściciela (imię, nazwisko, id)

2. Walidacja Wypłaty
   - Mając żądanie wypłaty
   - Podczas próby wypłaty środków
   - Kwota musi być:
     - Liczbą dodatnią
     - Mniejsza lub równa aktualnemu saldu
     - W tej samej walucie co konto

3. Obsługa Nieudanych Wypłat
   - Mając nieprawidłowe żądanie wypłaty
   - Gdy walidacja nie powiedzie się
   - System powinien zwrócić WithdrawalError z odpowiednim kodem:
     - "INSUFFICIENT_FUNDS" gdy kwota przekracza saldo
     - "INVALID_AMOUNT" gdy kwota jest ujemna lub zerowa
     - "ACCOUNT_NOT_FOUND" gdy accountId jest nieprawidłowy

4. Przetwarzanie Udanej Wypłaty
   - Mając prawidłowe żądanie wypłaty
   - Podczas przetwarzania wypłaty
   - System powinien:
     - Odjąć kwotę od salda konta
     - Zwrócić WithdrawalResult z success=true
     - Zawierać szczegóły transakcji z nowym saldem

5. Rejestrowanie Transakcji
   - Mając udaną wypłatę
   - Po zakończeniu transakcji
   - Zapis transakcji musi zawierać:
     - Unikalny identyfikator transakcji
     - Kwotę wypłaty
     - Walutę
     - Znacznik czasowy
     - Saldo pozostałe po operacji
