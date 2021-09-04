const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const utils = require("../utils/generator");

router.get("/", (req, res) => {
    return res.render("home");
});

router.get("/:link", async (req, res) => {
    try {
        let result = await Link.findOneAndUpdate(
            {
                short_link: req.params.link
            },
            {
                $inc: { views: 1 }
            },
            { new: true }
        );

        if (result == null) {
            return res.render("404");
        }

        return res.redirect(result.link);
    } catch (error) {
        return res.render("internal", { message: error.message });
    } 
});

router.post("/generate", async (req, res) => {
    try {
        const { link } = req.body;
        let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(link);
        if (valid == false) {
            return res.render("internal", { message: "Enter a valid link"});
        }
        let newLink = {
            link,
            short_link: await utils.generateShortURL()
        }
        let result = await Link.create(newLink);
        const homeURL = process.env.homeURL || "http://localhost:3000";
        return res.render("done", { result, homeURL });
    } catch (error) {
        return res.render("internal", { message: error.message });
    }
});

router.get("*", (req, res) => {
    return res.render("404");
});

module.exports = router;