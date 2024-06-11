const express = require("express");
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  returnCurrentUser,
} = require("../controllers/user");
const { isAdmin, isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", isAuthenticated, getUser);
router.get("/", isAuthenticated, getAllUsers);
router.delete("/:id", isAuthenticated, deleteUser);
router.get("/return", isAuthenticated, returnCurrentUser);

module.exports = router;
