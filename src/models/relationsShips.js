import Categories from "./Categories.js"
import Prices from "./Prices.js"
import Property from "./Property.model.js"
import User from "./User.model.js"

// Propiedad - Dueño (Usuario)
Property.belongsTo(User, { foreignKey: "user_id"});
Categories.hasOne(Property, { foreignKey: "category_id"});
Prices.hasOne(Property, { foreignKey: "price_id"});



export {
    Categories,
    Prices,
    Property,
    User
}