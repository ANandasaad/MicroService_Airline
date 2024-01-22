const { CityService } = require("../services/index.js");

const cityService = new CityService();
const create = async (req, res, next) => {
  try {
    const city = await cityService.createCity(req.body);
    res.json({
      success: true,
      message: "City created successfully",
      data: city,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error creating city",
      data: {},
      err: error.error,
    });
  }
};
const bulkCreate = async (req, res, next) => {
  try {
    const data = req.body;

    const response = await cityService.bulkCreateCity(data);
    res.json({
      success: true,
      message: "Upload Cities data successfully",
      data: response,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error creating cities",
      data: {},
      err: error.error,
    });
  }
};
const deleteCity = async (req, res, next) => {
  try {
    const city = await cityService.deleteCity(req.params.cityId);
    res.json({
      success: true,
      message: "City deleted successfully",
      data: city,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error deleting city",
      data: {},
      err: error,
    });
  }
};
const update = async (req, res, next) => {
  try {
    const city = await cityService.update(req.params.cityId, req.body);
    res.json({
      success: true,
      message: "City updated successfully",
      data: city,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error updating city",
      data: {},
      err: error,
    });
  }
};

const getCityByCityId = async (req, res, next) => {
  try {
    console.log(req.params.cityId);
    const city = await cityService.getCityByCityId(req.params.cityId);
    res.json({
      success: true,
      message: "Get city by Id successfully",
      data: city,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error getting city",
      data: {},
      err: error,
    });
  }
};
const getCities = async (req, res, next) => {
  try {
    const cities = await cityService.getCities(req.query);
    res.json({
      success: true,
      message: "Get cities successfully",
      data: cities,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error getting cities",
      data: {},
      err: error,
    });
  }
};

module.exports = {
  create,
  bulkCreate,
  deleteCity,
  update,
  getCityByCityId,
  getCities,
};
