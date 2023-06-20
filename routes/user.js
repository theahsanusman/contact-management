const epxress = require("express");
const router = epxress.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/users');
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser)

router.post("/login", loginUser)


router.get("/current", validateToken, currentUser)

module.exports = router; 