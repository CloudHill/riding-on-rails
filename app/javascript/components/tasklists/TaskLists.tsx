import React from 'react';
import TaskList from './TaskList';
import TaskListInterface from './TaskListInterface';

class TaskLists extends React.Component<{}, { taskLists: TaskListInterface[] }> {
  constructor(props) {
    super(props);
    this.state = {
      taskLists: [],
    };
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

  render() {
    const { taskLists } = this.state;

    const allTaskLists = taskLists.map(list => (
      <TaskList key={list.id} taskList={list} />
    ));

    return (
      <div className="tasklists-container">
      <div className="tasklists">
        {allTaskLists}
      </div>
        
      </div>
    )
  }
}

export default TaskLists;
