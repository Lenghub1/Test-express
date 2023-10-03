const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
// is middleware , function that modify incoming request data
app.use(express.json());
// Use __dirname to get the current directory of the script
const filePath = path.join(__dirname, "dev-data", "data", "tours-simple.json");
const tours = JSON.parse(fs.readFileSync(filePath));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours,
    },
  });
});
app.get("/api/v1/tours/:id", (req, res) => {
    console.log(req.params);
    const id =req.params.id *1
     const tour = tours.find(el => el.id == id)
    if (!tour){
        return res.status(404).json({
            status : 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tour,
      },
    });
  });

  app.patch('/api/v1/tours/:id', (req, res) => {
    // Convert the ID parameter to a number
    const id = req.params.id * 1;
  
    // Find the tour by ID
    const tourIndex = tours.findIndex((el) => el.id === id);
  
    // Check if the tour with the given ID exists
    if (tourIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
    }
  
    // Update the tour's information
    const updatedTour = { ...tours[tourIndex], ...req.body };
    tours[tourIndex] = updatedTour;
  
    // Save the updated tours array to the JSON file
    fs.writeFile(filePath, JSON.stringify(tours), (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to update tour',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    });
  });
  
app.post("/api/v1/tours", (req, res) => {
  const new_id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: new_id }, req.body);

  tours.push(newTour);
  fs.writeFile(filePath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tours: newTour,
      },
    });
  });
});
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
