import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Categories = database.define('tbc_categories', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default Categories;