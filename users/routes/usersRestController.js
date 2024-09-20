const express = require("express");
const { registerUser, getUsers, getUserById, loginUser, updateUser } = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeUser = require("../helpers/normalizeUser");
const { getUsersApartments } = require("../../apartments/models/apartmentAccessDataService");
const calculateRating = require("../helpers/calculateRating");

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

router.get("/users-apartments/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const apartments = await getUsersApartments(id);
        res.send(apartments);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});
router.get("/users-reviews/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        let apartments = await getUsersApartments(id);
        const { reviews, rating } = calculateRating(apartments);
        await updateUser(id, { rating: rating });
        res.send(reviews);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        let user = normalizeUser(req.body);
        user = await registerUser(user);
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