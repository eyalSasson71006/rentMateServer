const express = require("express");
const { createApartment, getApartments, getApartmentById } = require("../models/apartmentAccessDataService");
const { handleError } = require("../../utils/handleErrors");
const auth = require("../../auth/authService");
const normalizeApartment = require("../helpers/normalizeApartment");


const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        let apartment = await normalizeApartment(req.body, userInfo._id)
        apartment = await createApartment(apartment);
        res.status(201).send(apartment);
    } catch (error) {
        handleError(res, 400, error.message);

    }
});

router.get("/", async (req, res) => {
    try {
        let apartments = await getApartments();
        res.send(apartments);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let apartment = await getApartmentById(id);
        res.send(apartment);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});


module.exports = router;