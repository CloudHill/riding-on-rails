import React, { FocusEvent } from 'react';
import TaskInterface from './TaskInterface';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';
import { Check } from 'react-feather';
import { ContextMenuProps } from '../ContextMenu';

interface Props {
  task: TaskInterface;
  crud: { delete, update, updateTag };
  edit: {
    id: number;
    editTask: (id:number) => void;
  };
  showContextMenu: (options: ContextMenuProps) => void;
};

class Task extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.completeTask = this.completeTask.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  completeTask() {
    const task = this.props.task;
    const props = task.completed
      ? {completed: false, completed_at: null}
      : {completed: true, completed_at: new Date()};
    this.props.crud.update(task, props);
  }

  closeEdit() {
    this.props.edit.editTask(null);
  }

  onFocus(e: FocusEvent<HTMLDivElement, Element>) {
    const {edit, task} = this.props;
    // return if already editing
    if (edit.id === task.id) return;
    // otherwise, edit this task
    edit.editTask(task.id);
    (e.target as HTMLDivElement).click(); // hide context menu
  }

  addTag(tag: TaskInterface) {
    const task = this.props.task;
    const props = {add_tag: tag.id}
    this.props.crud.update(task, props);
  }

  removeTag(tag: TaskInterface) {
    const task = this.props.task;
    const props = {remove_tag: tag.id}
    this.props.crud.update(task, props);
  }

  render() {
    const { task, edit } = this.props;
    const { id, completed } = task;
    const editing = edit.id === id;

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
                crud={{ ...this.props.crud, addTag: this.addTag, removeTag: this.removeTag }}
                closeEdit={this.closeEdit}
                showContextMenu={this.props.showContextMenu}
              />
        }
      </div>
    );
  }
}

export default Task;
