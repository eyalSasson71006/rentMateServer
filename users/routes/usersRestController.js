const express = require("express");
const { registerUser, getUsers, getUserById, loginUser } = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        // // only admin can - currently disabled for development
        // const userInfo = req.user;
        // if (!userInfo.isAdmin) {
        //     return res
        //         .status(403)
        //         .send(
        //             "Authorization Error: Only an admin can get all users details"
        //         );
        // }
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only an admin or the user itself can get its details");
        }
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

module.exports = router;