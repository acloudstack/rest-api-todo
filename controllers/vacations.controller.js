const VacationsModel = require("../model/vacations.model");

exports.getVacations = async (req, res, next) => {
    try{
        const data = await VacationsModel.find({});
        res.status(200).json(data);
    } catch(err){
        next(err);
    }
};
