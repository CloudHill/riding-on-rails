import React from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import TaskInterface from "./TaskInterface";
import { getCsrfToken } from "../../helpers";
import TaskListInterface from "../tasklists/TaskListInterface";
import { ContextMenuProps } from "../ContextMenu";
import TagInterface from "../tags/TagInterface";

interface Props {
  edit: {
    id: number;
    editTask: (id:number) => void;
  };
  activeList: {
    id: number;
    name: string;
    setActiveList: (taskList: TaskListInterface) => void;
  };
  showContextMenu: (options: ContextMenuProps) => void;
  search: {
    title: string;
    tags: TagInterface[];
  };
}

interface State {
  tasks: TaskInterface[];
  search: boolean;
}

class Tasks extends React.Component<Props, State> {
  tasksRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.state = {
      tasks: null,
      search: false
    }

    this.tasksRef = React.createRef();

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/tasks";

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
    const token = getCsrfToken();

    // add task to active list
    task.task_list_id = this.props.activeList.id;

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
        const { tasks } = this.state;
        const newTask = response as TaskInterface;
        const newTasks = [newTask].concat(tasks);

        this.setState({ tasks: newTasks});
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
        const { tasks } = this.state;
        const newTasks = tasks.map(
          t => t.id === task.id ? response : t
        );

        this.setState({ tasks : newTasks });
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
        const { tasks } = this.state;
        const newTasks = tasks.filter(
          ({id}) => id !== task.id
        );

        this.setState({ tasks: newTasks });
      })
      .catch(error => console.log(error.message));
  }

  activeListFilter(task: TaskInterface) {
    return task.task_list_id === this.props.activeList.id   
  }

  searchFilter(task: TaskInterface) {
    const { search: { title, tags } } = this.props;

    // filter by title and tags
    return task.title.toLowerCase().includes(title.toLowerCase()) &&
      tags.every(tag => task.tags.find(taskTag => taskTag.id === tag.id));
  }

  render() {
    const { tasks } = this.state;
    const crudTasks = {
      add: this.addTask,
      update: this.updateTask,
      delete: this.deleteTask
    }

    if (tasks === null) {
      return (
        <div className="tasks-container">
          <h1>
            {this.props.activeList.name}
          </h1>
          <div ref={this.tasksRef} className="tasks"/>
          <AddTask crud={crudTasks}/>
        </div>
      )
    }

    const { title, tags } = this.props.search;
    const search = title || tags.length > 0;

    const filterFunc = (
      search 
        ? this.searchFilter 
        : this.activeListFilter
    ).bind(this);
    const filteredTasks =  tasks.filter(filterFunc);

    // sort tasks by created_at (desc)
    const sortedTasks = filteredTasks.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const allTasks = sortedTasks.map(task => (
      <Task
        key={task.id}
        task={task}
        crud={crudTasks}
        edit={this.props.edit}
        showContextMenu={this.props.showContextMenu}
      />
    ));

    return (
      <div className="tasks-container">
        <h1>
          {search ? "Search" : this.props.activeList.name}
        </h1>
        <div ref={this.tasksRef} className="tasks">
          {
            filteredTasks.length > 0
              ? allTasks
              : search
                ? "Your search did not match any tasks"
                : "This list is empty, add a task!"
          }
        </div>
        <AddTask crud={crudTasks}/>
      </div>
    )
  }
}

export default Tasks;
