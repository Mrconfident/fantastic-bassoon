let events = [];

//role: "organizer"
// role: "attendee";
class Event {
  constructor(id, title, date, time, organizerId, participants) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
    this.organizerId = organizerId;
    this.participants = participants;
  }

  static create(eventData) {
    const id = Date.now().toString();
    const { title, date, time, organizerId, participants } = eventData;
    const event = new Event(id, title, date, time, organizerId, participants);
    events.push(event);
    return event;
  }

  static findById(id) {
    return events.find((event) => event.id === id);
  }

  static getAll() {
    return events;
  }
  static deleteById(id) {
    const index = events.findIndex((event) => event.id === id);
    if (index !== -1) {
      events.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Event;
