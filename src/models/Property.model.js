import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Property = db.define("tbb_propertys", {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estatus: {
        type: DataTypes.ENUM('Sold', 'Available', 'In process'),
        defaultValue: 'Available'
    }

})

export default Property;