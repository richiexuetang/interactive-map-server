const express = require("express");

const router = express.Router();
const db = require("../db");

router.get("/markers/area/:mapSlug", async (req, res) => {
    const {mapSlug} = req.params;
    let collection = await db.collection("markers");
    let results = await collection.find({mapSlug: mapSlug})
      .toArray();
  
    res.send(results).status(200);
  });

router.get("/markers/:mapSlug/:markerTypeId", async (req, res) => {
    const {mapSlug, markerTypeId} = req.params;
    console.log(mapSlug, markerTypeId)
    let collection = await db.collection("markers");
    let results = await collection.find({mapSlug: mapSlug, markerTypeId: parseInt(markerTypeId)})
      .toArray();
  
    res.send(results).status(200);
  });

module.exports = router;
