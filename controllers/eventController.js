const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, date, time, participants } = req.body;
    const organizerId = req.user.id;
    if (!title || !organizerId || !date || !time) {
      return res.status(400).json({
        message: "Title, organizer ID, date, and time are required",
        success: false,
      });
    }

    const event = Event.create({
      title,
      date,
      time,
      organizerId,
      participants = [],
    });
    res.status(201).json({
      message: "Event created successfully",
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", success: false });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = Event.getAll();
    console.log("Retrieved events:", events);
    res.status(200).json({
      message: "Events retrieved successfully",
      success: true,
      events,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving events", success: false });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, participants } = req.body;

    const event = Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }

    // ownership check
    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden", success: false });
    }

    event.title = title || event.title;
    event.date = date || event.date;
    event.time = time || event.time;
    event.participants = participants || event.participants;

    res.status(200).json({
      message: "Event updated successfully",
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", success: false });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }

    // ownership check
    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden", success: false });
    }

    Event.deleteById(id);
    res.status(200).json({
      message: "Event deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", success: false });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }

    if (event.participants.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Already registered for this event", success: false });
    }

    event.participants.push(req.user.id);
    res.status(200).json({
      message: "Registered for event successfully",
      success: true,
      event,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering for event", success: false });
  }
};
