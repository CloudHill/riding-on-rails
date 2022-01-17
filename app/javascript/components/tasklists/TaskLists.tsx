import React from 'react';
import TaskList from './TaskList';
import TaskListInterface from './TaskListInterface';
import AddTaskList from './AddTaskList';
import { getCsrfToken } from '../../helpers';
import { ContextMenuProps } from '../ContextMenu';

interface Props {
  setList: (id: number) => void
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
        const taskLists = [newList].concat(this.state.taskLists);

        this.setState({taskLists});
      })
      .catch(error => console.log(error.message));
  }

  render() {
    const { taskLists } = this.state;

    const allTaskLists = taskLists.map(list => {
      const { setList, showContextMenu } = this.props;
      return (
        <TaskList 
          key={list.id}
          setList={setList}
          taskList={list}
          showContextMenu={showContextMenu}
        />
      )
    });

    return (
      <div className="tasklists-container">
        <div className="tasklists">
          {allTaskLists}
        </div>
        <AddTaskList newList={this.createTaskList}/>        
      </div>
    )
  }
}

export default TaskLists;
