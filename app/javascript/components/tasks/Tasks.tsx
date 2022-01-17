import React from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import TaskInterface from "./TaskInterface";
import { getCsrfToken } from "../../helpers";
import TaskListInterface from "../tasklists/TaskListInterface";

interface Props { 
  activeList: number
}

interface State {
  taskList: TaskListInterface, 
  editing: number
}

class Tasks extends React.Component<Props, State> {
  tasksRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    const taskList = {
      id: 0,
      name: "Tasks",
      tasks: []
    }

    this.state = {
      taskList, 
      editing: null
    }

    this.tasksRef = React.createRef();

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.activeList !== this.props.activeList)
      this.getTaskList();
  }

  componentDidMount() {
    this.getTaskList();
  }

  getTaskList() {
    const url = "/api/v1/task_lists/" + this.props.activeList;    

    fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ taskList: response }))
      .catch(() => this.context.history.push("/"));
  }

  addTask(task: TaskInterface) {
    const url = "/api/v1/tasks";
    const token = getCsrfToken();

    // add task to active list
    task.task_list_id = this.props.activeList;    
    
    // create task
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const { taskList } = this.state;
        const newTask = response as TaskInterface;
        const tasks = [newTask].concat(taskList.tasks);

        this.setState({ taskList : {...taskList, tasks }});
        this.tasksRef.current.scrollTo(0, 0); // scroll to top
      })
      .catch(error => console.log(error.message));
  }

  updateTask(task: TaskInterface, newProps: object) {
    const id = task.id;
    const url = `/api/v1/tasks/${id}`;   
    const token = getCsrfToken();

    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProps)
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const { taskList } = this.state;
        const tasks = taskList.tasks.map(
          t => t.id === task.id ? response : t
        );

        this.setState({ taskList : {...taskList, tasks }});
      })
      .catch(error => console.log(error.message));
  }

  deleteTask(task: TaskInterface) {
    const id = task.id;
    const url = `/api/v1/tasks/${id}`;
    const token = getCsrfToken();

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const { taskList } = this.state;
        const tasks = taskList.tasks.filter(
          ({id}) => id !== task.id
        );

        this.setState({ taskList : {...taskList, tasks }});
      })
      .catch(error => console.log(error.message));
  }

  editTask(id:number) {
    this.setState({editing: id});
  }

  render() {
    const { taskList } = this.state;
    const { tasks } = taskList;
    
    const crudTasks = { 
      add: this.addTask,
      update: this.updateTask,
      delete: this.deleteTask
    }

    // sort tasks by created_at (desc)
    const sortedTasks = tasks.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const allTasks = sortedTasks.map(task => (
      <Task key={task.id} 
        task={task} 
        crud={crudTasks}
        editing={this.state.editing === task.id}
        editTask={this.editTask}
      />
    ));
    
    return (
      <div className="tasks-container">
        <h1>
          {taskList.name}
        </h1>
        <div ref={this.tasksRef} className="tasks">
          {allTasks}
        </div>
        <AddTask crud={crudTasks}/>
      </div>
    )
  }
}

export default Tasks;
