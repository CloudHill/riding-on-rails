import React, { ChangeEvent, MouseEvent, forwardRef } from 'react';
import TaskInterface from './TaskInterface';
import DatePicker from 'react-datepicker';
import { Check, Star, Calendar, AlignJustify, X, Tag } from 'react-feather';
import { Editor, EditorState, ContentState } from 'draft-js';
import { formatDate } from '../../helpers';
import { ContextMenuProps } from '../ContextMenu';
import TagMenu from '../tags/TagMenu';
import TagList from '../tags/TagList';

interface Props {
  task: TaskInterface;
  crud: { delete, update, addTag };
  closeEdit: () => void;
  showContextMenu: (options: ContextMenuProps) => void;
}

interface State {
  title: string;
  note: string;
  important: boolean;
  due_at:  null | Date;
  showNote: boolean;
  editorState: typeof EditorState;
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

  showTagList(e:MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    
    this.props.showContextMenu({
      anchor: {
        x: rect.x + (rect.width / 2),
        y: rect.y + (rect.height / 2),
      },
      content: <TagMenu onClick={this.props.crud.addTag}/>
    });
  }

  render() {
    const { title, note, important, due_at:dueAt } = this.state;
    const { tags } = this.props.task;
    const dueDate = dueAt ? new Date(dueAt) : null;

    //@ts-ignore
    const CalendarButton = forwardRef(({ value, onClick }, ref) => (
      //@ts-ignore
      <button ref={ref}
        title="Due Date"
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
        <div className='task-edit-container'>
          <div className="task-title-input">
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
                <div className="task-note-input">
                  <Editor 
                    editorState={this.state.editorState} 
                    onChange={eState => this.onNoteChange(eState)}
                  />
                </div>
              ) : null
          }
          <div className="task-bar">
            <div>
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

                <button
                  title="Tag"
                  className="task-option"
                  onClick={e => this.showTagList(e)}
                >
                  <Tag size="100%" fill=""/>
                </button>
              </div>
              
              <TagList tags={tags}/>

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
                className="action-button icon-button button-primary"
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
