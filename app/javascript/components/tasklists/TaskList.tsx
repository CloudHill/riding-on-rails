import React from 'react';
import TaskListInterface from './TaskListInterface';

interface Props { 
  taskList: TaskListInterface,
  setList: (number) => void
}

class TaskList extends React.Component<Props> {  
  onClick() {
    const { id } = this.props.taskList;
    this.props.setList(id);    
  }

  render() {
    const { name } = this.props.taskList;
    return (
      <div
        className="tasklist"
        tabIndex={0}
        onClick={() => this.onClick()}
      >
        { name }
      </div>
    )
  }
}

export default TaskList;
