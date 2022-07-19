const router = require('express').Router();
const { Post, User, Comment } = require('../models');
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
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    /*// If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }*/
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

router.get('/viewpost/:id', async (req, res) => {
    /*// If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }*/
    // try {
        const onePostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment, 
                    // include: {
                    //     model: User, 
                    //     attributes: ["username"]
                    // }
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });

        const onePost = onePostData.get({ plain: true });
        console.log(onePost)
        res.render('viewpost', {
            ...onePost, 
           
        });
    // } catch (err) {
    //     res.status(500).json(err);
    // }    
});

router.get("/editpost/:id", withAuth, async (req, res) => {
    try {
        const editPostData = await Post.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        }); 

        if (!editPostData) {
            res.status(404).json({ message: "You cannot edit this post." });
            return;
        }; 

        const editPost = editPostData.get({ plain: true }); 
        res.render("editpost", {
            editPost, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/user', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ["title"],
        });

        const posts = postData.map((posts) => posts.get({ plain: true }));

        res.render('user', {
            posts,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            attributes: ["title"],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((posts) => posts.get({ plain: true }));

        res.render('user', {
            posts,
        })

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;