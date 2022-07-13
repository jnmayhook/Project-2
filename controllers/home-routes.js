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


module.exports = router;