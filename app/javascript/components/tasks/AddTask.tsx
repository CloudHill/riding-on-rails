import React, { ChangeEvent, FormEvent } from "react";
import TaskInterface from "./TaskInterface";
import { Plus } from 'react-feather';

const initialState: TaskInterface = {
  title: "",
  note: "",
  important: false,
  completed: false,
  completed_at: null,
  due_at: null
};

class AddTask extends React.Component<{crud: {add}}, TaskInterface> {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e: ChangeEvent<HTMLInputElement>) {
    const task = { title: this.state.title }
    task[e.target.name] = e.target.value;
    this.setState(task);
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const task = this.state;
    if (task.title.length == 0)
      return;

    this.props.crud.add(task);
    this.setState(initialState);
  }

  render() {
    return (
      <form className="add-task" onSubmit={this.onSubmit}>
        <input 
          name="title"
          value={this.state.title}
          className="add-task_input"
          placeholder="Add new task"
          onChange={this.onChange}
          autoFocus
        />
        <div className="actions">
          <button title="Add task" type="submit" className="action-button action-add">
            <Plus size="100%"/>
          </button>
        </div>
      </form>
    )
  }
}

export default AddTask;