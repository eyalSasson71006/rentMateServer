const express = require("express");
const apartmentsRouterController = require("../apartments/routes/apartmentRestController.js");
// const usersRouterController = require("../users/routes/usersRestController");

const router = express.Router();

router.use("/apartments", apartmentsRouterController);
// router.use("/users", usersRouterController);

router.use((req, res) => {
    res.status(404).send("Path not found");
});

module.exports = router;