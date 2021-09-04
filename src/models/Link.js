const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
    {
        link: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        short_link: {
            type: String,
            required: true,
            unique: true
        },
        created_at: {
            type: Date,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model("Link", LinkSchema);