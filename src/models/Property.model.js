import { DataTypes } from 'sequelize';
import database from '../config/database.js';

const Property = database.define("tbb_propertys", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    nRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    nWC: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    nPK: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "por definir"
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

})

export default Property;