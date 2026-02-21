const UserService = require("../services/userService");

const UserController = {
  getAll(req, res, next) {
    try {
      const users = UserService.getAllUsers();
      res.json({ success: true, count: users.length, data: users });
    } catch (error) {
      next(error);
    }
  },

  getById(req, res, next) {
    try {
      const user = UserService.getUserById(Number(req.params.id));
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  create(req, res, next) {
    try {
      const user = UserService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  update(req, res, next) {
    try {
      const user = UserService.updateUser(Number(req.params.id), req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  delete(req, res, next) {
    try {
      UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
