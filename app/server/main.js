import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { Meteor } from 'meteor/meteor';

const accountSid = Meteor.settings.public.TWILIO_ACCOUNT_SID;
const authToken = Meteor.settings.public.TWILIO_ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/messages', (req, res) => {

  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+15139534563',
      to: '+18087821617',
    })
    .then(message => console.log(message.sid));
});
