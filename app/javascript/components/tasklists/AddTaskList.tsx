import React, { ChangeEvent, FormEvent } from "react";
import TaskListInterface from './TaskListInterface';
import { Plus } from 'react-feather';

const initialState: TaskListInterface = {
  name: ""
};

class AddTaskList extends React.Component<{ newList }, TaskListInterface> {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  
  onChange(e: ChangeEvent<HTMLInputElement>) {
    const taskList = { name: this.state.name }
    taskList[e.target.name] = e.target.value;
    this.setState(taskList);
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const taskList = this.state;
    if (taskList.name.length == 0)
      return;

    this.props.newList(taskList);
    this.setState(initialState);
  }

  render() {
    return (
      <form className="add-tasklist" onSubmit={this.onSubmit}>
        <input 
          name="name"
          value={this.state.name}
          className="add-tasklist_input"
          placeholder="New list"
          onChange={this.onChange}
        />
        <div className="actions">
          <button title="Add task list" type="submit" className="action-button icon-button action-add">
            <Plus size="100%"/>
          </button>
        </div>
      </form>
    )
  }
}

export default AddTaskList;
