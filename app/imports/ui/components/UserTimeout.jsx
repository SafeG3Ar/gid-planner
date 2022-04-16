// import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
// import { Modal, Button } from 'semantic-ui-react';
// // import AriaModal from 'react-aria-modal';

// const events = ['mousemove'
//     , 'keydown'
//     , 'wheel'
//     , 'DOMMouseScroll'
//     , 'mouseWheel'
//     , 'mousedown'
//     , 'touchstart'
//     , 'touchmove'
//     , 'MSPointerDown'
//     , 'MSPointerMove'
// ];

// var heartbeatInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionHeartbeatInterval || (3 * 60 * 100); // 0.3mins
// var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || (30 * 60 * 100); // 3mins
// // var activityEvents = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionActivityEvents || events;

// var activityDetected = true;

// const UserTimeout = () => {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [initialtimer, setInitialTimer] = useState('');

//     userStaleTimer = () => {
//         // "use strict";
//         let counter = 0;
//         let timedout = Math.floor(inactivityTimeout / heartbeatInterval) || 1;
//         let warning = 1;

//         if (timedout > 1) {
//             warning = timedout - 1;
//         }

//         if (Meteor.userId() && activityDetected) {
//             Meteor.call('heartbeat');
//             activityDetected = false;
//             counter = 0;
//         }

//         else {
//             counter++;

//             if (counter == warning) {
//                 setModalOpen(true);
//             }

//             //logging out for inactivity
//             if (counter >= timedout) {
//                 // this.context.router.replace('/app/login');
//                 console.log(counter);
//                 console.log(timedout);
//                 Meteor.logout();
//             }
//         }
//     }

//     componentDidMount = () => {
//         // "use strict";

//         //send one right away
//         Meteor.call('heartbeat');

//         //we need to setup the event listeners for mouse movement, etc
//         //this will reset the counters
//         events.forEach(e => document.addEventListener(e, this.handleActivity));

//         let result = Meteor.setInterval(this.userStaleTimer, heartbeatInterval);

//         setInitialTimer(result);
//         console.log(initialtimer);
//     }

//     componentWillUnmount = () => {
//         // "use strict";

//         //unmount them when your app goes away
//         events.forEach(e => document.removeEventListener(e, this.handleActivity));

//         setModalOpen(false);

//         Meteor.clearInterval(initialtimer);

//     }

//     handleActivity = () => {
//         // "use strict";

//         if (activityDetected === false) {
//             // console.log('Activity Detected');
//             activityDetected = true;

//             //dont need the modal
//             setModalOpen(false);

//         }
//     }

//     handleLogout = () => {
//         if (Meteor.loggingOut()) {
//             console.log('logging out');
//             setModalOpen(true);
//         }
//     }

//     render = () => {

//         return (
//             <div tabIndex="-1" role="dialog">

//                 {/* <AriaModal
//                     mounted={modalOpen}
//                     onExit={this.handleActivity}
//                     escapeExits={true}
//                     titleText='Inactivity Timer'
//                     underlayClickExits={true}
//                     verticallyCenter={true}
//                     underlayClass="modalclass"
//                 > */}
//                 <Modal
//                     onMount={modalOpen}
//                     onClose={this.handleActivity}
//                     className='modalclass'
//                     centered
//                     closeIcon
//                 >
//                     <Modal.Content>
//                         <div className="modal-content">
//                             <Modal.Header>Inactivity Timer</Modal.Header>
//                             <div className="modal-body">
//                                 <p>Please click to continue your session. </p>
//                                 <p>If not, you will be logged out for security. </p>
//                                 <p>Thank you</p>
//                             </div>
//                             <Modal.Actions>
//                                 <Button className="btn-btn-default">
//                                     Close
//                                 </Button>
//                             </Modal.Actions>
//                         </div>
//                     </Modal.Content>
//                 </Modal>
//             </div>
//         );
//     }
// };

// export default UserTimeout;
