const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const contactController = require('../controllers/contactController')
const applicationController = require('../controllers/applicationController')

router.post('/', userControllers.register)//register
router.post('/login', userControllers.login)//login
router.post('/logout', userControllers.logout)//logout
router.post('/contact', contactController.contact)//contact
router.post('/application', applicationController.apply) //job application

module.exports = router