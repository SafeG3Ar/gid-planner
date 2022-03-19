import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Segment } from 'semantic-ui-react';
import otplib from 'otplib';
import QRCode from 'qrcode.react';
import { withRouter } from 'react-router-dom';
import { generateSecret } from '../../api/methods/twoFactor/twoFactor.methods';

// QRCode page that displays QR code to user. Resourced from https://blog.meteor.com/tutorial-two-factor-authentication-with-meteor-and-totp-21d4a2f9ee51

const style = {
  font: 'roboto',
  fontSize: 'large',
  paddingBottom: '20px',
  marginTop: '0px',
};

const seg = {
  borderRadius: '15px',
};

const Code = () => {
  const user = Meteor.user();
  const secret = generateSecret.call();
  console.log(secret);
  const auth = otplib.authenticator.keyuri(user, 'gid%planner', secret);
  console.log(auth);
  return (
    <Container textAlign='center' style={{ alignItems: 'centered' }}>
      <Segment style={seg}>
        <List bulleted style={style}>
          <List.Header id='headers2'>Scan QR Code with a one of the following 2FA applications:</List.Header>
          <List.Item>
            <a href=
              'https://duo.com/resources/ebooks/two-factor-authentication-evaluation-guide?key=sgoog3a&utm_source=google&utm_medium=paid_search&utm_campaign=GO_AMER_S_BRAND&utm_content=DuoExact&_bk=duo&_bg=6372405950&_bn=g&_bm=e&_bt=581646596804'
            target='_blank' rel='noreferrer'>Duo</a>
          </List.Item>
          <List.Item>
            <a href='https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DAndroid'
              target='_blank' rel='noreferrer' >Google Authenticator</a>
          </List.Item>
          <List.Item>
            <a href='https://authy.com/'
              target='_blank' rel='noreferrer'>Authy</a>
          </List.Item>
        </List>
      </Segment>
      <QRCode value={auth} level="H" size={256} />
    </Container>
  );
};

export default withRouter(Code);
