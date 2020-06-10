const express = require('express');
const router = express.Router();
const PhotoSchema = require('../../models/Photos')

/**
 * @route Post api/route/addItem
 * @desc add item to DB
 * @access Private
 */

router.post('/upload', (req, res) => {
   let = {
      title,
      color,
      size,
      description,
      price,
      extras,
      selectedImages
   } = req.body

   //check to see that title is unique
   PhotoSchema.findOne({title: title}).then(photo => {
      if (photo) {
         return res.status(400).json({
            msg: "Title is already in use, please change it to a different one"
         });
      }
   });

   let newItem = new PhotoSchema({
      title,
      color,
      size,
      description,
      price,
      extras,
      selectedImages
   });

   newItem.save().then(item => {
      return res.status(201).json({
         success: true,
         msg: "New Item has been uploaded"
     })
   });
});

router.get('/upload', (req, res) => {
   return req.body
});

module.exports = router;