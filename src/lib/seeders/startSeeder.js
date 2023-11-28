import Categories from '../../models/Categories.js';
import Price from '../../models/Prices.js';
import User from "../../models/User.model.js";
import categories from "../seeders/categories.js";
import database from '../../config/database.js';
import { exit } from 'node:process'
import people from './people.js';
import prices from './prices.js';

const importData = async () => {
    try {
        //Autenricar 
        await database.authenticate()
        //Generar columnas
        await database.sync()
        //Insertamos los datos
        await Promise.all([
            Categories.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(people)
        ]);
        console.log('Datos importados correcctamente')
        exit()
    }
    catch (error) {
        console.log(error)
        exit(1)
    }
}
const deleteData = async () => {
    try {
        //Autenricar 
        await database.authenticate()
        //Generar columnas
        await database.sync()
        //Insertamos los datos
        await Promise.all([
            Categories.destroy({ where: {}, truncate: false }),
            database.query("ALTER TABLE tbc_categories AUTO_INCREMENT = 1"),
            Price.destroy({ where: {}, truncate: false }),
            database.query("ALTER TABLE tbc_prices AUTO_INCREMENT = 1;"),
        ]);
        console.log('Datos eliminados correcctamente')
        exit()
    }
    catch (error) {
        console.log(error)
        exit(1)
    }
}
if (process.argv[2] === "-i") {
    importData();
}
if (process.argv[2] === "-d") {
    deleteData();
}