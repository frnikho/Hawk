const express = require("express");
const router = express.Router();
const questions = require('../controllers/QuestionsController')

router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

module.exports = router;