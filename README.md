![ci-badge](https://github.com/ics-software-engineering/meteor-application-template-react/workflows/ci-meteor-application-template-react/badge.svg)

For details, please see http://ics-software-engineering.github.io/meteor-application-template-react/

# GID the Planner

## How to use GID-Planner
In order to user GID-the-Planner, you must install the application on to your device.

To run the GID-the-Planner application locally, you can follow the directions below.

### Installation:
First, install Meteor.

Second, go to https://github.com/SafeG3Ar/gid-planner, click the "Code" button, and download "gid-planner-master.zip" as a ZIP file. Once downloaded, unzip in local machine and open with JS IDE of choice.

Third, cd into the app/ directory of your local copy of the repo, and install third party libraries with:
```
meteor npm install
```
Finally, you need to install MongoDB Database Tools, this will allow you to populate the vehicle database during startup.

### Packages and Plug-Ins
After installing Meteor and running the program, exit the running app to install the following packages. In the root directory, cd to the app directory and use the following command line prompts to install in the app:

### Two-Factor Authentication
GID-Planner utilizes Two-Factor Authentication for security purposes. To install the packages for the 2FA, use the following prompts:
```
npm install buffer
meteor add accounts-2fa
meteor update --release 2.7-rc.4
```

### Material UI
```
npm install @mui/material @emotion/react @emotion/styled @mui/lab
```
## Running the Application
Once the libraries are installed, you can run the application by invoking the "start" script in the [package.json](https://github.com/athleticheck/athleticheck/blob/master/app/package.json) file:
```
meteor npm run start
```
The first time you run the app, it will create some default users and data. Here is the output:
```
meteor npm run start

> meteor-application-template-react@ start /Users/annacampainha/Desktop/GitHub/gid-planner/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.production.json

[[[[[ ~/Desktop/GitHub/gid-planner/app ]]]]]            

=> Started proxy.                             
no postcss-load-configowser                  -
=> Started MongoDB.                           
I20220501-11:23:15.409(-10)? Creating the default user(s)
I20220501-11:23:15.424(-10)?   Creating user admin@gidplanner.com.
I20220501-11:23:15.631(-10)?   Creating user sue@gidplanner.com.
I20220501-11:23:15.697(-10)?   Creating user obi@gidplanner.com.
I20220501-11:23:15.770(-10)? Creating default data.
I20220501-11:23:15.770(-10)?   Adding: Basket (SooFlay)
I20220501-11:23:15.810(-10)?   Adding: Bicycle (ObiWan)
I20220501-11:23:15.811(-10)?   Adding: Banana (Adder)
I20220501-11:23:15.813(-10)?   Adding: Boogie Board (Adder)
I20220501-11:23:15.817(-10)? Creating default lists.
I20220501-11:23:15.817(-10)?   Adding: (SooFlay) list
I20220501-11:23:15.860(-10)?   Adding: (SooFlay) list
I20220501-11:23:15.864(-10)? Creating default profiles.
I20220501-11:23:15.864(-10)?   Adding:(Adder) profile
I20220501-11:23:15.902(-10)?   Adding:(SooFlay) profile
I20220501-11:23:15.904(-10)?   Adding:(ObiWan) profile
I20220501-11:23:15.906(-10)? Creating default tags.
I20220501-11:23:15.906(-10)?   Adding: (Important) tag
I20220501-11:23:15.944(-10)?   Adding: (Critical) tag
I20220501-11:23:15.947(-10)? Creating default tasks from private/sample_task.json.
I20220501-11:23:16.214(-10)? Monti APM: completed instrumenting the app
=> Started your app.

=> App running at: http://localhost:3000/
```

For more information please see [User Guide](https://github.com/SafeG3Ar/gid-planner/wiki/User-Guide).

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

- The link to our current [Project Repository](https://github.com/SafeG3Ar/gid-planner).
- The link to our [Final Project Documentation](https://github.com/SafeG3Ar/gid-planner/blob/master/Final%20Release%20Report-Team%20SafeG3Ar.pdf).
- The link to [GID the Planner Wiki Page](https://github.com/SafeG3Ar/gid-planner/wiki).
- The link to [Release Version v1.0.0 of GID the Planner](https://github.com/SafeG3Ar/gid-planner/releases/tag/v1.0.0).



## GID the Planner: Components
The main part of the app includes full implementation of the Calendar, the Task form, and full implementation of the user's lists.
The following components and pages were worked on throughout the project assignment:
- Complete functionality of all pages
- Implement password check when user signs up
- Additional pages/components we decide to create
- Full implementation of Calendar
- Full implementation of lists
- Styling Task form
- Implement timeout when idle

# Developer Notes 
Developing GID the Planner was a different experience than other web applications we have developed through undergrad.Overall, the implementation of an online planner was not difficult. Creating this applications varies from other applications because of the Two Factor Authentication(2FA) security feature that Glenn implemented. It has not been a requirement to implement extensive security features previous software engineering classes where we developed many applications. Glenns implementation of the 2FA is an exemplary feature we have in our application.
The team started using Material User Interface for the UI design, but soon discovered how difficult it was to navigate. MUI had many deprecated packages that took the team a while to understand. We decided as a team to not use MUI and switch to Semantics UI.
Overall, we had a good experience creating GID the Planner.

## Roles and Responsibilities

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
- Creating List Component & List Form Functionality
- Implemented the joining of Task and List Components
- Implemented User Timeout for stale sessions

### Last Part of Project

Anna:
- Assist Glen with Backend Development
- Adding A Refresh Button
- Implementing the Refresh Component
- UI/UX Stylings

Alyssandra:
- Manage Collections
- Help Anna & Angela with UI/UX Stylings

Glen:
- Continue working on implementing Password Check when user signs up.
- Continue to run Iroh dynamic analysis tests
- Implement ability for admin users to view all users on application. 

Angela:
- Manage Collections
- Implement timeout when idle
- Move calls to maintaining collections to server-side
- UI/UX Styling
