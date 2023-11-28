import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Price = database.define('tbc_prices', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default Price;