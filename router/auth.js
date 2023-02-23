const express = require("express");
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const Contact = require("../model/Contact");
const Hire = require("../model/Hire");
const Post = require("../model/Post");
const Career = require("../model/Careers");
const multer = require("multer");
const Register = require("../model/Register");
const upload = multer({ dest: "./public/uploads/" });
const bcrypt = require("bcrypt");
const fs = require('fs');
// CONTACT US
router.post(
  "/store-data",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Name must be at least 6 chars long"),
    check("email", "Email is required").isEmail().normalizeEmail(),
    check("phone", "Phone number is required")
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone no. must be 10 digits"),
    check("country", "Country is required").not().isEmpty(),
    check("service", "Service is required").not().isEmpty(),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(200).json({
          status: 0,
          errors: errors.array(),
        });
      }
      const hbs = require("nodemailer-express-handlebars");
      var nodemailer = require("nodemailer");
      const path = require("path");
      const request = req.body;

      // initialize nodemailer
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sales@techzarinfo.com",
          pass: "cykwmwndsokrtcrv",
        },
      });

      // point to the template folder
      const handlebarOptions = {
        viewEngine: {
          partialsDir: path.resolve("./views/"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views/"),
      };

      // use a template file with nodemailer
      transporter.use("compile", hbs(handlebarOptions));

      var mailOptions = {
        from: request.email,
        to: "sales@techzarinfo.com",
        bcc: request.email,
        subject: "CONTACT US",
        template: "contact", // the name of the template file i.e email.handlebars
        context: {
          name: request.name,
          phone: request.phone,
          email: request.email,
          country: request.country,
          service: request.service,
          message: request.message,
        },
      };

      // trigger the sending of the E-mail
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          return res.status(200).json({
            message: err.message,
            status: 0,
          });
        } else {
          const contact = new Contact(request);

          let response = await contact.save();

          if (response) {
            return res.status(200).json({
              message: "Your request sent successfully",
              status: 1,
            });
          } else {
            return res.status(200).json({
              message: err.message,
              status: 0,
            });
          }
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 0,
      });
    }
  }
);
//Register
router.post(
  "/store-register",
  [
    check("name", "Full Name is required")
      .not()
      .isEmpty()
      .withMessage("Full Name must be at least 6 chars long"),
    check("email", "Email is required").isEmail().normalizeEmail(),
    check("password", "password is required")
      .not()
      .isEmpty()
      .withMessage("password"),
  ],
  async (req, res) => {
    let verify_email=req.body.email;
    let verify=await Register.findOne({ email: verify_email });
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    var regUser=new Register({
      name:req.body.name,
      email:req.body.email,
      password:hashedPwd
    });
    if(!verify){
    let response = await regUser.save();
    if(response){
      return res.status(200).json({
        message: "Your request sent successfully",
        status: 1,
      });
    }
    else{
      return res.status(200).json({
        message: err.message,
        status: 0,
      });
    }
  }
  else{
    return res.status(200).json({
      message: "Your email is Already Exists",
      status: 0,
    });
  }


  }
);
//Login
router.post(
  "/store-login",
  [
    check("email", "Email is required").isEmail().normalizeEmail(),
    check("password", "password is required")
      .not()
      .isEmpty()
      .withMessage("password"),
  ],
  async (req, res) => {
      const admin_email=req.body.email;
      const admin_password=req.body.password;
   
    let response = await Register.findOne({ email: admin_email });
    if(response){
     const res_password=response.password;
     const cmp = await bcrypt.compare(admin_password, response.password);
     if(cmp){
      return res.status(200).json({
        message: "Your request sent successfully",
        status: 1,
        data:response
      });
    }
    else{
      return res.status(500).json({
        message: "Your password is Incorrect",
        status: 0,
      });
    }
    }
    else{
      return res.status(200).json({
        message: "Invalid email ",
        status: 0,
      });
    }

  }
);

