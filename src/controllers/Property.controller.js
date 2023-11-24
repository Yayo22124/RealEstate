import { check, validationResult } from "express-validator"

import Property from "../models/Property.model.js"

const formProperty = (req, res) => {
    res.render('property/create.pug', {
        page: 'New Property',
        showHeader: true
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

    const errors = validationResult(req)
    console.log(req.body);
    if (errors.isEmpty()) {
        try {
            const newProperty = await Property.create(req.body);
            res.send('Property saved');
        } catch (error) {
            console.error('Error saving property:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        return res.render('property/create.pug', {
            page: 'New Property',
            errors: errors.array(),
            showHeader: true
        });
    }
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
    updateForm,
    deleteProperty,
    findAllProperties,
    findAllByUserProperties,
    findOneProperty
}