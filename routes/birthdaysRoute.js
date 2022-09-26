const express = require("express");

const router = express.Router();

const {
  getBirthdays,
  createBirthday,
  updateBirthday,
  deleteBirthday,
} = require("../controllers/birthdayController");
const protect = require("../middleware.js/authMiddleware");

router.get("/", protect, getBirthdays).post("/", protect, createBirthday);

router
  .put("/:id", protect, updateBirthday)
  .delete("/:id", protect, deleteBirthday);

module.exports = router;
