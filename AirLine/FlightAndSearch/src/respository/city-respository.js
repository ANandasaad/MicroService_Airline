const { City } = require("../models/index.js");
const { Op } = require("sequelize");
const { Conflict } = require("http-errors");
class CityRepository {
  async createCity({ name }) {
    try {
      const isCityAlreadyExists = await City.findOne({
        where: {
          name,
        },
      });
      console.log(isCityAlreadyExists);
      if (isCityAlreadyExists) throw new Conflict("City already exists");
      const city = await City.create({ name });
      return city;
    } catch (error) {
      console.log("Error creating city");
      throw { error };
    }
  }
  async bulkCreateCity(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const uploadBulkCities = await City.bulkCreate(data.cities);
        return resolve(uploadBulkCities);
      } catch (error) {
        console.log("Error while uploading cities");
        reject(error);
      }
    });
  }
  async deleteCity(cityId) {
    try {
      const deleteCity = await City.destroy({
        where: {
          id: cityId,
        },
      });
      return deleteCity;
    } catch (error) {
      console.log("Error deleting city");
      throw { error };
    }
  }

  async updateCity(cityId, data) {
    try {
      const city = await City.update(data, {
        where: {
          id: cityId,
        },
      });
      return city;
    } catch (error) {
      console.log("Error updating city");
      throw { error };
    }
  }
  async getCityById(cityId) {
    try {
      const city = await City.findByPk(cityId);
      if (!city) throw new Error("No city found");
      return city;
    } catch (error) {
      console.log("Error getting city");
      throw { error };
    }
  }
  async getAllCity(filter) {
    try {
      if (filter.name) {
        const cities = await City.findAll({
          where: {
            name: {
              [Op.startsWith]: filter.name,
            },
          },
        });
        return cities;
      }
      const city = await City.findAll();
      if (!city.length) throw new Error("Cities is not found");
      return city;
    } catch (error) {
      console.log("Error getting all cities");
      throw { error };
    }
  }
}

module.exports = CityRepository;
