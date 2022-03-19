import { Meteor } from 'meteor/meteor';

const accountSid = Meteor.settings.public.TWILIO_ACCOUNT_SID;
const authToken = Meteor.settings.public.TWILIO_ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+15139534563',
    to: '+18087821617',
  })
  .then(message => console.log(message.sid));
