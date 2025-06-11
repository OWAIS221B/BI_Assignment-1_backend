const express = require('express');
const cors = require("cors");
const app = express();

const { initializeDataBase } = require('./db/db.connect');
const Event = require('./models/event.models');

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus: 200 }));


// Connect to DB
initializeDataBase();

app.get('/', (req, res) => {
    res.send('Meetup Events API');
});

app.post('/events', async (req, res) => {
    try {
        const newEvent = req.body;

        if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.image) {
            return res.status(400).json({ error: "title, date, time, and image are required" });
        }

        const savedEvent = await Event.create(newEvent);
        res.status(201).json({ message: 'Event saved to MongoDB', event: savedEvent });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/events/all', async (req, res) => {
    try {
        const allEvents = await Event.find({});
        res.status(200).json(allEvents);
        console.log(allEvents)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
