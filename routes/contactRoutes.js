const epxress = require("express");
const router = epxress.Router();
const { getContacts, postContact, deleteContact, getContact, updateContact } = require('../controllers/contact');
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(postContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;