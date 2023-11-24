import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Property = db.define("tbb_propertys", {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM("apartment", "house", "landfield", "warehouse"),
        allowNull: false
    },
    priceRange: {
        type: DataTypes.ENUM('1', '2', '3'),
        allowNull: false
    },
    nRooms: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nWC: {
        type: DataTypes.STRING(255),
        allowNull: false    
    },
    nPK: {
        type: DataTypes.STRING(255),
        allowNull: false    
    },
    street: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

})

export default Property;