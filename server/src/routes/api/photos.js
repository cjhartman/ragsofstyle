const express = require('express');
const router = express.Router();
const passport = require('passport');
const PhotoSchema = require('../../models/Photos')

/**
 * @route Post api/route/addItem
 * @desc add item to DB
 * @access Private
 */

router.post('/upload', (req, res) => {
   let {
      title,
      color,
      size,
      description,
      price,
      extras,
      selectedImages,
      dateAdded,
      onSale
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
      selectedImages,
      dateAdded,
      onSale
   });

   newItem.save().then(item => {
      return res.status(201).json({
         success: true,
         msg: "New Item has been uploaded"
     })
   });
});

/**
 * @route GET api/photos/items
 * @desc Return the Items
 * @access Private
 */
router.get('/items', passport.authenticate('jwt', { 
   session: false
}), (req, res) => {
   return res.json({
      item: req.item
   });
});

module.exports = router;