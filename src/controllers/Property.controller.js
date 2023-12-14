import { check, validationResult } from "express-validator"

import Categories from "../models/Categories.js";
import Price from "../models/Prices.js";
import Property from "../models/Property.model.js"

const formProperty = async (req, res) => {
    console.log(req.body);
    const [categories, prices] = await Promise.all([Categories.findAll(), Price.findAll()])
    res.render('property/create.pug', {
        page: 'New Property',
        showHeader: true,
        data: req.body,
        categories,
        prices
    })
}

const findForm = async (req, res) => {
    res.render('property/find.pug', {
        page: "Find Property",
        showHeader: true
    })
}

const insertProperty = async (req, res) => {
    await check('title').notEmpty().withMessage("Title is required").run(req);
    await check('description').notEmpty().withMessage("Description is required").isLength({min: 15}).withMessage("Description field must contain at least of 15 characters").isLength({max: 500}).withMessage("Description field must contain at least less than 500 characters").run(req);
    await check('category').notEmpty().withMessage("Category field is required.").run(req)
    await check('priceRange').notEmpty().withMessage("Price Range field is required.").run(req)
    await check('nRooms').notEmpty().withMessage("Number of Rooms field is required.").run(req)
    await check('nWC').notEmpty().withMessage("Number of W.C. field is required.").run(req)
    await check('nPK').notEmpty().withMessage("Number of Parking Lots field is required.").run(req)
    await check('street').notEmpty().withMessage("Please select your location in the map to triangulate your position.").run(req)

    const errors = validationResult(req)
    console.log(`Errors: ${errors}`);
    console.log(req.body);
    if (errors.isEmpty()) {
        const { title, description, nRooms, nPK, priceRange, category, nWC, street, lat, lng} = req.body
        console.log(`Validar y guardar datos en base de datos`)
        try {
          
            const loggedUser = req.User.id
            if(loggedUser){
                console.log("El usuario existe")
                 const savedProperty = await Property.create({
                    title,
                    description,
                    nRooms,
                    nPK,
                    nWC,
                    price_id: priceRange,
                    category_id:category,
                    street,
                    lat,
                    lng,
                    user_id: loggedUser
                })
                console.log(savedProperty);
                console.log(savedProperty.id)
                res.redirect(`/bienes-raices/properties/create/addImage/${savedProperty.id}`)
            }
        } catch (error) {
            console.log(error);
            return res.clearCookie("_token").redirect("/bienes-raices/user/login/")
        }
    } else {
        const [categories, prices] = await Promise.all([Categories.findAll(), Price.findAll()])
        return res.render('property/create.pug', {
            page: 'New Property',
            errors: errors.array(),
            showHeader: true,
            data: req.body,
            categories,
            prices,
            property: {
                title: req.body.title,
                description: req.body.description,
                street: req.body.street,
                lat: req.body.lat,
                lng: req.body.lng,

            }
        });
    }
}

const loadImage = async (req, res, next) => {
    console.log("Vamos a subir ")
    const loggedUser = req.User.id
    const { id } = req.params

    //TODO: Validar que la propiedad exista
    const searchedProperty = await Property.findByPk(id) //SELECT * FROM TBB_PROPIEDADES where ID = id

    if (!searchedProperty) {
        console.log("La propiedad buscada no exite")
        res.redirect('/bienes-raices/user/')
    } else {
        console.log("La propiedad buscada si exite")
        //TODO: Validar que la propiedad no esté publicada
        if (searchedProperty.published) {
            console.log("La propiedad ha sido publicada y las fotos no pueden ser modificadas")
            res.redirect('/bienes-raices/user/')
        }
    }
    const propertyFk = searchedProperty.user_ID

    if (loggedUser.toString() !== propertyFk.toString()) {
        console.log("La propiedad no es del usuario")
        res.redirect('/bienes-raices/user/')
    }
    console.log("La propiedad si es del usuario")

    try {
        console.log(req.file)
        //Almacenar la imagen y publicar la propiedad
        searchedProperty.image = req.file.filename
        searchedProperty.published = 1

        await searchedProperty.save()
        next()

    } catch (error) {
        console.log(error)
    }

}

const formAddImage = async (req, res) => {
    console.log(`Visualizar el formulario para agregar imagenes`)

    const { id } = req.params
    console.log(id)
    //const userID = req.user.id
    const property = await Property.findByPk(id);
    if (!property) {
        console.log("Propieda no existe");
        return res.redirect('/bienes-raices/properties/create/')
    }
    if (Property.isPublished) {
        console.log("Propieda publicada previamente");
        return res.redirect('/bienes-raices/properties/create/')
    }
    if (req.User.id.toString() !== property.user_id.toString()) {
        console.log("User id string");
        return res.redirect('/bienes-raices/properties/create/')
    }

    res.render('property/addImage.pug', {
        property,
        page: `Add image to ${property.title}`,
        id
    })


}

const updateForm = async (req, res) => {
    console.log("Entrando a updateForm");
    // Obtener el ID
    const { id } = req.params;
    console.log(`Accediendo al ID: ${id}`);
    // Encontrar la property
    try {
        let property = await Property.findOne({ where: { id: id } })
        console.log(property);
        res.render("property/edit.pug", {
            page: "Update Property Form",
            showHeader: true,
            property
        })
    } catch (error) {
        console.error('Error finding property:', error);
        res.status(500).send('Internal Server Error');
    }
}
const updateProperty = async (req, res) => {
    res.render("property/edit.pug", {
        page: "Update Property",
        showHeader: true
    })
}
const deleteProperty = (req, res) => {
    return 0
}
const findAllProperties = (req, res) => {
    return 0
}
const findAllByUserProperties = (req, res) => {
    return 0
}
const findOneProperty = async (req, res) => {
    // await check('id').isEmpty().withMessage("Please set a ID in the field.").run(req);

    const result = validationResult(req);
    const { id } = req.body;
    console.log(id);
    const propertyExists = await Property.findOne({ where: { id } });
    console.log(propertyExists);

    if (result.isEmpty()) {
        // Buscar la propiedad
        // Validar que la propiedad con el ID exista
        if (!propertyExists) {
            res.render("property/find.pug", {
                page: "Find Property",
                errors: [{
                    msg: "Property not exists"
                }],
                showHeader: true
            })
        } else {
            res.redirect(`/bienes-raices/properties/update/${id}`);
        }
    } else {
        res.render("property/find.pug", {
            page: "Find Property",
            errors: result.array(),
            showHeader: true
        })
    }
}

export {
    formProperty,
    findForm,
    insertProperty,
    updateProperty,
    formAddImage,
    updateForm,
    deleteProperty,
    findAllProperties,
    findAllByUserProperties,
    findOneProperty,
    loadImage
}