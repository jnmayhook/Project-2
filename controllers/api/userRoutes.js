const router = require("express").Router(); 
const { User } = require("../../models");

// create a new user
// TEST VERSION FOR INSOMNIA TESTING
router.post("/", async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        }); 

        req.session.save(() => {
            // req.session.user_id = userData.id; 
            req.session.logged_in = true; 

            res.status(200).json(userData); 
        })
    } catch (err) {
        res.status(400).json(err)
    }
}); 

module.exports = router;