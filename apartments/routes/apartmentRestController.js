const express = require("express");
const { createApartment, getApartments, getApartmentById, updateApartment, likeApartment, deleteApartment } = require("../models/apartmentAccessDataService");
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

router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const newApartment = req.body;
        const fullApartmentFromDb = await getApartmentById(id);
        if (userInfo._id != fullApartmentFromDb.owner.ownerId && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the apartment or admin can update its details");
        }
        let apartment = await normalizeApartment(newApartment, userInfo._id);
        apartment = await updateApartment(id, apartment);
        res.send(apartment);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        let apartment = await likeApartment(id, userInfo._id);
        res.send(apartment);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const fullApartmentFromDb = await getApartmentById(id);
        if (userInfo._id != fullApartmentFromDb.owner.ownerId && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the apartment or admin can delete it");
        }
        let apartment = await deleteApartment(id);
        res.send(apartment);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


module.exports = router;