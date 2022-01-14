import React, { ChangeEvent, forwardRef } from 'react';
import TaskInterface from './TaskInterface';
import DatePicker from 'react-datepicker';
import { Check, Star, Calendar, AlignJustify, X } from 'react-feather';
import { Editor, EditorState, ContentState } from 'draft-js';
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
  editorState: EditorState;
}

class TaskEdit extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const {title, note, important, due_at} = props.task;

    // draft-js
    const editorContent = ContentState.createFromText(note);
    const editorState = EditorState.createWithContent(editorContent);

    this.state = {
      title, note, important, due_at,
      showNote: !!note,
      editorState
    };
  }

  updateTask(props) {
    this.props.crud.update(this.props.task, props);
    this.setState(props);
  }
  
  deleteTask() {
    const task = this.props.task;
    this.props.crud.delete(task);
  }

  onTitleChange(e: ChangeEvent<HTMLInputElement>) {    
    const props = { title: e.target.value };
    this.updateTask(props);
  }
  
  onNoteChange(editorState) {
    const note = editorState.getCurrentContent().getPlainText();
    const props = { note };
    
    this.setState({ editorState });
    this.updateTask(props);
  }

  toggleNoteInput() {
    this.setState({ showNote: !this.state.showNote });
  }

  toggleImportance() {
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
              onChange={e => this.onTitleChange(e)}
              autoFocus
            />
          </div>
          {
            this.state.showNote
              ? (
                <div className="note-input">
                  <Editor 
                    editorState={this.state.editorState} 
                    onChange={eState => this.onNoteChange(eState)}
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
                onClick={() => this.toggleNoteInput()}
              >
                <AlignJustify size="100%" fill=""/>
              </button>

              <button
                title="Set Importance"
                className="task-option"
                //@ts-ignore
                active={important ? "" : undefined}
                onClick={() => this.toggleImportance()}
              >
                <Star size="100%" fill=""/>
              </button>

              <DatePicker
                selected={dueDate || new Date()}
                onChange={e => this.setDueDate(e)}
                customInput={<CalendarButton/>}
              />

            </div>
            <div className="task-actions">

              <button
                className="action-button"
                onClick={() => this.deleteTask()}
              >
                Delete
              </button>

              <button
                title="Done"
                className="action-button button-primary"
                onClick={() => this.props.closeEdit()}
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
