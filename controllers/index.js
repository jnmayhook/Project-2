const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require("./api"); 
const userPosts = require("./userPosts"); 

router.use('/', homeRoutes); 
router.use('/api', apiRoutes); 

// router.use("./userposts", userPosts); 

module.exports = router