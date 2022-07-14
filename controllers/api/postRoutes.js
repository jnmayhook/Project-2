const router = require("express").Router(); 
const { Post } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create({
            // Placeholder until frontend FETCH requests are made - to be replaced with [...req.body} later
            title: req.body.title, 
            post_text: req.body.post_text,
            user_id: req.session.user_id,
        }); 
        res.status(200).json(newPost); 
    } catch (err) {
        res.status(400).json(err);
    }
}); 


module.exports = router;