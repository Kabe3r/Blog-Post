const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { c } = require("tar");

// Update
router.put("/:id", async (req, res) => {
     if (req.body.userId === req.params.id) {
      if (req.body.password) {
         const salt = await bcrypt.genSalt(10);
         req.body.password = await bcrypt.hash(req.body.password, salt);
      }     
      try {   
         const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,   
         }, {new: true});   
         res.status(200).json(updateUser);   
      } catch (err) {
            res.status(400).json(err);
	}
    } else {
          res.status(401).json("You can update only your account!");
    }
});

// Delete
router.delete("/:id", async (req, res) => {
      if (req.body.userId === req.params.id) {
       try {                                                 //Find and Delete,
          const user = await User.findById(req.params.id);   //user 
       try {
          await Post.deleteMany({ username: user.username}); //Delete All posts of user by tapping into username of post.     
          await User.findByIdAndDelete(req.params.id)   
          res.status(200).json("User has been deleted...");   
       } catch (err) {
            res.status(400).json(err);
       }
      } catch (err) {                                       //Delete User,
            res.status(404).json("User not found");         //Post also,  
      }                                                     //.....
     } else {
           res.status(401).json("You can delete only your account!");
     }
 });

 // Get User
 router.get("/:id", async(req, res) => {
    try{
      const user = await User.findById(req.params.id);
      const {password, ...another} = user._doc
      res.status(200).json(another);
    } catch (err) {
       res.status(400).json(err);
    }
 });


module.exports = router;
