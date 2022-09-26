const express = require("express");

const router = express.Router();

const { login, register, getMe } = require("../controllers/userControler");
const protect = require("../middleware.js/authMiddleware");

router.post("/login", login);

router.post("/register", register);

router.get("/me", protect, getMe);

module.exports = router;
