import React from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import TaskInterface from "./TaskInterface";

class Tasks extends React.Component<{}, { tasks: TaskInterface[], editing: number }> {
  tasksRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      editing: null
    };

    this.tasksRef = React.createRef();

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.context.history.push("/"));
  }

  addTask(task: TaskInterface) {
    const url = "/api/v1/tasks";
    const token = this.getCsrfToken();
    
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
        const newTask = response as TaskInterface;
        const tasks = [newTask].concat(this.state.tasks);

        this.setState({tasks});        
        this.tasksRef.current.scrollTo(0, 0); // scroll to top
      })
      .catch(error => console.log(error.message));
  }

  updateTask(task: TaskInterface, newProps: object) {
    const id = task.id;
    const url = `/api/v1/tasks/${id}`;   
    const token = this.getCsrfToken();

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
        const tasks = this.state.tasks.map(
          t => t.id === task.id ? response : t
        );
        this.setState({tasks});
      })
      .catch(error => console.log(error.message));
  }

  deleteTask(task: TaskInterface) {
    const id = task.id;
    const url = `/api/v1/tasks/${id}`;
    const token = this.getCsrfToken();

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
        const tasks = this.state.tasks.filter(({id}) => id !== task.id);
        this.setState({tasks});
      })
      .catch(error => console.log(error.message));
  }

  getCsrfToken():string {
    return document
      .querySelector('meta[name="csrf-token"]')
      .attributes['content'].value;
  }

  editTask(id:number) {
    this.setState({editing: id});
  }

  render() {
    const { tasks } = this.state;
    const crudTasks = { 
      add: this.addTask,
      update: this.updateTask,
      delete: this.deleteTask
    }

    const allTasks = tasks.map(task => (
      <Task key={task.id} 
        task={task} 
        crud={crudTasks}
        editing={this.state.editing === task.id}
        editTask={this.editTask}
      />
    ));
    
    return (
      <div className="tasks-container">
        <h1>Tasks</h1>
        <div ref={this.tasksRef} className="tasks">
          {allTasks}
        </div>
        <AddTask crud={crudTasks}/>
      </div>
    )
  }
}

export default Tasks;
