const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((posts) => posts.get({ plain: true }));

        console.log(posts)
        res.render('homepage', {
            posts,
            logged_in: req.session.logged
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
    res.render('login');
});

router.get('/signup', (req, res) => {
    /*// If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }*/
    res.render('signup');
});

router.get('/createpost', withAuth, (req, res) => {
    /*// If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }*/
    res.render('createpost');
});

router.get('/viewpost', withAuth, (req, res) => {
    /*// If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }*/
    res.render('createpost');
});

module.exports = router;