import { check, validationResult } from "express-validator";

import Property from "../models/Property.model.js"
import { response } from "express"
import userController from "../controllers/user.controller.js";

const propertyController = {};

propertyController.formProperty = async (req, res) => {
    res.render('property/formProperty.pug', {
        page: 'Register your Property'
    })
}

propertyController.registerProperty = async (req, res) => {
    await check('title').notEmpty().withMessage('Title is required').run(req);
    await check('description').isLength({ max: 500 }).withMessage('Description must contain less 500 characters').run(req);
    await check('price').notEmpty().withMessage('Price is required').run(req);
    await check('owner').notEmpty().withMessage('Owner is required').run(req);

    let result = validationResult(req)
    if (result.isEmpty()) {
        const newProperty = await Property.create(req.body);
        res.send('Property saved');
    } else {
        return res.render('property/formProperty.pug', {
            page: 'Register your Property',
            errors: result.array(),
            property:{
                title: req.body.title,
                description: req.body.description,
                owner: req.body.owner,
                price: req.body.price
            }
        });
    }
}

export default propertyController;