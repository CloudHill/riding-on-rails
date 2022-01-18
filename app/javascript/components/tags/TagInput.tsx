import React, { ChangeEvent } from 'react'
import TagInterface from './TagInterface';

interface Props {
  createTag: (TagInterface) => void
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
        <button 
          className="action-button action-add"
          onClick={() => this.createTag()}  
        >
          Create tag
        </button>
      </>
    )
  }
}

export default TagInput;
