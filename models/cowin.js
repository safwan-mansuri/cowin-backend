const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cowinSchema = new Schema({
  pinCode: {
    type: String,
    required: true
  },
  vaccineTotal: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Cowin = mongoose.model('Cowin', cowinSchema)
module.exports = Cowin;
