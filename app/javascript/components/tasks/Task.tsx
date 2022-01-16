import React, { FocusEvent } from 'react';
import TaskInterface from './TaskInterface';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';
import { Check } from 'react-feather';

interface Props {
  task: TaskInterface, 
  crud: { delete, update },
  editing: boolean,
  editTask: (number) => void
};

class Task extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.completeTask = this.completeTask.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  completeTask() {
    const task = this.props.task;
    const props = task.completed
      ? {completed: false, completed_at: null}
      : {completed: true, completed_at: new Date()};
    this.props.crud.update(task, props);
  }

  closeEdit() {
    this.props.editTask(null);
  }

  onFocus(e: FocusEvent<HTMLDivElement, Element>) {
    const {editing, task} = this.props;
    if (editing) return;
    this.props.editTask(task.id);
  }

  render() {
    const { task, editing } = this.props;
    const { completed } = task;

    return (
      <div
        className={"task" + (editing ? " task-editing" : "")} 
        tabIndex={0}
        onFocus={this.onFocus}
        //@ts-ignore
        completed={completed ? "" : undefined}
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
            ? <TaskDisplay task={task}/>
            : <TaskEdit
                task={task}
                crud={this.props.crud}
                closeEdit={this.closeEdit}
              />
        }
      </div>
    );
  }
}

export default Task;
