# pugetsound-client

The client-side code for Puget Sound Schools. 

### Server Repository
This repository works in tandem with another which manages all the database and server calls.

Link: https://github.com/MisterDaviso/pugetsound-schools-server

## User Experience

### Teacher
From the signup page, a new user specifies that they are signing up as a teacher. Once logged in, the teacher can see various new buttons across teh top Navigation.

"ADD CLASS". The teacher can create a new class by specifying the class's name and the subject being taught. The Start and end dates of the class may be specified at this time.

"ADD HOMEWORK". The teacher can create an assignment, such as homework, for a specified class from the provided drop-down menu. The teacher must specify a start and end date for the assignment, otherwise it will not show up on the calendar.

"ALL CLASSES". Displays all classes in the school.

"PROFILE". Displays teh teacher's profile information.

"LOGOUT". Logs the teacher out of the session.

"CALENDAR". At the top of the page, the teacher selects the class they want to view from a drop-down menu containing classes they created, then clicks "log". All assignments for that class will be listed on the calendar, including the date they are assigned and the date they are due.


### Student
From the signup page, a new user specifies that they are signing up as a student. Once logged in, the student can see various new buttons across the top Navigation.

"SIGNUP FOR CLASS". The student will see a list of classes that they can sign up for, including the class name, subject, start and end date, and the teacher that runs it. The student checks the boxes next to the classes they wish to sign up for, and when they are done, they click "Register for Classes". If they later change their mind, they may return to the page and find the classes they are registered for pre-checked. From here, they merely repeat the process of checking classes and clicking "Register".

"CLASSES REGISTERED". From here, the student can view the classes they have already signed up for.

"PROFILE". Displays the student's profile information

"LOGOUT". Logs the student out of their session

"CALENDAR". At the top of the page, the student selects the class they want to view from a drop-down menu containing classes they are signed up for, then clicks "log". All assignments for that class will be listed on the calendar, including the date they are assigned and the date they are due.


## Get Started

For local development

1. Fork and clone
2. Run `npm i` (run `npm audit fix` if needed - stuff changes a lot in React!)
3. Create a `.env.local` file at the top level 
4. Create an environment variable called REACT_APP_SERVER_URL set to the localhost server's url

