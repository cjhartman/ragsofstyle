const express = require('express');
const router = express.Router();
const PhotoSchema = require('../../models/Photos')

/**
 * @route Post api/route/addItem
 * @desc add item to DB
 * @access Private
 */