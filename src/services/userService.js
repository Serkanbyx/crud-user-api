const UserModel = require("../models/userModel");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const UserService = {
  getAllUsers() {
    return UserModel.findAll();
  },

  getUserById(id) {
    const user = UserModel.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  },

  createUser({ name, email, age }) {
    const existing = UserModel.findByEmail(email);
    if (existing) {
      throw new AppError("A user with this email already exists", 409);
    }
    return UserModel.create({ name, email, age });
  },

  updateUser(id, { name, email, age }) {
    const currentUser = UserModel.findById(id);
    if (!currentUser) {
      throw new AppError("User not found", 404);
    }

    if (email !== currentUser.email) {
      const existing = UserModel.findByEmail(email);
      if (existing) {
        throw new AppError("A user with this email already exists", 409);
      }
    }

    return UserModel.update(id, { name, email, age });
  },

  deleteUser(id) {
    const deleted = UserModel.delete(id);
    if (!deleted) {
      throw new AppError("User not found", 404);
    }
  },
};

module.exports = UserService;
