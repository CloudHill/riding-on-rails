import React, { ChangeEvent, FormEvent, MouseEvent, forwardRef } from 'react';
import TaskInterface from './TaskInterface';
import { Check, Star, Calendar, AlignJustify, X } from 'react-feather';
import DatePicker from 'react-datepicker';

interface TaskProps {
  task: TaskInterface, 
  crud: { delete, update },
  editing: boolean,
  editTask: (number) => void
};

class Task extends React.Component<TaskProps, { task: TaskInterface, showNote: boolean }> {
  constructor(props) {
    super(props);

    const task = this.props.task;
    const showNote = !!this.props.task.note;

    this.state = {
      task,
      showNote
    }

    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.toggleImportance = this.toggleImportance.bind(this);
    this.setDueDate = this.setDueDate.bind(this);
    this.showNote = this.showNote.bind(this);
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onNoteInput = this.onNoteInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }
  
  deleteTask() {
    const task = this.props.task;
    this.props.crud.delete(task);
  }

  updateTask(props) {
    const task = this.props.task;
    const newTask = {...task, ...props};

    this.setState({task: newTask});
    this.props.crud.update(task, props);    
  }

  completeTask() {
    const task = this.props.task;
    const props = task.completed
      ? {completed: false, completed_at: null,}
      : {completed: true, completed_at: new Date(),};
    this.updateTask(props);
  }

  onTitleInput(e: ChangeEvent<HTMLInputElement>) {    
    const props = { [e.target.name]: e.target.value }
    this.updateTask(props);
  }

  onNoteInput(e: FormEvent<HTMLSpanElement>) {        
    const props = { note: (e.target as HTMLSpanElement).textContent }
    this.updateTask(props);
    
  }

  toggleImportance(e: MouseEvent<HTMLButtonElement>) {
    const props = { important: !this.state.task.important }
    this.updateTask(props);
  }

  showNote(e: MouseEvent<HTMLButtonElement>) {
    this.setState({ showNote: !this.state.showNote });
  }

  setDueDate(date: Date) {
    const props = { due_at: date };
    this.updateTask(props);
  }

  closeEdit() {
    this.props.editTask(null);
  }

  onFocus(e: React.FocusEvent<HTMLDivElement, Element>) {
    const {editing, task} = this.props;
    const showNote = !!this.props.task.note;
    if (editing) return;
    this.setState({ task, showNote });
    this.props.editTask(task.id);
  }

  getDate(date:Date) {
    return date.toLocaleDateString(
      undefined, 
      {weekday: "short", day: 'numeric', month: "short"}
    );
  }

  render() {
    const { task, editing } = this.props;
    const { title, note, important, completed } = task;
    const { title:newTitle, note:newNote, important:newImportant, due_at:newDue } = this.state.task;
    const dueAt = newDue ? new Date(newDue) : null;
    

    //@ts-ignore
    const CalendarButton = forwardRef(({ value, onClick }, ref) => (
      //@ts-ignore
      <button ref={ref}
        className="option-button"
        onClick={onClick} 
        active={dueAt ? "" : undefined}
      >
        <Calendar size="100%" fill=""/>
        {
          dueAt
            ? (
              <>
                <span className="option-date">{this.getDate(new Date(value))}</span>
                <span className="clear-input" 
                  onClick = {e => {
                    this.setDueDate(null);
                    e.stopPropagation();
                  }}>
                    <X size="12px"/>
                </span>
              </>
            ) : null
        }
      </button>
    ));

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
                {note ? <div className="task-note">{note}</div> : null}
                {important || dueAt
                  ? (
                  <div className="task-bar">
                    <div className="task-options">
                      {
                        important
                          ? (
                            //@ts-ignore
                            <div className="option-button" active="">
                              <Star size="100%" fill=""/>
                            </div>
                          ) : null
                      }
                      {
                        dueAt
                          ? (
                            //@ts-ignore
                            <div className="option-button" active="">
                              <Calendar size="100%" fill=""/>
                              <span className="option-date">
                                {this.getDate(dueAt)}
                              </span>
                            </div>
                          ) : null
                      }
                    </div>
                  </div>
                  ) : null
                }
              </div>
            )
            : (
              <div className='task-edit_form'>
                <div className="title-input">
                  <input 
                    name="title"
                    placeholder='Title'
                    value={newTitle}
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
                      className="option-button"
                      //@ts-ignore
                      active={newNote ? "" : undefined}
                      onClick={this.showNote}
                    >
                      <AlignJustify size="100%" fill=""/>
                    </button>
                    <button
                      title="Set Importance"
                      className="option-button"
                      //@ts-ignore
                      active={newImportant ? "" : undefined}
                      onClick={this.toggleImportance}
                    >
                      <Star size="100%" fill=""/>
                    </button>
                    <DatePicker
                      selected={dueAt || new Date()}
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
                      onClick={this.closeEdit}
                    >
                      <Check size="16px"/>
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
