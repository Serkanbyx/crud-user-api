const { Router } = require("express");
const UserController = require("../controllers/userController");
const {
  userValidationRules,
  handleValidationErrors,
} = require("../middlewares/validate");

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", userValidationRules, handleValidationErrors, UserController.create);
router.put("/:id", userValidationRules, handleValidationErrors, UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
