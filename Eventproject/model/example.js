/* 

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'user'],
    default: 'user'
  }
});

// Define the Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Add a method to the Event model to check if the current user is the organizer
eventSchema.methods.isOrganizer = (userId) => {
  return this.organizer.toString() === userId.toString();
};

// Create the User and Event models
const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

// Example usage:
const eventController = {
  // Create a new event
  createEvent: async (req, res) => {
    const { title, description, date, location } = req.body;
    const event = new Event({ title, description, date, location, organizer: req.user.id });
    try {
      await event.save();
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ message: 'Error creating event' });
    }
  },

  // Update an event
  updateEvent: async (req, res) => {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (!event.isOrganizer(req.user.id)) {
      return res.status(403).json({ message: 'Only the event organizer can update this event' });
    }
    const { title, description, date, location } = req.body;
    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    try {
      await event.save();
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ message: 'Error updating event' });
    }
  },

  // Delete an event
  deleteEvent: async (req, res) => {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (!event.isOrganizer(req.user.id)) {
      return res.status(403).json({ message: 'Only the event organizer can delete this event' });
    }
    try {
      await event.remove();
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting event' });
    }
  }
};

module.exports = eventController; */


// Add a middleware to ensure only organizers can update or delete events

/* EventSchema.pre('updateOne', { document: true, query: false }, (next) => {

    const event = this;
  
    const userId = event.organizer.toString();
  
    const updatingUserId = event.getUpdate().$set.organizer;
  
  
    if (updatingUserId && updatingUserId.toString() !== userId) {
  
      return next(new Error('Only the event organizer can update the event'));
  
    }
  
  
    next();
  
  }); */