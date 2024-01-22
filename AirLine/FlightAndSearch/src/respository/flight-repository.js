const { Flights } = require("../models/index.js");
const { Op } = require("sequelize");
class FlightRepository {
  #createFilter(data) {
    let filter = {};
    if (data.arrivalAirportId) {
      filter.arrivalAirportId = data.arrivalAirportId;
    }
    if (data.departureAirportId) {
      filter.departureAirportId = data.departureAirportId;
    }
    if (data.minPrice && data.maxPrice) {
      Object.assign(filter, {
        [Op.and]: [
          { price: { [Op.lte]: data.maxPrice } },
          { price: { [Op.gte]: data.minPrice } },
        ],
      });
    }
    if (data.minPrice) {
      Object.assign(filter, { price: { [Op.gte]: data.minPrice } });
    }
    if (data.maxPrice) {
      Object.assign(filter, { price: { [Op.lte]: data.maxPrice } });
    }

    return filter;
  }
  async createFlight(data) {
    try {
      const flight = await Flights.create(data);
      return flight;
    } catch (error) {
      console.log("Failed to create flight");
      throw { error };
    }
  }
  async deleteFlight(id) {
    try {
      const flight = await Flights.destroy({
        where: {
          id,
        },
      });
      return flight;
    } catch (error) {
      throw { error };
    }
  }
  async getAllFlight(filter) {
    try {
      const filterObject = this.#createFilter(filter);
      const flights = await Flights.findAll({
        where: filterObject,
      });
      if (!flights.length) throw new Error("No flights found");
      return flights;
    } catch (error) {
      throw { error };
    }
  }

  async getFlightById(id) {
    try {
      const flight = await Flights.findByPk(id);
      if (!flight) throw new Error("Failed to find flight");
      return flight;
    } catch (error) {
      console.log("Failed to find flight");
      throw { error };
    }
  }
  async updateFlight(id, data) {
    try {
      await Flights.update(data, {
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw {error}
    }
  }
}

module.exports = FlightRepository;
