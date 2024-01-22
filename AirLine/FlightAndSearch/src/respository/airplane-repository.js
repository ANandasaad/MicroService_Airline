const { Airplane } = require("../models/index.js");
class AirplaneRepository {
  async getAirplaneById(id) {
    try {
      const airplane = await Airplane.findByPk(id);

      return airplane;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }
}

module.exports = AirplaneRepository;
