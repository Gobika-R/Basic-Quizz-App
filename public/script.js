const express = require('express');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/save-score', async (req, res) => {
    const { name, score } = req.body;
    console.log(`Received submission: Name - ${name}, Score - ${score}`);

    const filePath = 'scores.xlsx';
    const workbook = new exceljs.Workbook();

    try {
        if (fs.existsSync(filePath)) {
            console.log('File exists, loading the file...');
            await workbook.xlsx.readFile(filePath);
        } else {
            console.log('No existing file found. Creating a new one...');
        }
    } catch (error) {
        console.error('Error reading file:', error);
        return res.status(500).send('Error reading the file.');
    }

    let sheet = workbook.getWorksheet('Scores');
    if (!sheet) {
        console.log('Creating a new worksheet...');
        sheet = workbook.addWorksheet('Scores');
        sheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Score', key: 'score', width: 10 },
        ];
    }

    sheet.addRow({ name, score });

    try {
        await workbook.xlsx.writeFile(filePath);
        console.log('Score saved successfully to the file.');
        res.status(200).send('Score saved successfully!');
    } catch (error) {
        console.error('Error saving the file:', error);
        res.status(500).send('Error saving the score.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
