# Riding On Rails Submission

| Name | Ryo Hilmawan |
| ---  | ---  |
| Matriculation Number | A0245871X | 

This is my submission for the CVWO 2021/2022 Assignment.

It is a task management web app developed using React and Rails.

## Database Initialization

Make sure PostgreSQL is set up and run the following commands to initialize the database:

```bash
rails db:create
rails db:migrate
rails db:seed
```

The `config/database.yml` file is set up with the username and password set as `postgres`

## Server

The server can be started by running the following command:

```bash
./bin/dev
```

The app can then be accessed from the browser through the URL `[localhost:3000](localhost:3000)`

## User Manual

The app interface is split into two major sections: the navbar and tasks

### Navbar

The navbar consists of a search bar, a list of all task lists, and an input bar.

#### Search bar

The search bar allows the user to filter all tasks by their title and tags.

#### Task Lists

Clicking on a task list will set that list as the current active task list. The current active task list will be bolded.
A context menu can be accessed by right clicking on a task list, which gives the user the option to rename or delete the list.
The default task list “Tasks” cannot be deleted or renamed.

#### Input bar

The input bar allows the user to create a new task list

### Tasks

The tasks section consists of a list of tasks and an input bar.

#### Task list

The list of tasks will either contain

* all tasks within the current active task list
* all tasks that match the search query (if the search bar is populated) 

A task’s completion can be toggled by clicking the circle on the left of the task.

A task can be edited by clicking on them, in which its interface will be replaced by the task edit interface. Any changes performed by the user will update the task immediately.

#### Input bar

The input bar allows the user to add a new task to the currently active task list.

### Tags

Each task can be assigned multiple tags. The user can then filter tasks by their tags through the search bar.

Tags can be created and modified through the task edit interface.

Each tag can be assigned a name and color. At this time, a tag cannot be renamed after its creation.
