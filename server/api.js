const express = require("express");
const router = express.Router();
const models = require('./models');
// const fileUpload = require('express-fileupload');
const csv = require('csvtojson');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const app = require('./index');


// About page route.
router.get("/about", function (req, res) {
    res.send("About this wiki");
});

router.post('/upload', async (req, res) => {
    console.log(req);
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

router.get('/search/:term', async (req, res) => {
    const results = await models.Patent.findAll({
        where: { 
            vector: { [Op.match]: sequelize.fn('to_tsquery', req.params.term) }
        }
    });
    res.json(results);
});


module.exports = router;
