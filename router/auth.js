const express = require("express");
const router = require('express').Router()
const { check, validationResult } = require('express-validator');
const Contact = require('../model/Contact')
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

router.post('/store-data', [ check('name','Name is required').not().isEmpty().isLength({ min: 6}) .withMessage('must be at least 6 chars long') ,check('email','Email is required').isEmail().normalizeEmail(),check('subject','Subject is required').not().isEmpty(),check('message','Message is required').not().isEmpty() ],async (req,res)=>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                errors: errors.array()
            });
        }

        const request = req.body;
        const contact = new Contact(request)

        let response = await contact.save()

        if(response) {
            return res.status(200).json({
                message: 'Data stored successfully',
                status: 1
            })
        } else {
            return res.status(200).json({
                message: err.message,
                status: 0
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: 0
        })
    }
    // MongoClient.connect(url, function(err, db) {
    //     if (err){
    //         res.json(err)
    //     }
    //     var dbo = db.db("techzar");
    //     var myobj = req.body.formData;
    //     dbo.collection("contacts").insertOne(myobj, function(err, result) {
    //       if (err){
    //         res.json(err)
    //       }
    //       if(result) {
    //             res.json(result)
    //         }
    //       db.close();
    //     });
    //   });
})
module.exports = router