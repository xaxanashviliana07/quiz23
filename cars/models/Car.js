import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: String,
    price: Number,
    mileage: Number
  });

const Car = mongoose.model('Car', carSchema);

exports = Car;