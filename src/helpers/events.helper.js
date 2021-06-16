const EventEmitter = require('events');

const events = new EventEmitter();

const EVENT_SAVE_LOG = 'EVENT_SAVE_LOG';

module.exports = {
  events,
  EVENT_SAVE_LOG

};
