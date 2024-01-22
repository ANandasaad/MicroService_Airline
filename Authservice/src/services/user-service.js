const { JWT_KEY } = require("../config/serverConfig.js");
const { UserRepository } = require("../repository/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppErrors = require("../utils/error-handlers.js");
class userService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in the service layer");
      throw new AppErrors(
        "ServerError",
        "Something went wrong in the service layer",
        "Logical issue found",
        500
      );
    }
  }
  async destroy(data) {
    try {
      const user = await this.userRepository.destroy(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async getById(userId) {
    try {
      const userGetById = await this.userRepository.getById(userId);
      return userGetById;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async createToken(user) {
    try {
      const result = await jwt.sign(user, JWT_KEY);
      return result;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async verifyToken(token) {
    try {
      const response = await jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in the service layer", error);
      throw { error };
    }
  }

  async checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return await bcrypt.compareSync(
        userInputPlainPassword,
        encryptedPassword
      );
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password does not match");
        throw { error: "incorrect password" };
      }
      const newJWT = await this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const isTokenVerified = this.verifyToken(token);
      if (!isTokenVerified) {
        throw { error: "invalid token" };
      }
      const user = this.userRepository.getById(isTokenVerified.id);
      if (!user) throw new Error("User not found");
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async isAdmin(userId) {
    try {
      const adminRole = await this.userRepository.isAdmin(userId);
      return adminRole;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
}
module.exports = userService;
