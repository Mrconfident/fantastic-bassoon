const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/event");

router.post("/", protect, authorize(["organizer"]), createEvent);
router.get("/", protect, getEvents);
router.put("/:id", protect, authorize(["organizer"]), updateEvent);
router.delete("/:id", protect, authorize(["organizer"]), deleteEvent);
router.post(
  "/:id/register",
  protect,
  authorize(["attendee"]),
  registerForEvent,
);
module.exports = router;
