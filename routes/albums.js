const express = require('express');
const router = express.Router();

const dataFile = require('../data/data.json'); //node converts json to js object when imported in


const albumsData = dataFile.albums;;  //an array of objects
router.get('/albums', (req, res) => { 
    
    res.render('albums', { albumsData });
});


 module.exports = router;