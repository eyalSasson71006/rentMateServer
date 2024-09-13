const express = require("express");
// const cardsRouterController = require("../cards/routes/apartmentsRestController");
// const usersRouterController = require("../users/routes/usersRestController");

const router = express.Router();

// router.use("/apartments", cardsRouterController);
// router.use("/users", usersRouterController);

router.use((req, res) => {
    res.status(404).send("Path not found");
});

module.exports = router;