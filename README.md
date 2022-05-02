![ci-badge](https://github.com/ics-software-engineering/meteor-application-template-react/workflows/ci-meteor-application-template-react/badge.svg)

For details, please see http://ics-software-engineering.github.io/meteor-application-template-react/

# GID the Planner

## Completed
GID the Planner will run on the following tech stack:
- Meteor JS Framework
- MongoDB
- React
- Material UI

The team has familiarized themselves with the new user interface framework *Material UI*. The mock up pages of the app have been discussed and created. The user interface outline of the app has been developed by the team. The following pages and components are completed:
- Task Form
- Calendar
- NavBar
- Implementation of Two-Factor Authentication
- All Collections

## Progress

*03/28/22*
<br/>
From the last README.md update, we have created a "settings" page that enables users to edit their name and phone number if they wish to do so. We have also added a *Security* settings tab where the user is able to enable two-factor authentication if they choose to do so. The user also has the ability to disable two-factor authentication. The two-factor authentication implements Meteors accounts-2fa package, and also involves the use of third party 2FA applications such as DUO or Google Authenticator. To enable 2FA, the user must scan a QR code that is generated using a 2FA application. They will then be required to submit a code that the application provides them. Once submitted, 2FA for the user's account will be enabled, and the user is required to enter a code from the application every time they login.

*04/11/22*
<br/>
From the last README.md update, we implemented the use of John the Ripper to assist with cracking the passwords for our default users on the application. This will help give us a sense of how we can improve our application's security. We also made attempts to break into and crash our application by trying to access private URL's from a another logged-in user, as well testing meteor methods in the web applications console. These all  turned out to be unsuccessful thanks to the security of Meteor's packages. We have concluded from the test that we will indeed go forward with implementing the password check when a user creates an account to add a layer of security for application's users. Our team has also made the decision to stop all further implementation of MUI due to the time constraints of this project. We will move forward with out primary UI framework being Semantic UI React.

## Link

The link to our current project repository is [here](https://github.com/SafeG3Ar/gid-planner).

## Pending
The main part of the app that needs to be finished is full implementation of the Calendar, the Task form, and full implementation of the user's lists.
The following components and pages will be worked on through the next assignment:
- Complete functionality of all pages
- Implement password check when user signs up
- Additional pages/components we decide to create
- Full implementation of Calendar
- Full implementation of lists
- Styling Task form
- Implement timeout when idle

## Roles and Responsibilities

### Completed
Completed assigned duties:

Anna:
- Dashboard Components
- Improved Navbar
- Landing Page
- Redirections of pages
- Sign In and Sign Up pages
- UI/UX Stylings

Alyssandra:
- Assisted with Creating Collections (Task, List, etc.)
- Created default user data for Task Collections 
- Dashboard Components & Styling & Calendar Display
- UserAgenda Components: Tomorrow/Today Agenda (Task List Functionality)
- UserCalendar Components: Selected Date Agenda (Task List Functionality)
- Assisted with Updating Footer, Landing, and Signout pages
- Task List Items: Display Name, Tags, Lists, Note (PopUp), & Delete Component

Glen:
- Creating Collections
- Creating of Settings/profile edit page
- Updating Packages
- Implemented Two-Factor Authentication
- Implemented functionality of Settings/Edit Profile page
- Style Settings page and Login pages for two-factor authentication 
- Ran tests with Iroh.js dynamic analysis
- Implement testing to try and hack our application
- Implement the use of John the Ripper password cracker
- Implement a password checker for new user sign up
- Implemented the ability for admin users to view all users in the application

Angela:
- Creating Collections (Task, List, etc.)
- Task Form Template
- Task Form Functionality
- Creating List Component that can be linked to Tasks
- Check-off and Delete functionality for List component items

### Last Part of Project

Anna:
- UI/UX Stylings
- Continue to Implement Dashboard functionality with Alyssandra
- Functionality of each page
- Adding A Refresh Button
- Implementing the Refresh Component

Alyssandra:
- Manage Collections
- Help Anna with UI/UX Stylings

Glen:
- Continue working on implementing Password Check when user signs up.
- Continue to run Iroh dynamic analysis tests
- Implement ability for admin users to view all users on application. 

Angela:
- Managing Collections
- Functionality of each page
- Page styling
- Move calls to maintaining collections to server-side
- Implement timeout when idle

### Next

Anna:
- Styling 
- Assist with implementing dashboard functionality with Alyssandra
- Assist Glen with Backend Development
- Implement the 'List' side navbar
- Add categories 

Angela:
- Make UI adjustments to forms/components
- Implement functionalities for Admin
- Assist Alyssandra with Tasks/Lists functionality
