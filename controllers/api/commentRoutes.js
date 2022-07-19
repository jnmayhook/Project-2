const router = require("express").Router();
// const { json } = require("sequelize/types");
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            include: [
                {
                    model: Post,
                    include: {
                        model: User,
                        attributes: { exclude: ["password"] },
                    }
                },

            ]
        })
        res.json(allComments)
    } catch (err) {
        res.status(500).json(err); 
    }
})

router.post("/", withAuth, async (req, res) => {
    // try {
        const newComment = await Comment.create({
            // Placeholder until frontend made
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        res.status(200).json(newComment);
        console.log(newComment)

    // } catch (err) {
    //     res.status(400).json(err);
    // }
}); 

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const deletedComment = Comment.destroy({
            where: {
                id: req.params.id
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;