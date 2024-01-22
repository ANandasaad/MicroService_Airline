const { CityRepository } = require("../respository/index.js");

class CityService {
  constructor() {
    this.cityRepository = new CityRepository();
  }
  async createCity(data) {
    try {
      const city = await this.cityRepository.createCity(data);
      return city;
    } catch (error) {
      console.log("Something went wrong while creating city");
      throw { error };
    }
  }
  async bulkCreateCity(data) {
    try {
      const cities = await this.cityRepository.bulkCreateCity(data);
      return cities;
    } catch (error) {
      console.log("Something went wrong while uploading cities");
      throw { error };
    }
  }
  async deleteCity(cityId) {
    try {
      const city = await this.cityRepository.deleteCity(cityId);
      return city;
    } catch (error) {
      console.log("Something went wrong while deleting city");
      throw { error };
    }
  }
  async getCities(filter) {
    try {
      const city = await this.cityRepository.getAllCity(filter);
      return city;
    } catch (error) {
      console.log("Something went wrong while getting cities");
      throw { error };
    }
  }
  async update(cityId, data) {
    try {
      const city = await this.cityRepository.updateCity(cityId, data);
      return city;
    } catch (error) {
      console.log("Something went wrong while updating cities");
      throw { error };
    }
  }
  async getCityByCityId(cityId) {
    try {
      const city = await this.cityRepository.getCityById(cityId);
      return city;
    } catch (error) {
      console.log("Something went wrong while getting City by Id");
      throw { error };
    }
  }
}

module.exports = CityService;
