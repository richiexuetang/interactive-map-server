const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb"); // or ObjectID
var fs = require("fs");

async function main() {
  const uri =
    "mongodb+srv://rxtang:Yiersansi@interactive-map.vvpcrjm.mongodb.net/ritcher-map?retryWrites=true&w=majority";

  const data = [
      {
        markerTypeId: 2,
        gameSlug: "totk",
        categoryId: 115,
        markerName: "Manhala Bridge",
        coordinate: [0.6702315495, -0.7556792006],
        lat: 0.6702315495,
        lng: -0.7556792006,
        zoomRange: [ 15, 17 ],
        mapSlug: "hyrule-surface",
      },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
    // {
    //     markerTypeId: 4,
    //     path: [
    //       [, -],
    //       [, -],
    //     ],
    //     parentId: "",
    //     mapSlug: "hyrule-surface",
    //   },
  ];

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    for (var i = 0; i < data.length; i++) {
      await client.db("ritcher-map").collection("markers").insertOne(data[i]);
    }
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);

// Add functions that make DB calls here
async function createMarkers(client, newMarkers) {
  const result = await client
    .db("ritcher-map")
    .collection("markers")
    .insertMany(newMarkers);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function findNullLatLng(client) {
  const result = await client
    .db("ritcher-map")
    .collection("markers")
    .find({ lat: null, lng: null, markerTypeId: 1 })
    .toArray();
  console.log(result);
  return result;
}

async function updateDescription(client, pair) {
  await client
    .db("ritcher-map")
    .collection("markers")
    .updateOne({ _id: pair[0] }, { $set: { description: pair[1] } });
}

async function changeField(client) {
  const markers = await client
    .db("ritcher-map")
    .collection("markers")
    .find({})
    .toArray();
  const result = [];
  markers.map((marker) => {
    const { descriptions, _id } = marker;
    if (descriptions && descriptions.length) {
      let description = "";
      descriptions.map((desc) => {
        description += desc;
      });
      const pair = [_id, description];
      result.push(pair);
    }
  });

  //   var file = fs.createWriteStream("array.txt");

  //   file.on("error", function (err) {
  //     /* error handling */
  //   });
  //   result.forEach(function (v) {
  //     console.log(v[0])
  //     const val = "['" + v[0] + "','" +  v[1] + "'],"
  //     file.write(val);
  //   });
  //   file.end();
  return result;
}
