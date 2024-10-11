const express = require("express");
const { registerUser, getUsers, getUserById, loginUser, updateUser, deleteUser } = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeUser = require("../helpers/normalizeUser");
const { getUsersApartments, deleteUsersApartments } = require("../../apartments/models/apartmentAccessDataService");
const calculateRating = require("../helpers/calculateRating");
const { validateRegistration, validateLogin, validateEditUser } = require("../validation/userValidationService");

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

router.get("/users-apartments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const apartments = await getUsersApartments(id);
        res.send(apartments);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});
router.get("/users-reviews/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let apartments = await getUsersApartments(id);
        if (apartments.length > 0) {
            const { reviews, rating } = calculateRating(apartments);            
            await updateUser(id, { rating: rating });
            res.send(reviews);
        }
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const error = validateEditUser(req.body);
        if (error) {
            return handleError(res, 400, `Joi Error: ${error}`);
        };
        const { id } = req.params;
        const userInfo = req.user;
        let user = req.body;

        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only a user or admin can update its details");
        }
        user = await updateUser(id, user);
        res.status(201).send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const error = validateRegistration(req.body);
        if (error) {
            return handleError(res, 400, `Joi Error: ${error}`);
        };
        let user = normalizeUser(req.body);
        user = await registerUser(user);
        res.status(201).send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const error = validateLogin(req.body);
        if (error) {
            return handleError(res, 400, `Joi Error: ${error}`);
        };
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user itself or an admin can delete a user");
        }
        const user = await deleteUser(id);
        await deleteUsersApartments(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

module.exports = router;