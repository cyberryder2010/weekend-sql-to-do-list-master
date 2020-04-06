# Pam's To Do List Application

This is a To-Do Application that

- Allows a user to create a Task.
- Stores the Task inside of a database (SQL)
  The database name is "weekend-to-do-app"
  The Table that was created is called "tasks" and is structured as follows:

  CREATE TABLE "tasks"
  (
  "id" SERIAL PRIMARY KEY,
  "item" varchar(80) NOT NULL,
  "quantity" integer,
  "complete" boolean,
  "notes" varchar(252)
  );

- All tasks that need to be completed are shown on the DOM after they are added
- Each Task should has an option to 'Complete' or 'Delete'.
- When complete, the tasks' visual representation changes.
- The status of the complete function changes the field from "False" to "True" and the new status is stored in the database table
- Deleting a Task removes from the front and the Database.

NOTE: After using the weekend-to-do-list-app the following improvement is noted, the column utilized for "quantity" should be changed to "location", to allow a user organize list tasks by their location. The "quantity" column proved irrelevant.
