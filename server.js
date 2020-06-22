const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dealRoutes = express.Router();
const PORT = 4000;

let Deal = require('./deal.model');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/deals', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB database connection established successfully');

})

//retrive all items from db
dealRoutes.route('/').get(function (req, res) {
    Deal.find(function (err, deal) {
        if (err) {
            console.log(err);
        } else {            
            res.json(deal)
        }
    });
});

//retrieve deal with specific id from db
dealRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Deal.findById(id, function (err, deal) {
        res.json(deal);        
    });
});

//add a new deal to db
dealRoutes.route('/add').post(function (req, res) {
    let deal = new Deal(req.body);

    deal.save()
        .then(deal => {
            res.status(200).json({ 'deal': 'deal added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new deal failed');
        });
});

//update existing deal item in db
dealRoutes.route('/update/:id').post(function (req, res) {
    Deal.findById(req.params.id, function (err, deal) {
        if (!deal)
            res.status(404).send('data is not found');
        else {            
            deal.id = req.body.id;
            deal.clientName = req.body.clientName;
            deal.opptDescrip = req.body.opptDescrip;
            deal.atlasOpptNum = req.body.atlasOpptNum;
            deal.tcv = req.body.tcv;
            deal.signing = req.body.signing;
            deal.pay = req.body.pay;
            deal.status = req.body.status;
            deal.casBuildTeamSuppIn = req.body.casBuildTeamSuppIn;
            deal.casBuildTeamSuppIn.assets = req.body.casBuildTeamSuppIn.assets;
            deal.casBuildTeamSuppIn.scoping = req.body.casBuildTeamSuppIn.scoping;
            deal.casBuildTeamSuppIn.dealPositioning = req.body.casBuildTeamSuppIn.dealPositioning;
            deal.casBuildTeamSuppIn.delivaeryPrep = req.body.casBuildTeamSuppIn.delivaeryPrep;
            deal.casBuildTeamSuppIn.orals = req.body.casBuildTeamSuppIn.orals;
            deal.casBuildTeamSuppIn.staffingPlan = req.body.casBuildTeamSuppIn.staffingPlan;
            deal.notes = req.body.notes;



            deal.save()
            .then(deal => {
                res.json('Deal updated');
            })
                .catch(err => {
                    res.status(400).send('Update not possible');
                });
                
        }
    });
});

//delete existing deal item in db
dealRoutes.route('/delete/:id').post(function (req, res) {
    Deal.findById(req.params.id, function (err, deal) {
        if (!deal)
            res.status(404).send('data is not found');
        else {
            deal.remove().then(deal => {
                res.json('Deal deleted');
            })
                .catch(err => {
                    res.status(400).send('Delete not successful');
                });
        }
    });
});

app.use('/deals', dealRoutes);

app.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT} `);

})