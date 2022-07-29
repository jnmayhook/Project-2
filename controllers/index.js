const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require("./api"); 
const userPosts = require("./userPosts"); 

router.use('/', homeRoutes); 
router.use('/api', apiRoutes); 

module.exports = router