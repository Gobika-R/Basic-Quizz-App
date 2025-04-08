const express = require("express");
const bodyParser = require("body-parser");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const excelPath = path.resolve(__dirname, "scores.xlsx");
const textFilePath = path.resolve(__dirname, "scores.txt");

// Route to handle score submission
app.post("/save-score", async (req, res) => {
    const { name, score, timestamp } = req.body;

    if (!name || typeof score !== "number" || !timestamp) {
        return res.status(400).send({ error: "Invalid data provided" });
    }

    try {
        // Save to Excel
        let workbook, worksheet;
        if (fs.existsSync(excelPath)) {
            workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(excelPath);
            worksheet = workbook.getWorksheet(1);
        } else {
            workbook = new ExcelJS.Workbook();
            worksheet = workbook.addWorksheet("Scores");
            worksheet.columns = [
                { header: "Name", key: "name", width: 25 },
                { header: "Score", key: "score", width: 10 },
                { header: "Timestamp", key: "timestamp", width: 30 },
            ];
        }

        worksheet.addRow({ name, score, timestamp });
        await workbook.xlsx.writeFile(excelPath);

        // Append to text file
        const entry = `Name: ${name}, Score: ${score}, Timestamp: ${timestamp}\n`;
        fs.appendFileSync(textFilePath, entry, "utf8");

        console.log(`Score saved: Name=${name}, Score=${score}, Timestamp=${timestamp}`);
        res.status(200).send({ message: "Score saved successfully" });
    } catch (error) {
        console.error("Error saving score:", error);
        res.status(500).send({ error: "Failed to save score" });
    }
});

// Route to download the scores.txt
app.get("/download-scores", (req, res) => {
    if (fs.existsSync(textFilePath)) {
        res.download(textFilePath, "scores.txt");
    } else {
        res.status(404).send("No scores found.");
    }
});

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
