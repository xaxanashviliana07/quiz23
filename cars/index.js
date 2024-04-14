import express from "express";
import { connectDB } from "./services/database.js";
import { Car } from "./models/carModel.js";

const app = express();
const port = 3000;

connectDB();
app.get('/api/cars', async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (error) {
      console.error("error handling request", error);
      res.status(500).json({ error: "Internal server error" });
    }
});
  
app.get('/api/cars/:id', async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (car) {
        res.json(car);
      } else {
        return res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
  
app.post('/api/cars', async (req, res) => {
    const car = new Car(req.body);
    try {
      const newCar = await car.save();
      res.status(201).json(newCar);
    } catch (error) {
        console.error("error adding a car", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
  
app.put('/api/cars/:id', async (req, res) => {
    try {
      const car = await Car.findByIdAndUpdate(req.params.id, req.body, { 
        new: true 
    });
      res.json(car);
    } catch (error) {
        console.error("error updating a car", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
  
app.delete('/api/cars/:id', async (req, res) => {
    try {
      await Car.findByIdAndDelete(req.params.id);
      res.json({ message: 'Car deleted' });
    } catch (error) {
        console.error("error deleting a car", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});