const express = require('express');
const api = require("./api.js");
const fileUpload = require('express-fileupload');
const app = express();
const middleware = require('./middleware');
const csv = require('csvtojson');
const sequelize = require('sequelize');
const models = require('./models');

app.use("/api", api);
app.use(fileUpload());

app.use(express.static(__dirname + '/public'));


app.post('/upload', async (req, res) => {
    let sampleFile;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line
    sampleFile = req.files.File;
    const data = new TextDecoder().decode(sampleFile.data);
    const csvRow = await csv({noheader:true, output: "csv"}).fromString(data);
    const patents = csvRow.slice(1);
    await Promise.all(patents.map(async (patent) => {
        const row = models.Patent.build({ patentNo: patent[0], description: patent[1], vector: sequelize.fn('to_tsvector', patent[1]) });
        await row.save();
        
    }));
    res.json({status: "success"});
});

app.get('/search/:term', async (req, res) => {
    const results = await models.Patent.findAll({
        where: { 
            vector: { [Op.match]: sequelize.fn('to_tsquery', req.params.term) }
        }
    });
    res.json(results);
});

app.use(middleware.notFound);

app.use(middleware.errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

module.exports = app;
