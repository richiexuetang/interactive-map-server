const express = require("express");

const MarkerController = require("../controllers/marker-controller");

const router = express.Router();

router.get("/markers/:mapSlug", MarkerController.getMarkersByArea);

router.get("/markers/:mapSlug/:markerTypeId", MarkerController.getMarkersByArea);

module.exports = router;
