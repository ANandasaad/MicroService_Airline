const express = require("express");
const CityController = require("../../controllers/city-controller.js");
const FlightController = require("../../controllers/flight-controller.js");
const AirportController = require("../../controllers/airport-controller.js");
const { FlightMiddlewares } = require("../../middlewares/index.js");
const router = express.Router();

router.post("/city", CityController.create);
router.post("/bulk-upload", CityController.bulkCreate);
router.get("/city/:cityId", CityController.getCityByCityId);
router.get("/city", CityController.getCities);
router.put("/city/:cityId", CityController.update);
router.delete("/city/:cityId", CityController.deleteCity);
router.post(
  "/flights",
  FlightMiddlewares.validationCreateFlight,
  FlightController.create
);
router.get("/flights/:id", FlightController.getFlightById);
router.get("/flights", FlightController.getAllFlight);
router.patch("/flights/:id", FlightController.update);
router.post("/airport", AirportController.create);
router.delete("/delete-airports", AirportController.deleteAirports);
router.put("/update-airport/:id", AirportController.updateAirport);
module.exports = router;
