const express = require("express");
const router = require('express').Router()
const { check, validationResult } = require('express-validator');
const Contact = require('../model/Contact')
const Hire = require('../model/Hire')
const Post = require('../model/Post')
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
// CONTACT US
router.post('/store-data', [ check('name','Name is required').not().isEmpty().isLength({ min: 6}) .withMessage('Name must be at least 6 chars long') ,check('email','Email is required').isEmail().normalizeEmail(),check('phone','Phone number is required').not().isEmpty().isLength({ min: 10,max:10}) .withMessage('Phone no. must be 10 digits'),check('country','Country is required').not().isEmpty(),check('service','Service is required').not().isEmpty(),check('message','Message is required').not().isEmpty() ],async (req,res)=>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                errors: errors.array()
            });
        }
        const hbs = require('nodemailer-express-handlebars')
        var nodemailer = require('nodemailer');
        const path = require('path')
        const request = req.body;
        
        // initialize nodemailer
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sales@techzarinfo.com',
            pass: 'cykwmwndsokrtcrv'
        }
        });

        // point to the template folder
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        };

        // use a template file with nodemailer
        transporter.use('compile', hbs(handlebarOptions))
        
        var mailOptions = {
            from: request.email,
            to:  'sales@techzarinfo.com',
            bcc:  request.email,
            subject: 'CONTACT US',
            template: 'contact', // the name of the template file i.e email.handlebars
            context:{
                name: request.name, 
                phone: request.phone, 
                email: request.email, 
                country: request.country, 
                service: request.service, 
                message: request.message
            }
        };

        // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, async function(error, info){
            if (error) {
                return res.status(200).json({
                    message: err.message,
                    status: 0
                });
            } else {
                const contact = new Contact(request)

                let response = await contact.save()

                if(response) {
                    return res.status(200).json({
                        message: 'Your request sent successfully',
                        status: 1
                    });
                } else {
                    return res.status(200).json({
                        message: err.message,
                        status: 0
                    });
                }
            }
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
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
        const hbs = require('nodemailer-express-handlebars')
        var nodemailer = require('nodemailer');
        const path = require('path')
        const request = req.body;
        
        // initialize nodemailer
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sales@techzarinfo.com',
            pass: 'cykwmwndsokrtcrv'
        }
        });

        // point to the template folder
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        };

        // use a template file with nodemailer
        transporter.use('compile', hbs(handlebarOptions))
        
        var mailOptions = {
            from: request.email,
            to: 'sales@techzarinfo.com',
            bcc:  request.email,
            subject: 'HIRE A DEVELOPER',
            template: 'hire-a-developer', // the name of the template file i.e email.handlebars
            context:{
                name: request.name, 
                phone: request.phone, 
                email: request.email, 
                company: request.company, 
                message: request.message
            }
        };

        // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, async function(error, info){
            if (error) {
                return res.status(200).json({
                    message: err.message,
                    status: 0
                });
            } else {
                const hire = new Hire(request)

                let response = await hire.save()

                if(response) {
                    return res.status(200).json({
                        message: 'Your request sent successfully',
                        status: 1
                    });
                } else {
                    return res.status(200).json({
                        message: err.message,
                        status: 0
                    });
                }
            }
        });
        
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: 0
        })
    }
})
//Post
router.post('/store-post', upload.single('image'),[ check('title','title is required').not().isEmpty().isLength({ min: 6}) .withMessage('Title must be at least 6 chars long'), check('message','Message is required').not().isEmpty() ],  async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (req.file) {
            console.log('Uploaded: ', req.file);
            // Homework: Upload file to S3
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    status: 0,
                    errors: errors.array()
                });
            }
            const path = require('path')
            req.body.image = req.file.filename;
            const request = req.body;

            const post = new Post(request)

            let response = await post.save()

            if(response) {
                return res.status(200).json({
                    message: 'Your post saved successfully',
                    status: 1
                });
            } else {
                return res.status(200).json({
                    message: err.message,
                    status: 0
                });
            }
          }
        
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: 0
        })
    }
})
//Get Post
router.post('/get-post', async (req,res)=>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                errors: errors.array()
            });
        }
        const path = require('path')
        const request = req.body;

        const post = new Post(request)

        let response = await post.get()

        if(response) {
            return res.status(200).json({
                data: response,
                status: 1
            });
        } else {
            return res.status(200).json({
                message: err.message,
                status: 0
            });
        }
        
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: 0
        })
    }
})
//Get Post
router.get('/get-post/:post_id', async (req,res)=>{
    try {
        let response = await Post.findById(req.params.post_id)
        if(response){
            return res.send(response)
        }else{
            return res.status(500).json({
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