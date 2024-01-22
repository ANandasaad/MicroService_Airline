const { User, Role } = require("../models/index");

const bcrypt = require("bcrypt");
const ValidationError = require("../utils/validation-error");
const { NotFound } = require("http-errors");
class UserRepository {
  async create(data) {
    try {
      const { email, password } = data;

      const user = await User.create({
        email: data.email,
        password: data.password,
      });
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }

      console.log("Something went wrong on repository level");
      throw { error };
    }
  }
  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong on repository level");
      throw { error };
    }
  }
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository level");
      throw { error };
    }
  }
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) throw new NotFound("User not found");
      return user;
    } catch (error) {
      console.log("Something went wrong on repository level");
      throw { error };
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);

      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });

      return await user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong on repository level");
      throw { error };
    }
  }
}
module.exports = UserRepository;
