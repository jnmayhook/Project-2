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
        res.status(400).json(err);
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
            res.status(404).json({ message: "No post found with this ID."}); 
            return; 
        }
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err); 
    }
})

module.exports = router;