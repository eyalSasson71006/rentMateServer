const express = require("express");
const { createApartment, getApartments, getApartmentById, updateApartment, likeApartment, deleteApartment, reviewApartment } = require("../models/apartmentAccessDataService");
const { handleError } = require("../../utils/handleErrors");
const auth = require("../../auth/authService");
const normalizeApartment = require("../helpers/normalizeApartment");
const normalizeSearchParams = require("../helpers/normalizeSearchParams");
const calculateRating = require("../../users/helpers/calculateRating");
const validateApartment = require("../validation/apartmentValidationService");


const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const error = validateApartment(req.body);
        if (error) handleError(res, 400, "Validation error: " + error);

        const userInfo = req.user;
        let apartment = await normalizeApartment(req.body, userInfo._id);
        apartment = await createApartment(apartment);
        res.status(201).send(apartment);
    } catch (error) {
        handleError(res, 400, error.message);

    }
});

router.get("/", async (req, res) => {
    try {
        let params = req.query || {};
        params = normalizeSearchParams(params);
        let apartments = await getApartments(params);
        res.send(apartments);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.get("/apartment-reviews/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let apartment = await getApartmentById(id);
        if (apartment?.reviews.length > 0) {
            const { reviews, rating } = calculateRating([apartment]);
            await updateApartment(id, { rating: rating });
            res.send(reviews);
        }
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.patch("/review/:id", auth, async (req, res) => {
    try {
        const newReview = req.body;
        const { id } = req.params;
        let apartment = await reviewApartment(id, newReview);
        res.send(apartment.reviews);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
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
        if (userInfo._id != fullApartmentFromDb.owner && !userInfo.isAdmin) {
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
        if (userInfo._id != fullApartmentFromDb.owner && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the apartment or admin can delete it");
        }
        let apartment = await deleteApartment(id);
        res.send(apartment);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


module.exports = router;