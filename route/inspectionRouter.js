const router = require("express").Router();
const {getAllInspections, createInspection} = require("../contollers/inspectionController");

router.route("/inspection").get(getAllInspections).post(createInspection);

module.exports = router;