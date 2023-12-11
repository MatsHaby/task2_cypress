# Backend för Uppgift 2 - Cypress

## Innehållsförteckning

- [Backend för Uppgift 2 - Cypress](#backend-för-uppgift-2---cypress)
  - [Innehållsförteckning](#innehållsförteckning)
  - [Projektbeskrivning](#projektbeskrivning)
  - [Teknologier](#teknologier)
    - [Ramverk/bibliotek](#ramverkbibliotek)
    - [Databas](#databas)
  - [Komma igång](#komma-igång)
  - [API-rutter](#api-rutter)
    - [Registrera en ny användare](#registrera-en-ny-användare)
      - [Exempel på förfrågan](#exempel-på-förfrågan)
      - [Exempel på svar](#exempel-på-svar)
    - [Logga in som befintlig användare](#logga-in-som-befintlig-användare)
      - [Exempel på förfrågan](#exempel-på-förfrågan-1)
      - [Exempel på svar](#exempel-på-svar-1)
    - [Byta lösenord](#byta-lösenord)
      - [Exempel på förfrågan](#exempel-på-förfrågan-2)
      - [Exempel på svar](#exempel-på-svar-2)
    - [Ta bort användaren](#ta-bort-användaren)
      - [Exempel på förfrågan](#exempel-på-förfrågan-3)
      - [Exempel på svar](#exempel-på-svar-3)

## Projektbeskrivning

Detta backend är en utvecklad webbapplikation som skapats för Uppgift 2 - Cypress. Den hanterar användarregistrering, inloggning, uppdatering av lösenord samt borttagning av en användare.
Användarinformation lagras i en JSON-fil.

## Teknologier

### Ramverk/bibliotek

- [Fastify](https://www.fastify.io/): Ett snabbt och låglatens webbramverk för Node.js.
- [Node.js](https://nodejs.org/): JavaScript-miljön som körs på servern.

### Databas
- [Databas](#): JSON-fil för lagring av användarinformation.

## Komma igång

För att starta backend, följ dessa steg:

1. **Klona projektet**: Använd `git` för att klona projektets källkod till din dator:

   ```bash
   git clone https://github.com/ditt-användarnamn/bakend-projektet
   ```
2. Installera beroenden: Gå till projektmappen och installera projektets beroenden med hjälp av npm:
   ```bash
   cd bakend-projektet
   npm install
   ```
3. Starta backend: Starta backend med kommandot:
   ```bash
   npm start
   ```

Backend kommer att starta upp med följade URL och port http://localhost:5001.

## API-rutter

### Registrera en ny användare

Metod: POST
Rutt: /api/v1/user/register
Payload:
&emsp;name: sträng
&emsp;email: sträng
&emsp;password: sträng

#### Exempel på förfrågan

 ```JSON
{
	"name": "Mats",
	"password": "123",
	"email": "mats2@live.com"
}
 ```

#### Exempel på svar
 ```JSON
{
	"status": "success",
	"data": "Användare skapad"
}
 ```

### Logga in som befintlig användare

Metod: `POST`
Rutt: `/api/v1/user`
Payload:
&emsp;email: sträng
&emsp;password: sträng

#### Exempel på förfrågan

 ```JSON
 {
	"email": "användare@mail.se",
	"password": "123"
 }
 ```

#### Exempel på svar
 ```JSON
{
	"status": "success",
	"data": {
		"id": "1fde0481-1a6b-4778-a088-18fa99df5597",
		"name": "Hertha Adams",
		"password": "test",
		"email": "Katlynn_Dickens1@hotmail.com"
	}
}
 ```


### Byta lösenord

Metod: `PATCH`
Rutt: /api/user/:id
Parametrar: id - Användarens unika identifierare

#### Exempel på förfrågan
http://127.0.0.1:5000/api/v1/user/99ca0b84-9d5c-4c1b-b5e5-30993ae94fb2

 ```JSON
{
	"password": "1234"
}
```

#### Exempel på svar
 ```JSON
{
	"status": "success",
	"data": {
		"id": "99ca0b84-9d5c-4c1b-b5e5-30993ae94fb2",
		"password": "1234"
	}
}
 ```

### Ta bort användaren

Metod: `DELETE`
Rutt: /api/v1/user/:id

#### Exempel på förfrågan
http://127.0.0.1:5000/api/v1/user/99ca0b84-9d5c-4c1b-b5e5-30993ae94fb2

#### Exempel på svar

 ```JSON
{}
 ```