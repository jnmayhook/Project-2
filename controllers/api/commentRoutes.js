const router = require("express").Router(); 
const { Comment } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create({
            // Placeholder until frontend made
            comment_text: req.body.comment_text, 
            post_id: req.body.post_id, 
            user_id: req.session.user_id
        }); 
        res.status(200).json(newPost); 
    } catch (err) {
        res.status(400).json(err); 
    }
}); 