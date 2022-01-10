import React, { ChangeEvent, MouseEvent } from 'react';
import TaskInterface from './TaskInterface';
import { Check, Star, Calendar } from 'react-feather';

interface TaskProps {
  task: TaskInterface, 
  crud: { delete, update },
  editing: boolean,
  editTask: (number) => void
};

class Task extends React.Component<TaskProps, TaskInterface> {
  constructor(props) {
    super(props);
    this.state = this.props.task;

    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  
  deleteTask() {
    const task = this.props.task;
    this.props.crud.delete(task);
  }

  updateTask(newProps:{}) {
    if ((newProps as TaskInterface).title == "") return;
    const task = this.props.task;
    this.props.crud.update(task, newProps);
    this.setState(newProps);
  }

  completeTask() {
    const task = this.props.task;
    const newProps = task.completed
      ? {completed: false, completed_at: null,}
      : {completed: true, completed_at: new Date(),};
    this.updateTask(newProps);
  }

  onChange(e:ChangeEvent<HTMLInputElement>) {
    const task = { title: this.state.title }
    task[e.target.name] = e.target.value;
    this.updateTask(task);
    this.setState(task);
  }

  onClick(e:MouseEvent<HTMLButtonElement>) {
    const task = { title: this.state.title }
    switch (e.currentTarget.name) {
      case 'important':
        task['important'] = !this.state.important;
    }
    this.updateTask(task)
  }

  onFocus(e: React.FocusEvent<HTMLDivElement, Element>) {
    if (this.props.editing) return;
    this.setState(this.props.task);
    this.props.editTask(this.props.task.id);
  }

  render() {
    const { task, editing } = this.props;
    const { title, note, important, completed } = task;
    
    return (
      <div
        className={"task" + (editing ? " task-editing" : "")} 
        tabIndex={0}
        onFocus={this.onFocus}
      >
        <div className="checkbox">
          <button
            title="check" 
            className="action-check"
            onClick={this.completeTask}
            onFocus={e => e.stopPropagation()}
          >
            {completed ? <Check size="100%" strokeWidth={5}/> : ""}
          </button>
        </div>
        {
          !editing
            ? (
              <div className="task-info">
                <div className="task-title">{title}</div>
                <div>{note}</div>
                <div className="task-bar">
                  <div>{important ? "◇" : "◆"}</div>
                </div>
              </div>
            )
            : (
              <div className='task-edit_form'>
                <div className="title-input">
                  <input 
                    name="title"
                    placeholder='Title'
                    value={this.state.title}
                    onChange={this.onChange}
                    autoFocus
                  />
                </div>
                <div className="task-bar">
                  <div className="task-options">
                    <button
                      title="Set Importance"
                      name="important"
                      className={"option-button"}
                      //@ts-ignore
                      active={this.state.important ? "" : undefined}
                      onClick={this.onClick}
                    >
                      <Star size="100%" fill=""/>
                    </button>
                    <button 
                      title="Set due date"
                      name="due_date"
                      className="option-button"
                    >
                      <Calendar size="100%" fill=""/>
                    </button>
                  </div>
                  <div className="task-actions">
                    <button
                      className="action-button"
                      onClick={this.deleteTask}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default Task;
