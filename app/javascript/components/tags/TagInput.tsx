import React, { ChangeEvent } from 'react'
import TagInterface from './TagInterface';
import { Edit2 } from 'react-feather';

interface Props {
  createTag: (TagInterface) => void;
  edit: {
    editing: boolean;
    toggleEditing: () => void;
  };
}

class TagInput extends React.Component<Props, { name: string }> {
  constructor(props) {
    super(props)
    this.state = { name: "" }
  }

  onChange(e:ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    this.setState({ name });
  }

  createTag() {
    this.props.createTag({ name: this.state.name })
    this.setState({ name: "" });  
  }

  render() {
    const { name } = this.state;

    return (
      <>
        <div className="tag-input">
          <input 
            value={name}
            placeholder='Tag name'
            onChange={e => this.onChange(e)}
            autoFocus
          />
        </div>
        <div className="task-actions">
          <button 
            className="action-button action-add button-primary"
            onClick={() => this.createTag()}  
          >
            Create tag
          </button>
          <button 
            title="Edit tags"
            className={"action-button icon-button" + (this.props.edit.editing ? " button-primary" : "")}
            onClick={() => this.props.edit.toggleEditing()}
          >
            <Edit2 size="100%"/>
          </button>
        </div>
      </>
    )
  }
}

export default TagInput;