//Hire A Developer
router.post(
  "/store-hire-a-developer",
  [
    check("name", "Full Name is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Full Name must be at least 6 chars long"),
    check("email", "Email is required").isEmail().normalizeEmail(),
    check("phone", "Phone number is required")
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone no. must be 10 digits"),
    check("company", "Company / Organization is required").not().isEmpty(),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(200).json({
          status: 0,
          errors: errors.array(),
        });
      }
      const hbs = require("nodemailer-express-handlebars");
      var nodemailer = require("nodemailer");
      const path = require("path");
      const request = req.body;

      // initialize nodemailer
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sales@techzarinfo.com",
          pass: "cykwmwndsokrtcrv",
        },
      });

      // point to the template folder
      const handlebarOptions = {
        viewEngine: {
          partialsDir: path.resolve("./views/"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views/"),
      };

      // use a template file with nodemailer
      transporter.use("compile", hbs(handlebarOptions));

      var mailOptions = {
        from: request.email,
        to: "sales@techzarinfo.com",
        bcc: request.email,
        subject: "HIRE A DEVELOPER",
        template: "hire-a-developer", // the name of the template file i.e email.handlebars
        context: {
          name: request.name,
          phone: request.phone,
          email: request.email,
          company: request.company,
          message: request.message,
        },
      };

      // trigger the sending of the E-mail
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          return res.status(200).json({
            message: err.message,
            status: 0,
          });
        } else {
          const hire = new Hire(request);

          let response = await hire.save();

          if (response) {
            return res.status(200).json({
              message: "Your request sent successfully",
              status: 1,
            });
          } else {
            return res.status(200).json({
              message: err.message,
              status: 0,
            });
          }
        }
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        status: 0,
      });
    }
  }
);
//Post
router.post(
  "/store-post",
  upload.single("image"),
  [
    check("title", "title is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Title must be at least 6 chars long"),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (req.file) {
        // Homework: Upload file to S3
        if (!errors.isEmpty()) {
          return res.status(200).json({
            status: 0,
            errors: errors.array(),
          });
        }
        const path = require("path");
        req.body.image = req.file.filename;
        const request = req.body;

        const post = new Post(request);

        let response = await post.save();

        if (response) {
          return res.status(200).json({
            message: "Your post saved successfully",
            status: 1,
          });
        } else {
          return res.status(200).json({
            message: err.message,
            status: 0,
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        status: 0,
      });
    }
  }
);
//Edit Post
router.post(
  "/edit-post/:id",
  upload.single("image"),
  [
    check("title", "title is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Title must be at least 6 chars long"),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (req.file) {
        // Homework: Upload file to S3
        if (!errors.isEmpty()) {
          return res.status(200).json({
            status: 0,
            errors: errors.array(),
          });
        }
        const path = require("path");
        req.body.image = req.file.filename;
        const request = req.body;
       const upadteimg=await Post.findById(req.params.id);
       if(upadteimg){
          var imageResponse = upadteimg.image; 
          if(imageResponse!==req.body.image){
          fs.unlink("./public/uploads/"+imageResponse , async (err) => {
            if(!err){
             let response = await Post.findOneAndUpdate({ "_id": req.params.id }, { "$set": { "title": req.body.title, "image": req.body.image, "message": req.body.message, }});
            if (response) {
              return res.status(200).json({
                message: "Your post updated successfully",
                status: 1,
              });
            } else {
            return res.status(200).json({
              message: err.message,
              status: 0,
            });
           }
       }
    });
        }
        else{
          let response = await Post.findOneAndUpdate({ "_id": req.params.id }, { "$set": { "title": req.body.title, "image": req.body.image, "message": req.body.message, }});
          if (response) {
            return res.status(200).json({
              message: "Your post updated successfully",
              status: 1,
            });
          } else {
            return res.status(200).json({
              message: err.message,
              status: 0,
            });
          }
        }
      }

        
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        status: 0,
      });
    }
  }
);
//Get Post
router.get("/get-post", async (req, res, next) => {
  try {
    const data = await Post.find();
    return res.json(data);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//Get Post
router.get("/get-post/:post_id", async (req, res) => {
  try {
    let response = await Post.findById(req.params.post_id);
    if (response) {
      return res.send(response);
    } else {
      return res.status(500).json({
        status: 0,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: 0,
    });
  }
});
//delete Post
router.get("/delete-post/:post_id", async (req, res) => {
     deleteresponse = await Post.deleteOne({_id:req.params.post_id});
    if (deleteresponse) {
      return res.status(500).json({
        status: 1,
        message:"deleted Successfully"
      });
    } else {
      return res.status(500).json({
        status: 0,
        message:"deleted unSuccessfully"
      });
    }
  } );

//Career Start
//Career post
router.post(
  "/store-careers",
  upload.single("image"),
  [
    check("title", "title is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Title must be at least 6 chars long"),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //   if (req.file) {
      // Homework: Upload file to S3
      if (!errors.isEmpty()) {
        return res.status(200).json({
          status: 0,
          errors: errors.array(),
        });
      }
      const path = require("path");
      // req?.body?.image = req?.file?.filename;
      const request = req.body;

      const post = new Career(request);

      let response = await post.save();

      if (response) {
        return res.status(200).json({
          message: "Your post saved successfully",
          status: 1,
        });
      } else {
        return res.status(200).json({
          message: err.message,
          status: 0,
        });
      }
      //   }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        status: 0,
      });
    }
  }
);
//Career get
router.get("/get-careers", async (req, res) => {
  try {
    const data = await Career.find();
    if (data) {
      return res.json(data);
    } else {
      return res.status(500).json({
        status: 0,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: 0,
    });
  }
});
//Career get by id
router.get("/get-careers/:id", async (req, res) => {
  try {
    let response = await Career.findById(req.params.id);
    if (response) {
      return res.send(response);
    } else {
      return res.status(500).json({
        status: 0,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: 0,
    });
  }
});
//Career get by id
router.get("/delete-career/:careers_id", async (req, res) => {
    let delresponse = await Career.deleteOne({_id:req.params.careers_id});
    if (delresponse) {
      return res.status(200).json({
        status: 1,
        message:"deleted Successfully"
      });
    } else {
      return res.status(500).json({
        status: 0,
        message:"deleted unSuccessfully"
      });
    }
});
//Edit Career
router.post(
  "/edit-careers/:id",
  upload.single("image"),
  [
    check("title", "title is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Title must be at least 6 chars long"),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //   if (req.file) {
      // Homework: Upload file to S3
      if (!errors.isEmpty()) {
        return res.status(200).json({
          status: 0,
          errors: errors.array(),
        });
      }
      const path = require("path");
      // req?.body?.image = req?.file?.filename;
      const request = req.body;

  

      let cresponse = await Career.findOneAndUpdate({_id:req.params.id},{"$set":{"title":req.body.title,"message":req.body.message}});
      if (cresponse) {
        return res.status(200).json({
          message: "Your post saved successfully",
          status: 1,
        });
      } else {
        return res.status(200).json({
          message: err.message,
          status: 0,
        });
      }
      //   }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        status: 0,
      });
    }
  }
);
//Career End

// Dashboard
router.get("/dashboard",async(req,res)=>{
  try {
    const users = await Register.count();
    const blogs= await Post.count();
    const careers=await Career.count();
    const contact=await Contact.count();
    if (users) {
      return res.json({
        usersCount:users,
        blogsCount:blogs,
        careersCount:careers,
        contactCount:contact
      });
    } 
      else {
      return res.status(500).json({
        status: 0,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: 0,
    });
  }
});
module.exports = router;
