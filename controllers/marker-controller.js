const { trusted } = require("mongoose");
const Marker = require("../models/marker-model");

createMarker = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a marker",
    });
  }

  const marker = new Marker(body);

  if (!marker) {
    return res.status(400).json({ success: false, error: err });
  }

  marker
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: marker._id,
        marker: marker,
        message: "Marker created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Marker not created!",
      });
    });
};

getMarkers = async (_, res) => {
  await Marker.find({})
    .then((markers, err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!markers.length) {
        return res
          .status(404)
          .json({ success: false, error: `Marker not found` });
      }
      return res.status(200).json({ success: true, data: markers });
    })
    .catch((err) => console.log(err));
};

getMarkersByArea = async (req, res) => {
  await Marker.find({ area: req.params.area })
    .then((markers, err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: markers });
    })
    .catch((err) => console.log(err));
};

getMarkerById = async (req, res) => {
  await Marker.findOne({ _id: req.params.id })
    .then((marker, err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, marker: marker });
    })
    .catch((err) => console.log(err));
};

deleteMarker = async (req, res) => {
  await Marker.findOneAndDelete({ _id: req.params.id })
    .then((marker, err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!marker) {
        return res
          .status(404)
          .json({ success: false, error: `Marker not found` });
      }

      return res.status(200).json({ success: true, data: marker });
    })
    .catch((err) => console.log(err));
};

const updateMarker = async (req, res) => {
  try {
    const updatedResult = await Marker.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res.status(200).json({ success: true, data: updatedResult });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMarker,
  getMarkers,
  getMarkersByArea,
  deleteMarker,
  updateMarker,
  getMarkerById
};
