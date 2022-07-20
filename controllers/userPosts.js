const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require("../utils/auth");

router.get("/", (res, req) => {
    try {
        let userPostData = Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ["title"]
        }); 

        let allUserPosts = userPostData.map((postData) => postData.get({ plain: true })); 

        res.render("user", {
            allUserPosts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
}); 

// TEST: for viewing the posts of other users
// router.get("/:id", (res, req) => {
//     try {
//         let userPostData = Post.findAll({
//             where: {
//                 user_id: req.params.user_id
//             }, 
//             attributes: [ "title", "post_text" ]
//         }); 

//         let allUserPosts = userPostData.map((postData) => postData.get({ plain: true }));

//         res.render("", {
//             allUserPosts
//         }); 
//     } catch (err) {
//         res.status(500).json(err); 
//     }
// })

module.exports = router; 