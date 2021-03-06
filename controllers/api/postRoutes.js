const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// For testing: to view all posts in database
router.get("/", async (req, res) => {
    try {
        const allPostData = await Post.findAll({
            include: [
                { model: User,
                attributes: { exclude: ["password"]} 
            },
            ]
        }); 

        const allPosts = allPostData.map((post) => post.get({ plain: true }));
        res.json(allPosts);
    } catch (err) {
        res.status(500).json(err); 
    }
})

// For devs
router.get("/:id", async (req, res) => {
    try {
        const onePostData = await Post.findByPk(req.params.id,{
        }); 
        res.json(onePostData); 
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(newPost); 
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            post_text: req.body.post_text
        },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            });

        if (!updatedPost) {
            res.status(404).json({ message: "No post found with this ID." });
            return;
        };
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!deletedPost) {
            res.status(404).json({ message: "No post found with this ID." });
            return;
        }
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;