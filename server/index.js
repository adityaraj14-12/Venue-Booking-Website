const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const dbConfig = require("./db");
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const reviewRoute = require("./routes/reviewRoute"); // Import the review route

app.use(express.json());
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute); // Use the review route

const port = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node app listening on ${port} port!`));
