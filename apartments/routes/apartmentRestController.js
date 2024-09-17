const express = require("express");
const { createApartment, getApartments, getApartmentById } = require("../models/apartmentAccessDataService");
const { handleError } = require("../../utils/handleErrors");
const auth = require("../../auth/authService");


const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        let apartment = await createApartment(req.body);
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