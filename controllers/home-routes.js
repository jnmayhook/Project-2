const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes:['username']
                }
            ]
        });

        const posts = postData.map((posts) => posts.get({ plain: true }));

        console.log(posts)
        res.render('homepage', {
            posts
        })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    /*// If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }*/
    //res.send("hi");
    res.render('login');
  });


module.exports = router;