const express = require("express");
const apartmentsRouterController = require("../apartments/routes/apartmentRestController.js");
const usersRouterController = require("../users/routes/usersRestController");
const chatsRouterController = require("../chat/controllers/chatRestController.js");
const { handleError } = require("../utils/handleErrors.js");

const router = express.Router();

router.use("/apartments", apartmentsRouterController);
router.use("/users", usersRouterController);
router.use("/chat", chatsRouterController);

router.use((req, res) => {
    handleError(res, 404, "Path not found");
});

module.exports = router;