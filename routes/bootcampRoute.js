const express = require('express');
const router = express.Router()
const bootcampController = require('../controllers/bootcampController')

router.route('/api/v1/bootcamps')
    .get(bootcampController.getall)
    .post(bootcampController.createbootcamp)

router.route('/api/v1/bootcamps/:id')
    .get(bootcampController.singleOne)
    .put(bootcampController.updatebootcamp)
    .delete(bootcampController.deletebootcamp)



module.exports = router