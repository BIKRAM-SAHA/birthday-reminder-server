const expressAsyncHandler = require("express-async-handler");
const birthdayModel = require("../models/birthdayModel");
const userModel = require("../models/userModel");

// @desc : get all birthdays
// @route: GET /birthday
// @access: private
const getBirthdays = expressAsyncHandler(async (req, res) => {
  const birthdays = await birthdayModel.find({ user: req.user.id });
  res.json(birthdays);
});

// @desc : add new birthday
// @route: POST /birthday
// @access: private
const createBirthday = expressAsyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.dob) {
    res.status(400);
    throw new Error("Please provide required data");
  }
  const birthdayExists = await birthdayModel.findOne({ name: req.body.name });
  if (birthdayExists) {
    res.status(400);
    throw new Error("Birthday already exists");
  }
  const birthday = await birthdayModel.create({
    name: req.body.name,
    dob: new Date(req.body.dob),
    user: req.user.id,
    imageUrl: req.body.imageUrl || "",
  });
  res.json(birthday);
});

// @desc : get all birthdays
// @route: PUT /birthday
// @access: private
const updateBirthday = expressAsyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.dob) {
    res.status(400);
    throw new Error("Please provide required data");
  }
  const birthdayExists = await birthdayModel.findById(req.params.id);
  if (!birthdayExists) {
    res.status(400);
    throw new Error("Birthday does not exist");
  }
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (birthdayExists.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }
  const updatedBirthday = await birthdayExists.updateOne({
    name: req.body.name,
    dob: req.body.dob,
    imageUrl: req.body.imageUrl || "",
  });
  res.json(updatedBirthday);
});

// @desc : get all birthdays
// @route: DELETE /birthday
// @access: private
const deleteBirthday = expressAsyncHandler(async (req, res) => {
  const birthdayExists = await birthdayModel.findById(req.params.id);
  if (!birthdayExists) {
    res.status(400);
    throw new Error("Birthday does not exist");
  }
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (birthdayExists.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }
  await birthdayExists.delete();
  res.json({ message: `birthday ${req.params.id} deleted` });
});

module.exports = {
  getBirthdays,
  createBirthday,
  updateBirthday,
  deleteBirthday,
};
