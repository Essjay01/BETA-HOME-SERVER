const Property = require('../models/property')
const cloudinary = require("cloudinary").v2
const fs = require('fs')

const handleAddProperty = async (req, res) => {
    // res.send('create new property')
    const{
        title, 
        location, 
        price, 
        propertyType, 
        description, 
        tags, 
        propertyStatus, 
        bedroom, 
        bathrooms, 
        garage, 
        squareFeet, 
        name, 
        phoneNumber, 
        whatsappNumber,
    }=req.body

    const video = req.files.video.tempFilePath

    const images = req.files.images

    const avatar = req.files.avatar.tempFilePath

    try {
        //avatar upload
        const avatarResult = await cloudinary.uploader.upload(avatar, {
            use_filename: true,
            folder: 'betaHome'
        });
        //
        fs.unlinkSync(req.files.avatar.tempFilePath)
        //images upload
        const imageUploadPromises = images.map(async (image) =>{
            const result = await cloudinary.uploader.upload(image.tempFilePath, {
                use_filename: true,
                folder: "betaHome"
            });
            fs.unlinkSync(image.tempFilePath)
            return result.secure_url;
        });

        const uploadedImages = await Promise.all(imageUploadPromises);

        //Video Upload
        const  videoResult = await cloudinary.uploader.upload(video, {
            resource_type: "video",
            folder: "betaHomeVideos"
        });
        fs.unlinkSync(req.files.video.tempFilePath)
        //set up media
        const media = {
            images: [...uploadedImages],
            video: videoResult.secure_url,
        }
        

        //set up salesSupport
        const salesSupport = {
            name,
            phoneNumber,
            whatsappNumber,
            avatar: avatarResult.secure_url,
        }
         
        const property = await Property.create({
            title,
            location,
            price,
            propertyStatus,
            propertyType,
            tags,
            description,
            bedroom,
            bathrooms,
            squareFeet,
            garage,
            media,
            salesSupport,
        })
        res.status(201).json({success: true, property});

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
};

const handleGetAllProperties = async (req, res) => {
    // res.send('get all properties')
    try {
        const allProperties = await Property.find().sort("-createdAt");
        res.status(200).json({success: true, allProperties})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
};

const handleGetRecentProperties = async (req, res) => {
    // res.send('get recent properties')
    try {
        const recentProperties = await Property.find().sort('-createdAt').limit(3);
        res.status(200).json({success: true, properties:recentProperties})
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
        
      }
};

const getASingleProperty = async (req, res) => {
    // res.send('get a single property')
    const {propertyId } = req.params;
    try {
        const property = await Property.findById({_id: propertyId});
        const propertyType = property.propertyType;
        const similarProperties = await Property.find({ propertyType }).limit(3);

        res.status(200).json({success: true, property, similarProperties})
    } catch (error) {
        console.log(error)
        res.json(error)
    }
};

const handleEditProperty = async (req, res) => {
    res.send('Update a property')
};

const handleDeleteProperty = async (req, res) => {
    // res.send('Delete a property')
    const {propertyId} = req.params;
    try {
        await Property.findByIdAndDelete({_id: propertyId});
        res.status(200).json({message: "Property Deleted", success: true})
    } catch (error) {
        console.log(error)
        res.json(error)
    }
};


module.exports = {
    handleAddProperty, 
    handleGetAllProperties, 
    handleGetRecentProperties, 
    handleEditProperty, 
    getASingleProperty, 
    handleDeleteProperty
}