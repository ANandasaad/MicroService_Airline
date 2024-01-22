class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const { name, cityId } = data;

      const result = await this.model.create({
        name,
        cityId,
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in repository");
      throw { error };
    }
  }
  async update(modelId, data) {
    try {
      const result = await this.model.update(data, {
        where: {
          id: modelId.id,
        },
      });

      return result;
    } catch (error) {
      console.log("Something went wrong in repository");
      throw { error };
    }
  }
  async destroy(modelId) {
    try {
      const result = await this.model.destroy({
        where: {
          id: modelId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in repository");
      throw { error };
    }
  }
  async get(modelId) {
    try {
      const result = await this.model.findByPk(modelId);
      return result;
    } catch (error) {
      console.log("Something went wrong in repository");
      throw { error };
    }
  }
  async getAll() {
    try {
      const result = await this.model.findAll();
      return result;
    } catch (error) {
      console.log("Something went wrong in repository");
      throw { error };
    }
  }
  async deleteMany() {
    try {
      const result = await this.model.destroy({
        where: {},
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in repository");
      throw { error };
    }
  }
}
module.exports = CrudRepository;
