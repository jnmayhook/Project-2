const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require("../../utils/auth");

router.get("/", withAuth, (res, req) => {
    try {
        const userPostData = Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ["title"]
        }); 

        const allUserPosts = userPostData.map((postData) => postData.get({ plain: true })); 

        res.render("", {
            allUserPosts
        })
    } catch (err) {
        res.status(500).json(err);
    }
}); 



module.exports = router; 