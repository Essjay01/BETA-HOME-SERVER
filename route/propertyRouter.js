const router = require('express').Router()
const {
    handleAddProperty,
    handleGetAllProperties,
    handleGetRecentProperties,
    handleDeleteProperty,
    handleEditProperty,
    getASingleProperty,
} = require("../contollers/propertyContoller")

router.route('/').get(handleGetAllProperties).post(handleAddProperty)
router.get('/recent',  handleGetRecentProperties)

router.route("/:propertyId").get(getASingleProperty).patch(handleEditProperty).delete(handleDeleteProperty)


module.exports = router;