const express = require("express");
const router = require('express').Router()
const { check, validationResult } = require('express-validator');
const Contact = require('../model/Contact')
const Hire = require('../model/Hire')

router.post('/store-data', [ check('name','Name is required').not().isEmpty().isLength({ min: 6}) .withMessage('Name must be at least 6 chars long') ,check('email','Email is required').isEmail().normalizeEmail(),check('phone','Phone number is required').not().isEmpty().isLength({ min: 10,max:10}) .withMessage('Phone no. must be 10 digits'),check('country','Country is required').not().isEmpty(),check('service','Service is required').not().isEmpty(),check('message','Message is required').not().isEmpty() ],async (req,res)=>{
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
})

//Hire A Developer
router.post('/store-hire-a-developer', [ check('name','Full Name is required').not().isEmpty().isLength({ min: 6}) .withMessage('Full Name must be at least 6 chars long') ,check('email','Email is required').isEmail().normalizeEmail(),check('phone','Phone number is required').not().isEmpty().isLength({ min: 10,max:10}) .withMessage('Phone no. must be 10 digits'),check('company','Company / Organization is required').not().isEmpty(),check('message','Message is required').not().isEmpty() ],async (req,res)=>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                errors: errors.array()
            });
        }

        const request = req.body;
        const hire = new Hire(request)

        let response = await hire.save()

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
})
module.exports = router