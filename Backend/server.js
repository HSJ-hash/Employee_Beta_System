const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// Routes
app.use("/user", require("./routes/User"));
app.use("/project", require("./routes/Project"));
app.use("/vacancy", require("./routes/Vacancy"));
app.use("/team", require("./routes/Team"));
app.use("/chat", require("./routes/Chat"));
app.use("/tasks", require("./routes/Task"));
app.use("/meeting", require("./routes/Meeting"));
app.use("/leaves", require("./routes/Leaves"));
app.use("/api/todos", require("./routes/TodoRoutes"));
app.use("/api/salaries", require("./routes/SalaryRoutes"));
app.use("/api/employees", require("./routes/EmployeeRoutes"));
app.use("/documents", require("./routes/Document"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Setting up the database connection
const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", true); // Optional: suppress deprecation warnings
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully!");
});
