const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb"); // or ObjectID
var fs = require("fs");

async function main() {
  const uri =
    "mongodb+srv://rxtang:Yiersansi@interactive-map.vvpcrjm.mongodb.net/ritcher-map?retryWrites=true&w=majority";

  const data = [];

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const nulls = await findNullLatLng(client);
    for (var i = 0; i < nulls.length; i++) {
      await client
        .db("ritcher-map")
        .collection("markers")
        .updateOne(
          { _id: new ObjectId(nulls[i]._id) },
          { $set: { lat: nulls[i].coordinate[0], lng: nulls[i].coordinate[1] } }
        );
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
