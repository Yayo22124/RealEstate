import {Categories, Prices, Property, User} from "./models/relationsShips.js";

import cookieParser from 'cookie-parser';
import database from './config/database.js'
import express from 'express';
import generalRouter from './routes/general.routes.js'
import helmet from 'helmet';
import morgan from "morgan";
import path from 'path'
import propertyRoutes from './routes/property.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express();

try {
    await database.authenticate();
    console.log(" ------------------ \n   Connection to MySQL was accepted \n ------------------");

    await database.sync();
    console.log(" ------------------ \n   Synchronization with MySQL finished \n ------------------");
} catch (err) {
    console.log(err);
}

//Settings
app.set('PORT', process.env.PORT || 3000)
// View Engine
app.set('view engine', 'pug');
app.set("views", "./src/views")
// urlencoded
app.use(express.urlencoded({ extended: true }))
// cookie-parser
app.use(cookieParser());
// morgan - logger
app.use(morgan('dev'));

// HABILITAR LA PROYTECCION A TRAVEZ DE HELMET
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com'],
      imgSrc: ["'self'", 'data:', 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com', 'https://a.tile.openstreetmap.org', 'https://b.tile.openstreetmap.org', 'https://c.tile.openstreetmap.org'],
      connectSrc: ["'self'", 'https://tile-provider-domain.com', 'https://geocode.arcgis.com', 'https://unpkg.com', 'https://cdnjs.cloudflare.com'],
    },
  }));

// Public
app.use(express.static('./src/public'));

//Middelwares
// app.use(json());
app.use('/api/bienes-raices-220087', generalRouter);
app.use('/bienes-raices/user', userRoutes);
app.use('/bienes-raices/properties', propertyRoutes);

export default app;