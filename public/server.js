const express = require("express");
const bodyParser = require("body-parser");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // To handle cross-origin requests

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS to allow requests from other origins

// Define the path for the Excel file
const filePath = path.resolve(__dirname, "scores.xlsx");

app.post("/save-score", async (req, res) => {
    const { name, score, timestamp } = req.body;

    // Validate the input
    if (!name || typeof score !== "number" || !timestamp) {
        return res.status(400).send({ error: "Invalid data provided" });
    }

    try {
        let workbook;
        let worksheet;

        // Check if the file already exists
        if (fs.existsSync(filePath)) {
            // Load the existing workbook
            workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);

            // Get the first worksheet
            worksheet = workbook.getWorksheet(1);
        } else {
            // Create a new workbook and worksheet
            workbook = new ExcelJS.Workbook();
            worksheet = workbook.addWorksheet("Scores");

            // Define the columns
            worksheet.columns = [
                { header: "Name", key: "name", width: 25 },
                { header: "Score", key: "score", width: 10 },
                { header: "Timestamp", key: "timestamp", width: 30 },
            ];
        }

        // Add the new row
        worksheet.addRow({ name, score, timestamp }).commit();

        // Save the workbook back to the file
        await workbook.xlsx.writeFile(filePath);

        console.log(`Score saved: Name=${name}, Score=${score}, Timestamp=${timestamp}`);
        res.status(200).send({ message: "Score saved successfully" });
    } catch (error) {
        console.error("Error saving score:", error);
        res.status(500).send({ error: "Failed to save score" });
    }
});

// Start the server
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
