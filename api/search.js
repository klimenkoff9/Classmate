const express = require('express')
const router = express.Router()
const Search = require('../db/models/search')
const {
  Op
} = require('sequelize')

/* // api/search/class/:className/:classNumber
 *
 * This route allows user to search for a specific faculty using req.params
 *
 * Notice that for className and classNumber we only use '%' after string
 * where as for facultyName we will be using '%' before and after.
 * That means that the first character ofr className and classNumber must
 * be exact. e.g. 'C' -> 'CAST, CISC, CLAS ...' and not -> 'FINC'
 */
router.get('/class/:className/:classNumber', async (req, res, next) => {
  const className = (req.params.className + '%').toUpperCase()
  const classNumber = (req.params.classNumber + '%').toUpperCase()

  console.log('Search (className classNumber) -->', className, classNumber)

  try {
    const classes = await Search.findAll({
      where: {
        className: {
          [Op.like]: className
        },
        classNumber: {
          [Op.like]: classNumber
        },
      },
    })
    res.status(200).json(classes)
  } catch (error) {
    res.status(500).json({
      message: 'An error occured'
    })
    next(error)
  }
})

/* // api/search/faculty/:facultyName
 *
 * This route allows user to search for a specific faculty using req.params
 */
router.get('/faculty/:facultyName', async (req, res, next) => {
  const facultyName = '%' + req.params.facultyName + '%'

  console.log('Search (faculty) -->', facultyName)

  try {
    const classes = await Search.findAll({
      where: {
        // iLike is case-insensitive
        facultyName: {
          [Op.iLike]: facultyName
        },
      },
    })
    res.status(200).json(classes)
  } catch (error) {
    res.status(500).json({
      message: 'An error occured'
    })
    next(error)
  }
})

/* // api/search/get
 *
 * This route allows user to search for a specific faculty with a specific class
 * using req.body instead of req.params;
 *
 * You may set any of the three fields empty (facultyName, className, classNumber)
 * and it will IGNORE those specific fields you've left empty in its search
 */
router.get('/get', async (req, res, next) => {
  let facultyName = req.body.facultyName
  let className = req.body.className
  let classNumber = req.body.classNumber

  // if the variable is not undefined or empty, then add % symbols before and after,
  // otherwise, just set the string as empty '%' (which matches ALL rows of that column)
  facultyName = (facultyName && '%' + facultyName + '%') || '%'
  className = (className && ('%' + className + '%').toUpperCase()) || '%'
  classNumber = (classNumber && ('%' + classNumber + '%').toUpperCase()) || '%'

  console.log(
    'Search (faculty, className: classNumber) -->',
    `${facultyName}, ${className}: ${classNumber}`
  )

  try {
    const classes = await Search.findAll({
      where: {
        facultyName: {
          [Op.iLike]: facultyName,
        },
        className: {
          [Op.like]: className,
        },
        classNumber: {
          [Op.like]: classNumber,
        },
      },
    })

    res.status(200).json(classes)
  } catch (error) {
    res.status(500).json({
      message: 'An error occured'
    })
    next(error)
  }
})

// Get info for a single class

router.get("/class/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const info = await Search.findOne({
      where: {
        id: req.params.id
      }
    })
    console.log(info);
      if (!info) {
        res.status(200).send("No info found");
      } else {
        res.status(200).json(info);
      }
    } catch (error) {
    next(error);
  }
});


module.exports = router
