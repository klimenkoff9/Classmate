const express = require('express')
const router = express.Router()
// const User = require('../db/models/classes')

router.get('/search/:query', async (req, res, next) => {
  try {
    if (req.body.query) {
      res.send(req.body.query)
    }
  } catch (error) {
    res.status(401).send(error)
  }
})

module.exports = router
