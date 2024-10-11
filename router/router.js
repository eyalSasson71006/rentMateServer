const express = require("express");
const apartmentsRouterController = require("../apartments/routes/apartmentRestController.js");
const usersRouterController = require("../users/routes/usersRestController");
const chatsRouterController = require("../chat/controllers/chatRestController.js");
const { handleError } = require("../utils/handleErrors.js");
const limiterMiddleware = require("../middlewares/rateLimit");


const router = express.Router();

router.use("/apartments", limiterMiddleware, apartmentsRouterController);
router.use("/users", limiterMiddleware, usersRouterController);
router.use("/chat", chatsRouterController);

router.use((req, res) => {
    handleError(res, 404, "Path not found");
});

module.exports = router;