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
- Template for Two-Factor Authentication
- All Collections

## Progress

From the last README.md update, we have created a "settings" page that enables users to edit their name and phone number if they wish to do so. We have also added a *Security* settings tab where the user is able to enable two-factor authentication if they choose to do so. The user also has the ability to disable two-factor authentication. The two-factor authentication implements Meteors accounts-2fa package, and also involves the use of third party 2FA applications such as DUO or Google Authenticator. To enable 2FA, the user must scan a QR code that is generated using a 2FA application. They will then be required to submit a code that the application provides them. Once submitted, 2FA for the user's account will be enabled, and the user is required to enter a code from the application every time they login.

## Link

The link to our current project repository is [here](https://github.com/SafeG3Ar/gid-planner).

## Pending
The main part of the app that needs to be finished is the functionality and styling.
The following components and pages will be worked on through the next assignment:
- Complete functionality of all pages
- Implement password check when user signs up
- Additional pages/components we decide to create
- Use mongoDB Atlas for collections
- Implement Calendar 
- Implement Task form

## Roles and Responsibilities

### Completed
Completed assigned duties:

Anna:
- Styling 
- Sign In and Sign Up pages
- Dashboard components

Alyssandra:
- Creating collections
- Calendar Template
- Calendar Functionality
- Dashboard Template

Glen:
- Creating Collections
- Creating of Settings/profile edit page
- Updating Packages
- Implemented Two-Factor Authentication
- Implemented functionality of Settings/Edit Profile page
- Style Settings page and Login pages for two-factor authentication 
- Ran some tests with Iroh.js dynamic analysis

Angela:
- Task Form template
- Task Form Functionality
- Creating Collections

### Current Duties

Anna:
- Styling 
- Continue to Implement Dashboard functionality with Alyssandra
- Functionailty of each page

Alyssandra:
- Continue to Implement Dashboard functionality with Anna
- Dashboard Component: Tomorrow/Today Agenda (Task List Functionality)
- Default Task Data for Collection
- Functionailty of each page

Glen:
- Implement Password Check when user signs up.

Angela:
- Managing Collections
- Functionailty of each page

### Next

Anna:

Alyssandra:
- Assist with implementing dashboard functionality with Anna
- Assist Glen with mongoDB Atlas
- Manage Collections
- More Default Data: Tasks, User Profiles, etc.

Glen:
- use mongoDB Atlas for collections.
- Assist with implementing Calender API 
- Assist with implementing Task Form
- Managing collections 
- Assisting with functionality

Angela:
