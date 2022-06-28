const express = require('express')
const router = express.Router()
const GiftExchangeModel = require("../models/gift-exchange")
const { BadRequestError } = require('../utils/errors')

router.post('/pairs', (req, res, next) => {
  try {
    const names = req.body.names;
    const pairs = GiftExchangeModel.pairs(names);
    res.status(200).send(pairs);
  }
  catch (error) {
    next(new BadRequestError())
  }
})

router.post('/traditional', (req, res) => {
  try {
    const names = req.body.names;
    const pairs = GiftExchangeModel.traditional(names);
    res.status(200).send(pairs);
  }
  catch (error) {
    next(new BadRequestError())
  }
})

module.exports = router;
