const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Deal = new Schema({
    id: {
        type: Number
    },
    clientName: {
        type: String
    },
    opptDescrip: {
        type: String
    },
    atlasOpptNum: {
        type: String
    },
    tcv: {
        type: String
    },
    signing: {
        type: String
    },
    pay: {
        type: String
    },
    status: {
        type: String
    },
    casBuildTeamSuppIn: {
        type: Object,
        properties: {
            assets: {
                type: String,
                enum: ['YES', 'NO', 'TBD']
            },
            scoping: {
                type: String,
                enum: ['YES', 'NO', 'TBD']
            },
            dealPositioning: {
                type: String,
                enum: ['YES', 'NO', 'TBD']
            },
            deliveryPrep: {
                type: String,
                enum: ['YES', 'NO', 'TBD']
            },
            orals: {
                type: String,
                enum: ['YES', 'NO', 'TBD']
            },
            staffingPlan: {
                type: String,
                enum: ['YES', 'NO', 'TBD']
            },

        },
    },
    notes: {
        type: String
    },
});

module.exports = mongoose.model('Deal', Deal);