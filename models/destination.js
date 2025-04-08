const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// City Schema
const citySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'City' },
});
mongoose.model('City', citySchema);

// Hiking Schema
const hikingSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'Hiking' },
});
mongoose.model('Hiking', hikingSchema);

// Island Schema
const islandSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'Island' },
});
mongoose.model('Island', islandSchema);

// Destination Schema
const destinationSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['City', 'Hiking', 'Island'] },
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
