const express = require("express");

const MarkerController = require("../controllers/marker-controller");

const router = express.Router();

router.post("/marker", MarkerController.createMarker);

router.get("/markers/:area", MarkerController.getMarkersByArea);

router.get("/marker/:id", MarkerController.getMarkerById);

router.get("/markers", MarkerController.getMarkers);

router.delete("/markers/:id", MarkerController.deleteMarker);

router.put("/marker/:id", MarkerController.updateMarker);

router.get("/marker/detail/:id", MarkerController.getMarkerDetails);

module.exports = router;
