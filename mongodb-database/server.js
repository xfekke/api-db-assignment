// Importera Express för att kunna skapa en webbserver och Mongoose för att interagera med MongoDB-databasen.
import express from "express"
import mongoose from "mongoose"
import { rateLimit } from 'express-rate-limit';
import apiRegister from "./apiRegister.js"

// Skapar en instans av Express-appen, detta är vår webbserver.
const server = express()
const port = 3000

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

server.use(limiter);

/*
  Servern använder en middleware ( express.json() ) för att omvandla våra request till JSON.
  Detta gör att vi kan hantera JSON-data som skickas i request body.
*/
server.use(express.json())

/* 
  Vår MongoDB Atlas connection-string
  Ansluter till MongoDB-databasen med hjälp av Mongoose.
  Strängen innehåller: 
    Användarnamn - <Username>
    Lösenord - <Password>
    Databasnamnet (Optional) - <DB-Name>
*/
mongoose.connect("mongodb+srv://fekkeru:qwerty1234@cluster0.w3hrvjd.mongodb.net/")
/*
  Byt ut connection-string'en med er egna. Ni hittar er på MongoDB Atlas genom att gå in på: 
 
  Database -> 
  Kolla att ni har en databas, heter ofta "Cluster0" ->
  Trycka på "Connect" för den databasen ni vill ansluta till ->
  Kolla att eran nuvarande ip-adress är tillagd ->
  Välj "Compass" ->
  Under "2. Copy the connection string" hittar ni er connection-string
 
  OBS. Glöm inte ändra <password> !
*/


apiRegister(server, mongoose)


/* 
  Startar servern så att den lyssnar på den definierade porten.
  När servern har startat, loggas ett meddelande till konsolen.
*/
server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))