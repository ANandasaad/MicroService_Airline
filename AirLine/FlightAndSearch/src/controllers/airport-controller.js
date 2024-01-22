const { AirportService } = require("../services/index.js");

const airportService = new AirportService();
const create = async (req, res, next) => {
  try {
    const airport = await airportService.create(req.body);
    res.json({
      success: true,
      message: "Airport created successfully",
      data: airport,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error creating airports",
      data: {},
      err: error,
    });
  }
};

const deleteAirports = async (req, res, next) => {
  try {
    const response = await airportService.deleteMany();
    res.json({
      success: true,
      message: "Delete Airports successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while deleting airports",
      data: {},
      err: error,
    });
  }
};
const updateAirport = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params;
    const response = await airportService.update(id, data);
    res.json({
      success: true,
      message: "Airport successfully updated",
      data: response,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while updating airport",
      data: {},
      err: error,
    });
  }
};
module.exports = {
  create,
  deleteAirports,
  updateAirport,
};
