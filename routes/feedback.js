const express = require('express');
const router = express.Router();


const fs = require('fs');
const feedback = require('../data/feedback.json')

router.use(express.json())
router.use(express.urlencoded({extended: true}))//grabbing data from the header

router.get('/feedback', (req, res) => { 
    
    res.render('feedback')     
    
 })
 router.get('/api', (req, res) => { 

    res.json(feedback)
 })

/// submit a new message 

router.post('/api', (req, res) => { 


    // get our data form the header 
    // get form data 

    let {name, title, message} = req.body //{name. titl}


    //use fs module to write a new message object to that file 

    feedback.unshift(req.body)

    fs.writeFile('data/feedback.json', JSON.stringify(feedback), 'utf8', err=>{

        if(err){
            res.status(420).send(err)
        }
    })


    // sned back all messages the messages with the new message attached

    res.json(feedback)
 })


 //delete----------------
 router.delete('/api/:index', (req, res) => {
    let {index} = req.params
    feedback.splice(index , 1)
    fs.writeFile('data/feedback.json', JSON.stringify(feedback), 'utf8', err=>{

        if(err){
            res.status(420).send(err)
            
        }
        res.json(feedback)
    })

  })

module.exports = router; 


