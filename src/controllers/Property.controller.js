const formProperty = (req,res) => {
    res.render('property/create.pug',{
        page: 'New Property',
        showHeader: true
    })
}

const insertProperty = (req,res) => {
    return 0
}
const updateProperty = (req,res) => {
    return 0
}
const deleteProperty = (req,res) => {
    return 0
}
const findAllProperties = (req,res) => {
    return 0
}
const findAllByUserProperties = (req,res) => {
    return 0
}
const findOneProperty = (req,res) => {
    return 0
}

export {
    formProperty,
    insertProperty,
    updateProperty,
    deleteProperty,
    findAllProperties,
    findAllByUserProperties,
    findOneProperty
}