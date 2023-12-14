# Frontend för Uppgift 2 - Cypress

## Innehållsförteckning

- [Frontend för Uppgift 2 - Cypress](#frontend-för-uppgift-2---cypress)
  - [Innehållsförteckning](#innehållsförteckning)
  - [Skärmdumpar](#skärmdumpar)
  - [Projektbeskrivning](#projektbeskrivning)
  - [TechStack](#techstack)
    - [Ramverk/bibliotek](#ramverkbibliotek)
    - [Styling](#styling)
    - [Testning](#testning)
  - [Komma igång](#komma-igång)
  - [Körning av test](#körning-av-test)
  - [Användning](#användning)

## Skärmdumpar
![login](screenshots/Login.png)
![register](screenshots/Register.png)
![dashboard](screenshots/Dashboard.png)
![changePassword](screenshots/changePassword.png)

## Projektbeskrivning

Syftet med detta projekt är att skapa en webbapplikation med fokus på användarregistrering och inloggning. Projektet följer bästa praxis och använder moderna webbutvecklingstekniker.

Detta frontend nyttjar följande backend:

## TechStack

Vite/react felade när man kör node version 20.x.x, så rekommenderar att använda högst node version 18.x.x.

### Ramverk/bibliotek
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

### Styling
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://www.flowbite-react.com)

### Testning
- [Cypress](https://www.cypress.io)

## Komma igång

För att komma igång med projektet, följ dessa steg:

**OBS - Se till att backend är startad, se README för backend**

1. **Klona projektet**: Använd `git` för att klona projektets källkod till din dator:

   ```bash
   git clone https://github.com/MatsHaby/task2_cypress
   ```
2. **Installera beroenden**: Gå till projektmappen och installera projektets beroenden med hjälp av npm:

   ```bash
   cd task2_cypress/Frontend
   npm install
   ```
3. **Starta utvecklingsservern**: Starta utvecklingsservern med kommandot:
   ```bash
   npm run dev
   ```

## Körning av test
Testerna (Cypress) startas med följande kommando:
   ```bash
   npx cypress open
   ```
eller för att köra testerna i headless mode:
   ```bash
   npx cypress run
   ```

I Cypress finns tre specs filer som innehåller testfall för:
 - Registrering av ny användare
 - Inloggning av befintlig användare
 - Uppdatering av lösenord

En mockad användare (cypress/fixtures/user.json) används för att att utföra testerna.
Användaren har följande uppgifter:
 - Namn: testuser
 - Lösenord: testuser123
 - E-post: testuser@email.com

## Användning
Nu när projektet är igång, gå till URL: http://localhost:5173
Här kan du använda appen på följande sätt:

- Befintlig användare: Ange dina uppgifter för att logga in och komma åt din dashboard.
- Ny användare: Klicka på registrera och ange dina uppgifter. Logga därefter in med dina uppgifter.
- Väl inloggad har du möjlighet att: Se din dashboard, ändra lösenord eller logga ut.
