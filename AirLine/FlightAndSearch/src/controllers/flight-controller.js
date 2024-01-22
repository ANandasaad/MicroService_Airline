const { FlightService } = require("../services/index.js");
const flightService = new FlightService();

const create = async (req, res, next) => {
  try {
    const flight = await flightService.createFlight(req.body);
    res.json({
      success: true,
      message: "flight created successfully",
      data: flight,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error creating flight",
      data: {},
      err: error,
    });
  }
};
const deleteFlight = async (req, res, next) => {
  try {
    const response = await flightService.deleteFlight(req.param.id);
    res.json({
      success: true,
      message: "flight deleted successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error deleting flight",
      data: {},
      err: error,
    });
  }
};
const getFlightById = async (req, res, next) => {
  try {
    const response = await flightService.getFlightById(req.params.id);
    res.json({
      success: true,
      message: "flight retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error getting flight",
      data: {},
      err: error,
    });
  }
};
const getAllFlight = async (req, res, next) => {
  try {
    const response = await flightService.getAllFlights(req.query);
    res.json({
      success: true,
      message: "All flight retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error getting all flight",
      data: {},
      err: error,
    });
  }
 
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await flightService.updateFlight(id, data);
    res.json({
      success: true,
      message: "Updated Flight SuccessFully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while updating flight",
      data: {},
      err: error,
    });
  }
};
module.exports = {
  create,
  deleteFlight,
  getFlightById,
  getAllFlight,
  update
};
