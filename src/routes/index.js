const express = require('express');

const router = express.Router();


const {uploadFile} = require('../middlewares/uploadFile');

// controller

// Books
const {
    getEvent,
    storeEvent,
} = require('../controllers/Events');

// routing


// Books
router.get('/events', getEvent);
router.post('/event', uploadFile('picture'),  storeEvent);

module.exports= router;