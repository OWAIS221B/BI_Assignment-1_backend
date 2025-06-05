// models/Event.js
const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
    name: String,
    role: String,
    image: String, // image URL or filename
});

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    type: String,
    image: String, // image URL or filename
    hostedBy: String,
    location: String,
    price: Number,
    details: String,
    dressCode: String,
    ageRestrictions: String,
    speakers: [speakerSchema],
    tags: [String],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
