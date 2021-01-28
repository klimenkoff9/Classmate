const router = require('express').Router()
module.exports = router

// Mounts players api calls from api file on /api/players
router.use('/user', require('./user'))
router.use('/search', require('./search'))

// test

router.get('/search', function (req, res) {
  res.send('hello world')
})

router.get('/search/:query', async (req, res, next) => {
  try {
    if (req.body.query) {
      res.send(req.body.query)
    }
  } catch (error) {
    res.status(401).send(error)
  }
})

//Anything not found gets a 404
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

//Export our api so we can use it on our server index file(main exit point for server)
