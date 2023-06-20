const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json({ contacts })
});

const postContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    const contact = await Contact.create({ user_id: req.user.id, name, email, phone });
    res.status(201).json({ message: "Create Contact", contact })
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json({ message: `Get contact for ${req.params.id}` })
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    // If user is trying to update someone's else Contact
    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({ message: `Update contact for ${req.params.id}`, updatedContact })
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user's contact");
    }

    await contact.deleteOne();
    res.status(200).json({ message: `Delete contact for ${req.params.id}`, contact })
})

module.exports = { getContacts, postContact, getContact, updateContact, deleteContact };