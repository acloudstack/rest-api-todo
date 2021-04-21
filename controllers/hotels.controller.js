const HotelsModel = require("../model/hotels.model");

exports.getHotels= async (req, res, next) => {
    try{
        const data = await HotelsModel.find({});
        res.status(200).json(data);
    } catch(err){
        next(err);
    }
};