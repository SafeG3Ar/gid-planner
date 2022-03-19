import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import otplib from 'otplib';

// Two-factor authentication code that generates a secret and stores it into user's account.
// Code credit from https://blog.meteor.com/tutorial-two-factor-authentication-with-meteor-and-totp-21d4a2f9ee51

const userIsLoggedIn = (userId) => {
  if (!userId) {
    throw new Meteor.Error('users.not-authorized');
  }
};

export const generateSecret = new ValidatedMethod({
  name: 'generateSecret',
  validate: null,
  run() {
    userIsLoggedIn(this.userId);

    if (Meteor.user().twoFactorEnabled) {
      throw new Meteor.Error('two-factor.generateSecret.already-enabled');
    }

    if (this.isSimulation) return null;
    const secret = otplib.authenticator.generateSecret();
    Meteor.users.update(this.userId, { $set: { 'services.twoFactorSecret': secret } });
    return secret;
  },
});
