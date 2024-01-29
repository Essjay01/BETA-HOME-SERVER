const Inspections = require('../models/inspection')

//create inspection
const createInspection = async (req,res) => {
    // res.send("create inspection");
    try {
        const inspection = await Inspections.create({...req.body});
        res.status(201).json({success: true, inspection})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
};

//get all inspection is private and you have to be loggedIn and admin
const getAllInspections = async (req,res) => {
    // res.send("get all inspection");
    try {
        const inspection = await Inspections.find().sort("-createdAt")
        res.status(200).json({success: true, inspection})
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "internal server error"})
    }
}

module.exports ={createInspection, getAllInspections}