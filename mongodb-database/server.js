import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { rateLimit } from 'express-rate-limit';
import apiRegister from "./apiRegister.js";

// .env
dotenv.config();
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI); 

const server = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

server.use(limiter);

server.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

apiRegister(server, mongoose);

server.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
