import React from 'react';
import TaskListInterface from './TaskListInterface';

class TaskList extends React.Component<{ taskList: TaskListInterface }> {
  render() {
    const { name } = this.props.taskList;
    return (
      <div className="tasklist">
        { name }
      </div>
    )
  }
}

export default TaskList;
