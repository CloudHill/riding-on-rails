import React, { ChangeEvent, FormEvent, MouseEvent, forwardRef } from 'react';
import TaskInterface from './TaskInterface';
import { Check, Star, Calendar, AlignJustify, X } from 'react-feather';
import DatePicker from 'react-datepicker';
import { formatDate } from '../helpers';


interface Props {
  task: TaskInterface;
  crud: { delete, update };
  closeEdit: () => void;
}

interface State {
  title: string;
  note: string;
  important: boolean;
  due_at:  null | Date;
  showNote: boolean;
}

class TaskEdit extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const {title, note, important, due_at} = props.task;

    this.state = {
      title, note, important, due_at,
      showNote: !!note
    };

    this.deleteTask = this.deleteTask.bind(this);
    this.toggleImportance = this.toggleImportance.bind(this);
    this.setDueDate = this.setDueDate.bind(this);
    this.toggleNoteInput = this.toggleNoteInput.bind(this);
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onNoteInput = this.onNoteInput.bind(this);
  }

  updateTask(props) {
    this.props.crud.update(this.props.task, props);
    this.setState(props);
  }
  
  deleteTask() {
    const task = this.props.task;
    this.props.crud.delete(task);
  }

  onTitleInput(e: ChangeEvent<HTMLInputElement>) {    
    const props = { title: e.target.value };
    this.updateTask(props);
  }
  
  onNoteInput(e: FormEvent<HTMLSpanElement>) {        
    const props = { note: (e.target as HTMLSpanElement).innerHTML };
    this.updateTask(props);
  }

  toggleNoteInput(e: MouseEvent<HTMLButtonElement>) {
    this.setState({ showNote: !this.state.showNote });
  }

  toggleImportance(e: MouseEvent<HTMLButtonElement>) {
    const props = { important: !this.state.important };
    this.updateTask(props);
  }

  setDueDate(date: Date) {
    const props = { due_at: date };
    this.updateTask(props);
  }

  render() {
    const {title, note, important, due_at:dueAt} = this.state;
    const dueDate = dueAt ? new Date(dueAt) : null;

    //@ts-ignore
    const CalendarButton = forwardRef(({ value, onClick }, ref) => (
      //@ts-ignore
      <button ref={ref}
        className="task-option"
        onClick={onClick} 
        active={dueDate ? "" : undefined}
      >
        <Calendar size="100%" fill=""/>
        {
          dueDate
            ? (
              <>
                <span>
                  {formatDate(new Date(value))}
                </span>
                <span className="clear-input" 
                  onClick = {e => {
                    this.setDueDate(null);
                    e.stopPropagation();
                  }}>
                    <X size="10px"/>
                </span>
              </>
            ) : null
        }
      </button>
    ));

    return (
      (
        <div className='task-edit_form'>
          <div className="title-input">
            <input 
              name="title"
              placeholder='Title'
              value={title}
              onChange={this.onTitleInput}
              autoFocus
            />
          </div>
          {
            this.state.showNote
              ? (
                <div className="note-input">
                  <span
                    //@ts-ignore
                    name="note"
                    placeholder='Note'
                    onInput={this.onNoteInput}
                    contentEditable
                  />
                </div>
              ) : null
          }
          <div className="task-bar">
            <div className="task-options">

              <button
                title="Add Note"
                className="task-option"
                //@ts-ignore
                active={note ? "" : undefined}
                onClick={this.toggleNoteInput}
              >
                <AlignJustify size="100%" fill=""/>
              </button>

              <button
                title="Set Importance"
                className="task-option"
                //@ts-ignore
                active={important ? "" : undefined}
                onClick={this.toggleImportance}
              >
                <Star size="100%" fill=""/>
              </button>

              <DatePicker
                selected={dueDate || new Date()}
                onChange={this.setDueDate}
                customInput={<CalendarButton/>}
              />

            </div>
            <div className="task-actions">

              <button
                className="action-button"
                onClick={this.deleteTask}
              >
                Delete
              </button>

              <button
                title="Done"
                className="action-button button-primary"
                onClick={this.props.closeEdit}
              >
                <Check size="16px"/>
              </button>

            </div>
          </div>
        </div>
      )
    )
  }
}

export default TaskEdit;
