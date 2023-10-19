import User from './models/User.model.js'
import database from './config/database.js'
import express from 'express';
import generalRouter from './routes/general.routes.js'
import morgan from "morgan";
import path from 'path'
import userRoutes from './routes/user.routes.js'

const app = express();

try {
    await database.authenticate();
    await database.sync();
    console.log(" ------------------ \n   Connection to MySQL was accepted \n ------------------");
} catch (err) {
    console.log(err);
}

//Settings
app.set('PORT', process.env.PORT || 3000)
// View Engine
app.set('view engine', 'pug');
app.set("views", "./src/views")
// urlencoded
app.use(express.urlencoded({extended: true}))
// morgan - logger
app.use(morgan('dev'));

// Public
app.use(express.static('./src/public'));

//Middelwares
// app.use(json());
app.use('/api/bienes-raices-220087', generalRouter)
app.use('/bienes-raices', userRoutes)

export default app;