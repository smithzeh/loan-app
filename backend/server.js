const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for loan applications
const applications = [];

// Routes
app.get("/applications", (req, res) => {
    const { trackingNumber } = req.query;
    if (trackingNumber) {
        const application = applications.find(app => app.trackingNumber === trackingNumber);
        if (application) {
            res.json(application);
        } else {
            res.status(404).json({ message: "Application not found" });
        }
    } else {
        res.json(applications);
    }
});

app.post("/applications", upload.none(), (req, res) => {
    const application = {
        id: applications.length + 1,
        trackingNumber: req.body.trackingNumber,
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

app.put("/applications/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const application = applications.find(app => app.id === parseInt(id));

    if (application) {
        application.status = status;
        res.json(application);
    } else {
        res.status(404).json({ message: "Application not found" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});