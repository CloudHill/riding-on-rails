import React from 'react';
import TaskList from './TaskList';
import TaskListInterface from './TaskListInterface';
import AddTaskList from './AddTaskList';
import { getCsrfToken } from '../../helpers';
import { ContextMenuProps } from '../ContextMenu';

interface Props {
  activeList: {
    activeListId: number;
    setActiveList: (id: number) => void;
  };
  showContextMenu: (options: ContextMenuProps) => void;
}

interface State { 
  taskLists: TaskListInterface[] 
}

class TaskLists extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      taskLists: [],
    };

    this.createTaskList = this.createTaskList.bind(this);
    this.renameTaskList = this.renameTaskList.bind(this);
    this.deleteTaskList = this.deleteTaskList.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/task_lists";
    fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ taskLists: response }))
      .catch(() => this.context.history.push("/"));
  }

  createTaskList(taskList: TaskListInterface) {
    const url = "/api/v1/task_lists";
    const token = getCsrfToken();
    
    // create task
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskList)
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const newList = response as TaskListInterface;
        const taskLists = this.state.taskLists.concat([newList]);

        this.setState({taskLists});
      })
      .catch(error => console.log(error.message));
  }

  renameTaskList(taskList: TaskListInterface, newName: string) {
    const id = taskList.id;
    const url = `/api/v1/task_lists/${id}`;   
    const token = getCsrfToken();

    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName })
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const { taskLists } = this.state;
        // update list state
        const lists = taskLists.map(
          list => list.id === taskList.id ? response : list
        );
        this.setState({ taskLists: lists});
      })
      .catch(error => console.log(error.message));
  }

  deleteTaskList(taskList: TaskListInterface) {
    const id = taskList.id;
    const url = `/api/v1/task_lists/${id}`;
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
        const { taskLists } = this.state;
        const { activeList: { activeListId, setActiveList } } = this.props;

        // remove list from state
        const lists = taskLists.filter(
          ({id}) => id !== taskList.id
        );
        this.setState({ taskLists: lists});

        // change to default list if the deleted list is active
        if (activeListId === id) setActiveList(0);
      })
      .catch(error => console.log(error.message));
  }

  render() {
    const { taskLists } = this.state;

    const crudTaskLists = { 
      create: this.createTaskList,
      rename: this.renameTaskList,
      delete: this.deleteTaskList
    }

    const allTaskLists = taskLists.map(list => {
      const { activeList, showContextMenu } = this.props;
      return (
        <TaskList 
          key={list.id}
          setList={activeList.setActiveList}
          taskList={list}
          showContextMenu={showContextMenu}
          crud={crudTaskLists}
        />
      )
    });

    return (
      <div className="tasklists-container">
        <div className="tasklists">
          {allTaskLists}
        </div>
        <AddTaskList crud={crudTaskLists}/>        
      </div>
    )
  }
}

export default TaskLists;
