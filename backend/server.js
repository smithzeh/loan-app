const express = require("express");
const cors = require("cors");
const multer = require("multer");

const upload = multer();
const app = express();

// ✅ IMPORTANT: Use Render's assigned port
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for loan applications
const applications = [];

// Routes

// Get all applications OR search by tracking number
app.get("/applications", (req, res) => {
    const { trackingNumber } = req.query;

    if (trackingNumber) {
        const application = applications.find(
            (app) => app.trackingNumber === trackingNumber
        );

        if (application) {
            return res.json(application);
        } else {
            return res.status(404).json({ message: "Application not found" });
        }
    }

    res.json(applications);
});

// Create new application
app.post("/applications", upload.none(), (req, res) => {
    // ✅ Generate a random 6-character alphanumeric tracking number
    const trackingNumber = Math.random().toString(36).substring(2, 8).toUpperCase();

    const application = {
        id: applications.length + 1,
        trackingNumber, // automatically generated
        name: req.body["full-name"],
        email: req.body.email,
        phone: req.body.phone,
        amountFrom: req.body["amount-from"],
        amountTo: req.body["amount-to"],
        reason: req.body.reason,
        status: "Pending",
    };

    applications.push(application);
    res.status(201).json(application);
});

// Update application status
app.put("/applications/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const application = applications.find((app) => app.id === id);

    if (!application) {
        return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    res.json(application);
});

// Root route (prevents blank page issue)
app.get("/", (req, res) => {
    res.send("Loan API is running successfully 🚀");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
