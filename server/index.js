const express = require("express");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config(); // Load environment variables from .env file

const dbConfig = require("./db");
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const reviewRoute = require("./routes/reviewRoute"); // Import the review route

app.post('/api/contact', async (req, res) => {
    const { email, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: 'New Contact Us Message',
      text: `Message from: ${email}\n\n${message}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Message sent successfully');
    } catch (error) {
      res.status(500).send('Failed to send message');
    }
  });
  
app.use(express.json());
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute); // Use the review route

const port = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/verified.html", (req, res) => res.send("<h1>Your email has been successfully verified!</h1><p>Thank you for verifying your email address. You can now log in to your account.</p>"));
app.listen(port, () => console.log(`Node app listening on ${port} port!`));
