const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            // Placeholder until frontend FETCH requests are made - to be replaced with [...req.body] later
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            //Placeholder
            title: req.body.title,
            post_text: req.body.post_text
        },
            {
                where: {
                    id: req.params.id,
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