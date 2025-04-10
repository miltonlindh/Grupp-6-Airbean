# Airbean API-Grupp 6

installationer
```
git clone https://github.com/miltonlindh/Grupp-6-Airbean.git
cd Grupp-6-Airbean
npm install
npm run dev
```
endpoints
| Funktion               | URL                                                          | Metod  |
|------------------------|--------------------------------------------------------------|--------|
| Hämta meny             | `http://localhost:3003/api/menu`                             | GET    |
| Skapa användare        | `http://localhost:3003/api/signUp`                           | POST   |
| Logga in               | `http://localhost:3003/api/logIn`                            | POST   |
| Skapa beställning      | `http://localhost:3003/api/order`                            | POST   |
| Hämta orderhistorik    | `http://localhost:3003/api/orderHistory/:userID`             | GET    |
| Hämta leveransstatus   | `http://localhost:3003/api/deliveryStats/:orderID`           | GET    |
| Uppdatera leveransstatus | `http://localhost:3003/api/deliveryStats/:orderID/:userID` | PATCH  |
| Om Airbean             | `http://localhost:3003/api/about`                            | GET    |
| Ta bort produkt ur varukorg | `http://localhost:3003/api/cart/:id`         | DELETE    |


## Tekniker och verktyg
- **JavaScript** - Språket som används.  
- **Node.js** - Våran server som kör på javascript  
- **Express.js** - Ett reamverk som gör det enkelt att skapa Restful APIer.  
- **SQlite3** - En lättviktsdatabas som är perfetk för mindre projekt.  
- **JSON web tokens*** - Används för autentisering av användare.   
- **bcrypt** - Hashar lösenord samt verifierar de vid inloggning.  
- **Nodemon** - Startar om servern autmatiskt om filer ändras.  
- **CORS** - Tillåter kommunikation mellan frontend och backend från olika domäner också
##
## WebSockets
Om vi hade byggt in WebSockets i Airbean så hade vi gjort användarupplevelsen bättre genom realtidsuppdateringar.   

Livestatus på leveranser, så istället för att behvöa uppdatera sidan eller klicka runt så hade man direkt kunnat se att drönare är påväg, ungefär som att följa en beställning i en vanlig matlevereansapp.  

Ha notiser i realtid så när något händer med beställningen såsom att den är redo att skickas så får användaren en notis om det. 



